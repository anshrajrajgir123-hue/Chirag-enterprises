import React, { useEffect, useRef, useState, useCallback } from 'react';

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

// Fragment Shader: Pure High-Res Coupler & Rebar on Pure White Background (Zero Shadow)
const FS_SOURCE = `
  precision highp float;
  varying vec2 v_screenCoord;
  uniform sampler2D u_image;
  uniform vec2 u_resolution;
  uniform vec2 u_imageResolution;
  uniform float u_scale;

  // Original solid studio background color: RGB(229, 229, 231)
  const vec3 origBg = vec3(229.0 / 255.0, 229.0 / 255.0, 231.0 / 255.0);

  void main() {
    float screenAspect = u_resolution.x / u_resolution.y;
    float imageAspect = u_imageResolution.x / u_imageResolution.y;

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

    // Pure 100% White background with zero shadow
    vec3 whiteBg = vec3(1.0, 1.0, 1.0);

    if (!isInsideImage) {
      gl_FragColor = vec4(whiteBg, 1.0);
      return;
    }

    // 1. Coupler Isolation Mask:
    // Lets the big rod extend tall vertically while keeping sides clean
    float xDist = abs(imgUV.x - 0.5);
    float yDist = abs(imgUV.y - 0.5);

    float xMask = 1.0 - smoothstep(0.130, 0.175, xDist);
    // Extended vertical mask so rod appears significantly longer and bigger
    float yMask = 1.0 - smoothstep(0.38, 0.495, yDist);
    float isoMask = xMask * yMask;

    if (isoMask <= 0.001) {
      gl_FragColor = vec4(whiteBg, 1.0);
      return;
    }

    // 2. Sample frame texture
    vec4 frameColor = texture2D(u_image, imgUV);

    // Distance from original background
    vec3 colorDiff = frameColor.rgb - origBg;
    float dist = length(colorDiff);

    // 100% Zero Shadow:
    // Shadow pixels in the frames range between 0.03 and 0.20 distance from origBg.
    // The actual solid metallic coupler starts at >= 0.34 distance.
    // Setting edgeStart = 0.22 completely eliminates 100% of the cast shadow and halo,
    // guaranteeing pure #FFFFFF white background everywhere with zero shadow artifacts.
    float edgeStart = 0.22;
    float edgeEnd = 0.31;
    float couplerAlpha = smoothstep(edgeStart, edgeEnd, dist);
    float finalCouplerAlpha = couplerAlpha * isoMask;

    // Zero shadow: directly mix pure white with coupler metal
    vec3 finalColor = mix(whiteBg, frameColor.rgb, finalCouplerAlpha);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function getFrameUrl(index: number): string {
  const frameNumber = String(index + 1).padStart(4, '0');
  return `/frames_30fps_jpg/frame_${frameNumber}.jpg`;
}

export function HeroCouplerSlideViewer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentRenderedFrameRef = useRef<number>(-1);
  const targetFrameRef = useRef<number>(0);
  const interpolatedFrameRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartYRef = useRef<number>(0);
  const dragStartFrameRef = useRef<number>(0);

  // WebGL references
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const uResolutionLocRef = useRef<WebGLUniformLocation | null>(null);
  const uImgResLocRef = useRef<WebGLUniformLocation | null>(null);
  const uScaleLocRef = useRef<WebGLUniformLocation | null>(null);

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
      return;
    }
    programRef.current = program;
    gl.useProgram(program);

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

    uResolutionLocRef.current = gl.getUniformLocation(program, 'u_resolution');
    uImgResLocRef.current = gl.getUniformLocation(program, 'u_imageResolution');
    uScaleLocRef.current = gl.getUniformLocation(program, 'u_scale');

    const texture = gl.createTexture();
    textureRef.current = texture;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.uniform2f(uImgResLocRef.current, IMAGE_WIDTH, IMAGE_HEIGHT);
    // Increased scale from 1.82 to 2.18 to make the rod and coupler bigger
    gl.uniform1f(uScaleLocRef.current, 2.18);

    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.floor(canvas.clientWidth * dpr);
      const displayHeight = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
        gl.uniform2f(uResolutionLocRef.current, displayWidth, displayHeight);
        currentRenderedFrameRef.current = -1;
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
            if (Math.round(interpolatedFrameRef.current) === index) {
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

    for (let i = 0; i < Math.min(12, TOTAL_FRAMES); i++) {
      loadFrame(i);
    }

    const loadRemainingFrames = async () => {
      const BATCH_SIZE = 12;
      for (let i = 12; i < TOTAL_FRAMES; i += BATCH_SIZE) {
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
    }, 80);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, []);

  // 3. Render frame to WebGL
  const renderFrame = useCallback((frameIdx: number) => {
    const gl = glRef.current;
    if (!gl) return;

    let imageToDraw = imagesRef.current[frameIdx];
    if (!imageToDraw) {
      for (let offset = 1; offset < 35; offset++) {
        if (frameIdx - offset >= 0 && imagesRef.current[frameIdx - offset]) {
          imageToDraw = imagesRef.current[frameIdx - offset];
          break;
        }
        if (frameIdx + offset < TOTAL_FRAMES && imagesRef.current[frameIdx + offset]) {
          imageToDraw = imagesRef.current[frameIdx + offset];
          break;
        }
      }
    }

    if (imageToDraw && currentRenderedFrameRef.current !== frameIdx) {
      gl.useProgram(programRef.current);
      gl.uniform1f(uScaleLocRef.current, 2.18);
      gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageToDraw);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      currentRenderedFrameRef.current = frameIdx;
    }
  }, []);

  // 4. Smooth Physics Lerp Loop
  useEffect(() => {
    let animId: number;

    const loop = () => {
      animId = requestAnimationFrame(loop);

      const target = targetFrameRef.current;
      const current = interpolatedFrameRef.current;

      if (Math.abs(target - current) > 0.05) {
        interpolatedFrameRef.current += (target - current) * 0.25;
      } else {
        interpolatedFrameRef.current = target;
      }

      const displayFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(interpolatedFrameRef.current)));
      renderFrame(displayFrame);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [renderFrame]);

  // 5. Vertical Page Scroll
  useEffect(() => {
    const handlePageScroll = () => {
      if (isDraggingRef.current) return;

      const scrollY = window.scrollY;
      const maxScrollThreshold = 480;
      const progress = Math.min(1, Math.max(0, scrollY / maxScrollThreshold));
      const target = Math.round(progress * (TOTAL_FRAMES - 1));
      targetFrameRef.current = target;
    };

    window.addEventListener('scroll', handlePageScroll, { passive: true });
    handlePageScroll();

    return () => {
      window.removeEventListener('scroll', handlePageScroll);
    };
  }, []);

  // 6. Direct Pointer Drag UP and DOWN
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;
    dragStartFrameRef.current = targetFrameRef.current;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaY = e.clientY - dragStartYRef.current;
    const framesDelta = Math.round((deltaY / 260) * TOTAL_FRAMES);
    const nextFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, dragStartFrameRef.current + framesDelta));
    targetFrameRef.current = nextFrame;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if released
    }
  };

  // 7. Mouse Wheel directly over the coupler
  const handleWheel = (e: React.WheelEvent) => {
    const step = Math.sign(e.deltaY) * Math.max(2, Math.round(Math.abs(e.deltaY) * 0.12));
    const nextFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, targetFrameRef.current + step));
    targetFrameRef.current = nextFrame;
  };

  return (
    <div
      ref={containerRef}
      className="lg:col-span-6 w-full flex items-center justify-center relative overflow-visible select-none"
    >
      <div
        className="w-full h-[540px] sm:h-[620px] lg:h-[720px] xl:h-[780px] cursor-ns-resize touch-none flex items-center justify-center relative"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        title="Slide / Scroll up and down to rotate & engage coupler"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block bg-white"
        />
      </div>
    </div>
  );
}
