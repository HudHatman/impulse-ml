import { WebGLDevice } from '../../src/typescript/Math/Computation/WebGL/WebGLDevice';
import { WebGLMemory } from '../../src/typescript/Math/Computation/WebGL/WebGLMemory';
import { executeKernel } from '../../src/typescript/Math/Computation/WebGL/executeKernel';

describe('executeKernel', () => {
  let device: WebGLDevice;

  beforeEach(() => {
    device = new WebGLDevice(64, 64);
  });

  afterEach(() => {
    device.destroy();
  });

  it('should render a constant value to all output pixels', () => {
    const gl = device.getGL();

    // Fragment shader that writes a constant 7.0 to the R channel
    const fragmentSource = `
      precision mediump float;
      void main() {
        gl_FragColor = vec4(7.0, 0.0, 0.0, 1.0);
      }
    `;

    const program = device.getShaderCache().getOrCompile('test_constant', fragmentSource);
    const output = device.alloc(4);

    executeKernel(device, program, [], output);

    const result = output.get();
    for (let i = 0; i < result.length; i++) {
      expect(result[i]).toBeCloseTo(7.0, 3);
    }

    output.free();
  });

  it('should pass input texture values through to output', () => {
    const gl = device.getGL();

    // Fragment shader that reads from u_input0 and passes it through
    const fragmentSource = `
      precision mediump float;
      uniform sampler2D u_input0;
      varying vec2 v_texCoord;
      void main() {
        vec4 val = texture2D(u_input0, v_texCoord);
        gl_FragColor = vec4(val.r, 0.0, 0.0, 1.0);
      }
    `;

    const program = device.getShaderCache().getOrCompile('test_passthrough', fragmentSource);

    const input = device.alloc(4);
    input.set(new Float32Array([1.5, 2.5, 3.5, 4.5]));

    const output = device.alloc(4);

    executeKernel(device, program, [input], output);

    const result = output.get();
    expect(result[0]).toBeCloseTo(1.5, 3);
    expect(result[1]).toBeCloseTo(2.5, 3);
    expect(result[2]).toBeCloseTo(3.5, 3);
    expect(result[3]).toBeCloseTo(4.5, 3);

    input.free();
    output.free();
  });

  it('should support float uniforms', () => {
    const gl = device.getGL();

    // Fragment shader that uses a uniform to scale the output
    const fragmentSource = `
      precision mediump float;
      uniform float u_scale;
      void main() {
        gl_FragColor = vec4(u_scale * 2.0, 0.0, 0.0, 1.0);
      }
    `;

    const program = device.getShaderCache().getOrCompile('test_uniform', fragmentSource);
    const output = device.alloc(4);

    executeKernel(device, program, [], output, { u_scale: 3.0 });

    const result = output.get();
    for (let i = 0; i < result.length; i++) {
      expect(result[i]).toBeCloseTo(6.0, 3);
    }

    output.free();
  });

  it('should support multiple input textures', () => {
    const gl = device.getGL();

    // Fragment shader that adds two inputs
    const fragmentSource = `
      precision mediump float;
      uniform sampler2D u_input0;
      uniform sampler2D u_input1;
      varying vec2 v_texCoord;
      void main() {
        float a = texture2D(u_input0, v_texCoord).r;
        float b = texture2D(u_input1, v_texCoord).r;
        gl_FragColor = vec4(a + b, 0.0, 0.0, 1.0);
      }
    `;

    const program = device.getShaderCache().getOrCompile('test_add_inputs', fragmentSource);

    const input0 = device.alloc(4);
    input0.set(new Float32Array([1.0, 2.0, 3.0, 4.0]));

    const input1 = device.alloc(4);
    input1.set(new Float32Array([10.0, 20.0, 30.0, 40.0]));

    const output = device.alloc(4);

    executeKernel(device, program, [input0, input1], output);

    const result = output.get();
    expect(result[0]).toBeCloseTo(11.0, 3);
    expect(result[1]).toBeCloseTo(22.0, 3);
    expect(result[2]).toBeCloseTo(33.0, 3);
    expect(result[3]).toBeCloseTo(44.0, 3);

    input0.free();
    input1.free();
    output.free();
  });
});
