import { WebGLDevice } from './WebGLDevice';
import { WebGLMemory } from './WebGLMemory';

/**
 * Executes a shader program on the GPU using the standard pipeline:
 * 1. Use program
 * 2. Bind input textures as samplers (u_input0, u_input1, ...)
 * 3. Set float uniforms
 * 4. Bind output framebuffer
 * 5. Setup viewport to output texture dimensions
 * 6. Bind and configure the quad vertex buffer (a_position)
 * 7. Draw the full-screen quad (TRIANGLE_STRIP)
 * 8. Unbind framebuffer
 */
export function executeKernel(
  device: WebGLDevice,
  program: WebGLProgram,
  inputs: WebGLMemory[],
  output: WebGLMemory,
  uniforms: Record<string, number> = {}
): void {
  const gl = device.getGL();

  gl.useProgram(program);

  // Bind input textures as sampler uniforms
  for (let i = 0; i < inputs.length; i++) {
    gl.activeTexture(gl.TEXTURE0 + i);
    gl.bindTexture(gl.TEXTURE_2D, inputs[i].texture);
    const loc = gl.getUniformLocation(program, `u_input${i}`);
    if (loc !== null) {
      gl.uniform1i(loc, i);
    }
  }

  // Set float uniforms
  for (const [name, value] of Object.entries(uniforms)) {
    const loc = gl.getUniformLocation(program, name);
    if (loc !== null) {
      gl.uniform1f(loc, value);
    }
  }

  // Bind output framebuffer and set viewport
  gl.bindFramebuffer(gl.FRAMEBUFFER, output.framebuffer);
  gl.viewport(0, 0, output.texWidth, output.texHeight);

  // Bind quad vertex buffer and setup attribute
  const quadBuffer = device.getQuadBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
  const posLoc = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  // Draw full-screen quad
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  // Cleanup
  gl.disableVertexAttribArray(posLoc);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // Unbind textures
  for (let i = 0; i < inputs.length; i++) {
    gl.activeTexture(gl.TEXTURE0 + i);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
  gl.activeTexture(gl.TEXTURE0);
}
