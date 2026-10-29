import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 390;
const IMAGE_WIDTH = 1920;
const IMAGE_HEIGHT = 1080;

// Vertex Shader: Fullscreen quad
const VS_SOURCE = `
  attribute vec2 a_position;
  varying vec2 v_screenCoord;
  void main() {
    v_screenCoord = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Fragment Shader: Pure Separated Coupler with Custom Studio Lighting & Zero Full-Screen Clutter
const FS_SOURCE = `
  precision highp float;
  varying vec2 v_screenCoord;
  uniform sampler2D u_image;
  uniform vec2 u_resolution;
  uniform vec2 u_imageResolution;
  uniform int u_bgMode;
  uniform int u_isolateMode;
  uniform float u_scale;
  uniform float u_scrollProgress;

  // The original solid studio background color: RGB(229, 229, 231)
  const vec3 origBg = vec3(229.0 / 255.0, 229.0 / 255.0, 231.0 / 255.0);

  void main() {
    float screenAspect = u_resolution.x / u_resolution.y;
    float imageAspect = u_imageResolution.x / u_imageResolution.y;

    // Apply scale to center and frame the coupler perfectly
    float effectiveScale = max(0.4, u_scale);

    vec2 imgUV;
    bool isInsideImage = false;

    if (screenAspect > imageAspect) {
      float renderWidth = u_resolution.y * imageAspect * effectiveScale;
      float renderHeight = u_resolution.y * effectiveScale;
      float xOffset = (u_resolution.x - renderWidth) * 0.5;
      float yOffset = (u_resolution.y - renderHeight) * 0.5;

      float x = (gl_FragCoord.x - xOffset) / renderWidth;
      float y = 1.0 - ((gl_FragCoord.y - yOffset) / renderHeight);
      imgUV = vec2(x, y);
      if (x >= 0.0 && x <= 1.0 && y >= 0.0 && y <= 1.0) {
        isInsideImage = true;
      }
    } else {
      float renderWidth = u_resolution.x * effectiveScale;
      float renderHeight = (u_resolution.x / imageAspect) * effectiveScale;
      float xOffset = (u_resolution.x - renderWidth) * 0.5;
      float yOffset = (u_resolution.y - renderHeight) * 0.5;

      float x = (gl_FragCoord.x - xOffset) / renderWidth;
      float y = 1.0 - ((gl_FragCoord.y - yOffset) / renderHeight);
      imgUV = vec2(x, y);
      if (x >= 0.0 && x <= 1.0 && y >= 0.0 && y <= 1.0) {
        isInsideImage = true;
      }
    }

    // Dynamic, high-end studio radial lighting behind the coupler
    vec2 center = vec2(0.5, 0.5);
    vec2 p = v_screenCoord - center;
    float radialDist = length(vec2(p.x * (screenAspect > 1.0 ? 1.15 : 0.85), p.y)) * 0.85;

    vec3 newBg;
    if (u_bgMode == 0) {
      // 1. Dark Slate Studio (Luxury deep charcoal with focused spotlight behind the coupler)
      vec3 centerSpot = vec3(0.12, 0.16, 0.22);
      vec3 outerVignette = vec3(0.02, 0.025, 0.035);
      float spot = smoothstep(0.85, 0.0, radialDist);
      newBg = mix(outerVignette, centerSpot, spot);
      newBg += vec3(0.015, 0.02, 0.025) * (1.0 - v_screenCoord.y);
    } else if (u_bgMode == 1) {
      // 2. Deep Obsidian Titanium (Clean hardware aesthetic)
      vec3 centerSpot = vec3(0.08, 0.085, 0.095);
      vec3 outerVignette = vec3(0.015, 0.015, 0.02);
      float spot = smoothstep(0.85, 0.0, radialDist);
      newBg = mix(outerVignette, centerSpot, spot);
    } else if (u_bgMode == 2) {
      // 3. Cyber Industrial Amber / Forge Glow
      vec3 centerSpot = vec3(0.16, 0.12, 0.08);
      vec3 outerVignette = vec3(0.025, 0.02, 0.018);
      float spot = smoothstep(0.8, 0.0, radialDist);
      newBg = mix(outerVignette, centerSpot, spot);
    } else if (u_bgMode == 3) {
      // 4. Pure Minimalist Matte Black
      newBg = vec3(0.025, 0.025, 0.028);
    } else {
      // 5. Clean Architectural Studio
      vec3 centerSpot = vec3(0.15, 0.16, 0.18);
      vec3 outerVignette = vec3(0.05, 0.055, 0.06);
      float spot = smoothstep(0.75, 0.0, radialDist);
      newBg = mix(outerVignette, centerSpot, spot);
    }

    if (!isInsideImage) {
      gl_FragColor = vec4(newBg, 1.0);
      return;
    }

    // 1. Isolation Mask: Separates strictly the central coupler from the outer cage/columns
    float xDist = abs(imgUV.x - 0.5);
    float yDist = abs(imgUV.y - 0.5);

    float isoMask = 1.0;
    if (u_isolateMode == 0) {
      // PURE ISOLATED COUPLER (Default):
      // Cleanly cuts away the outer columns and cage, smoothly feathering rebar ends
      float xMask = 1.0 - smoothstep(0.125, 0.170, xDist);
      float yMask = 1.0 - smoothstep(0.28, 0.37, yDist);
      isoMask = xMask * yMask;
    } else if (u_isolateMode == 1) {
      // Coupler with wider assembly context
      float xMask = 1.0 - smoothstep(0.18, 0.25, xDist);
      float yMask = 1.0 - smoothstep(0.32, 0.40, yDist);
      isoMask = xMask * yMask;
    }

    // If completely outside the isolated coupler bounds, render background directly
    if (isoMask <= 0.001) {
      gl_FragColor = vec4(newBg, 1.0);
      return;
    }

    // 2. Sample the video frame
    vec4 frameColor = texture2D(u_image, imgUV);

    // Euclidean distance from original studio background RGB(229, 229, 231)
    vec3 colorDiff = frameColor.rgb - origBg;
    float dist = length(colorDiff);

    // Keying threshold
    float edgeStart = 0.028;
    float edgeEnd = 0.11;
    float couplerAlpha = smoothstep(edgeStart, edgeEnd, dist);

    // Combine coupler alpha with isolation mask
    float finalCouplerAlpha = couplerAlpha * isoMask;

    // Preserve subtle cast shadow directly under the coupler
    float shadowFactor = 1.0;
    if (dist < edgeEnd) {
      float lumaDiff = dot(origBg - frameColor.rgb, vec3(0.299, 0.587, 0.114));
      if (lumaDiff > 0.005) {
        shadowFactor = clamp(1.0 - (lumaDiff * 2.0 * isoMask), 0.40, 1.0);
      }
    }
    vec3 shadedBg = newBg * shadowFactor;

    // Composite isolated coupler over the new background
    vec3 finalColor = mix(shadedBg, frameColor.rgb, finalCouplerAlpha);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function getFrameUrl(index: number): string {
  const frameNumber = String(index + 1).padStart(4, '0');
  return `/frames_30fps_jpg/frame_${frameNumber}.jpg`;
}

export function CouplerScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Background style: 0 to 4
  const [bgMode, setBgMode] = useState<number>(0);
  // Isolation mode: 0 = Pure Separated Coupler (Default), 1 = Assembly Context, 2 = Full
  const [isolateMode, setIsolateMode] = useState<number>(0);
  // Scale factor: default 1.18 gives the coupler prominent focus without edge clipping
  const [scale, setScale] = useState<number>(1.18);

  // Cache of preloaded HTMLImageElements
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentRenderedFrameRef = useRef<number>(-1);
  const targetFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);

  // WebGL references
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const uResolutionLocRef = useRef<WebGLUniformLocation | null>(null);
  const uImgResLocRef = useRef<WebGLUniformLocation | null>(null);
  const uBgModeLocRef = useRef<WebGLUniformLocation | null>(null);
  const uIsolateModeLocRef = useRef<WebGLUniformLocation | null>(null);
  const uScaleLocRef = useRef<WebGLUniformLocation | null>(null);
  const uScrollProgLocRef = useRef<WebGLUniformLocation | null>(null);

  // 1. Initialize WebGL
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      antialias: true,
      alpha: false,
      depth: false,
      powerPreference: 'high-performance',
    });

    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    glRef.current = gl;

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error('Shader compile error:', glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VS_SOURCE);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FS_SOURCE);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    programRef.current = program;
    gl.useProgram(program);

    // Quad geometry covering [-1, -1] to [1, 1]
    const quadVertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    const aPositionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    uResolutionLocRef.current = gl.getUniformLocation(program, 'u_resolution');
    uImgResLocRef.current = gl.getUniformLocation(program, 'u_imageResolution');
    uBgModeLocRef.current = gl.getUniformLocation(program, 'u_bgMode');
    uIsolateModeLocRef.current = gl.getUniformLocation(program, 'u_isolateMode');
    uScaleLocRef.current = gl.getUniformLocation(program, 'u_scale');
    uScrollProgLocRef.current = gl.getUniformLocation(program, 'u_scrollProgress');

    // Create and bind texture
    const texture = gl.createTexture();
    textureRef.current = texture;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Set static uniforms
    gl.uniform2f(uImgResLocRef.current, IMAGE_WIDTH, IMAGE_HEIGHT);

    // Resize handler
    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.floor(window.innerWidth * dpr);
      const displayHeight = Math.floor(window.innerHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
        gl.uniform2f(uResolutionLocRef.current, displayWidth, displayHeight);
        currentRenderedFrameRef.current = -1; // force re-render
      }
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (program) gl.deleteProgram(program);
      if (texture) gl.deleteTexture(texture);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
    };
  }, []);

  // 2. Preload frames
  useEffect(() => {
    let isCancelled = false;

    const loadFrame = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        if (imagesRef.current[index]) {
          resolve(imagesRef.current[index]!);
          return;
        }
        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[index] = img;
            if (targetFrameRef.current === index) {
              currentRenderedFrameRef.current = -1;
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(img);
        };
      });
    };

    // Priority load first frames
    for (let i = 0; i < Math.min(5, TOTAL_FRAMES); i++) {
      loadFrame(i);
    }

    // Chunk load remaining frames
    const loadRemainingFrames = async () => {
      const BATCH_SIZE = 8;
      for (let i = 5; i < TOTAL_FRAMES; i += BATCH_SIZE) {
        if (isCancelled) break;
        const batch: Promise<HTMLImageElement>[] = [];
        for (let j = i; j < Math.min(i + BATCH_SIZE, TOTAL_FRAMES); j++) {
          batch.push(loadFrame(j));
        }
        await Promise.all(batch);
      }
    };

    const timer = setTimeout(() => {
      loadRemainingFrames();
    }, 100);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, []);

  // 3. Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollTop = window.scrollY;
      const maxScroll = container.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;

      const targetIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(progress * (TOTAL_FRAMES - 1))));
      targetFrameRef.current = targetIndex;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 4. Keyboard controls:
  // Keys 1-5: Background aesthetic
  // Key I / Space: Toggle Pure Isolated Coupler vs Context
  // Keys + / -: Adjust scale / size
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        setBgMode(parseInt(e.key, 10) - 1);
        currentRenderedFrameRef.current = -1;
      } else if (e.key.toLowerCase() === 'b') {
        setBgMode((prev) => (prev + 1) % 5);
        currentRenderedFrameRef.current = -1;
      } else if (e.key.toLowerCase() === 'i' || e.code === 'Space') {
        setIsolateMode((prev) => (prev === 0 ? 1 : 0));
        currentRenderedFrameRef.current = -1;
      } else if (e.key === '=' || e.key === '+') {
        setScale((prev) => Math.min(2.0, +(prev + 0.1).toFixed(2)));
        currentRenderedFrameRef.current = -1;
      } else if (e.key === '-' || e.key === '_') {
        setScale((prev) => Math.max(0.5, +(prev - 0.1).toFixed(2)));
        currentRenderedFrameRef.current = -1;
      } else if (e.key === '0') {
        setScale(1.18);
        currentRenderedFrameRef.current = -1;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 5. Animation Render Loop
  useEffect(() => {
    const gl = glRef.current;
    if (!gl) return;

    let interpolatedFrame = targetFrameRef.current;

    const renderLoop = () => {
      const target = targetFrameRef.current;
      interpolatedFrame += (target - interpolatedFrame) * 0.35;
      const displayFrame = Math.round(interpolatedFrame);

      let imageToDraw: HTMLImageElement | null = imagesRef.current[displayFrame];
      if (!imageToDraw) {
        for (let offset = 1; offset < 30; offset++) {
          if (displayFrame - offset >= 0 && imagesRef.current[displayFrame - offset]) {
            imageToDraw = imagesRef.current[displayFrame - offset];
            break;
          }
          if (displayFrame + offset < TOTAL_FRAMES && imagesRef.current[displayFrame + offset]) {
            imageToDraw = imagesRef.current[displayFrame + offset];
            break;
          }
        }
      }

      if (imageToDraw && currentRenderedFrameRef.current !== displayFrame) {
        gl.useProgram(programRef.current);
        gl.uniform1i(uBgModeLocRef.current, bgMode);
        gl.uniform1i(uIsolateModeLocRef.current, isolateMode);
        gl.uniform1f(uScaleLocRef.current, scale);
        gl.uniform1f(uScrollProgLocRef.current, target / (TOTAL_FRAMES - 1));

        gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageToDraw);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        currentRenderedFrameRef.current = displayFrame;
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [bgMode, isolateMode, scale]);

  return (
    <div
      ref={containerRef}
      style={{
        height: '450vh',
        backgroundColor: '#06080d',
        position: 'relative',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'block',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
