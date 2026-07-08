/**
 * Shared passthrough vertex shader for all WebGL kernels.
 * Renders a full-screen quad (triangle strip) and passes
 * texture coordinates (0-1 range) to the fragment shader.
 */
export const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
varying vec2 v_texCoord;

void main() {
  v_texCoord = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;
