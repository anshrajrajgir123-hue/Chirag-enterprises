import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, ArrowDown, Sparkles } from 'lucide-react';

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

// Fragment Shader: Pure Separated Coupler with Luxury Studio Spotlight
const FS_SOURCE = `
  precision highp float;
  varying vec2 v_screenCoord;
  uniform sampler2D u_image;
  uniform vec2 u_resolution;
  uniform vec2 u_imageResolution;
  uniform float u_scale;
  uniform float u_scrollProgress;

  // The original solid studio background color: RGB(229, 229, 231)
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

    // Dynamic dark studio radial lighting behind the coupler
    vec2 center = vec2(0.5, 0.5);
    vec2 p = v_screenCoord - center;
    float radialDist = length(vec2(p.x * (screenAspect > 1.0 ? 1.15 : 0.85), p.y)) * 0.85;

    // Cinematic Dark Slate Studio with subtle warm/cool rim
    vec3 centerSpot = vec3(0.12, 0.16, 0.22);
    vec3 outerVignette = vec3(0.02, 0.025, 0.035);
    float spot = smoothstep(0.85, 0.0, radialDist);
    vec3 newBg = mix(outerVignette, centerSpot, spot);
    newBg += vec3(0.015, 0.02, 0.025) * (1.0 - v_screenCoord.y);

    if (!isInsideImage) {
      gl_FragColor = vec4(newBg, 1.0);
      return;
    }

    // 1. Coupler Isolation Mask (Removes outer cage/columns)
    float xDist = abs(imgUV.x - 0.5);
    float yDist = abs(imgUV.y - 0.5);

    float xMask = 1.0 - smoothstep(0.125, 0.170, xDist);
    float yMask = 1.0 - smoothstep(0.28, 0.37, yDist);
    float isoMask = xMask * yMask;

    if (isoMask <= 0.001) {
      gl_FragColor = vec4(newBg, 1.0);
      return;
    }

    // 2. Sample frame texture
    vec4 frameColor = texture2D(u_image, imgUV);

    // Euclidean distance from original background RGB(229, 229, 231)
    vec3 colorDiff = frameColor.rgb - origBg;
    float dist = length(colorDiff);

    // Keying threshold
    float edgeStart = 0.028;
    float edgeEnd = 0.11;
    float couplerAlpha = smoothstep(edgeStart, edgeEnd, dist);

    float finalCouplerAlpha = couplerAlpha * isoMask;

    // Soft cast shadow directly beneath the coupler
    float shadowFactor = 1.0;
    if (dist < edgeEnd) {
      float lumaDiff = dot(origBg - frameColor.rgb, vec3(0.299, 0.587, 0.114));
      if (lumaDiff > 0.005) {
        shadowFactor = clamp(1.0 - (lumaDiff * 2.0 * isoMask), 0.40, 1.0);
      }
    }
    vec3 shadedBg = newBg * shadowFactor;

    vec3 finalColor = mix(shadedBg, frameColor.rgb, finalCouplerAlpha);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function getFrameUrl(index: number): string {
  const frameNumber = String(index + 1).padStart(4, '0');
  return `/frames_30fps_jpg/frame_${frameNumber}.jpg`;
}

export function CouplerScrollSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentFrameNum, setCurrentFrameNum] = useState<number>(1);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentRenderedFrameRef = useRef<number>(-1);
  const targetFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);

  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const uResolutionLocRef = useRef<WebGLUniformLocation | null>(null);
  const uImgResLocRef = useRef<WebGLUniformLocation | null>(null);
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
    uScrollProgLocRef.current = gl.getUniformLocation(program, 'u_scrollProgress');

    const texture = gl.createTexture();
    textureRef.current = texture;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.uniform2f(uImgResLocRef.current, IMAGE_WIDTH, IMAGE_HEIGHT);
    gl.uniform1f(uScaleLocRef.current, 1.16);

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

    for (let i = 0; i < Math.min(6, TOTAL_FRAMES); i++) {
      loadFrame(i);
    }

    const loadRemainingFrames = async () => {
      const BATCH_SIZE = 8;
      for (let i = 6; i < TOTAL_FRAMES; i += BATCH_SIZE) {
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
    }, 120);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, []);

  // 3. Section-based scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrollDistance = sectionHeight - windowHeight;
      if (scrollDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollDistance));

      const targetIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(progress * (TOTAL_FRAMES - 1)))
      );

      targetFrameRef.current = targetIndex;
      setScrollProgress(progress);
      setCurrentFrameNum(targetIndex + 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 4. Render loop
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
        gl.uniform1f(uScaleLocRef.current, 1.16);
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
  }, []);

  // Determine stage title based on scroll position
  const stage =
    scrollProgress < 0.33
      ? {
          index: '01',
          name: 'Thread Alignment & Positioning',
          detail: 'Rebar ends parallel-cut and aligned to mechanical sleeve bore.',
        }
      : scrollProgress < 0.75
      ? {
          index: '02',
          name: 'Full Thread Engagement & Splicing',
          detail: 'Standardized torque coupling creates seamless structural grip.',
        }
      : {
          index: '03',
          name: '100% Bar-Break Load Continuity',
          detail: 'Direct axial tension load transfer exceeding parent bar capacity.',
        };

  return (
    <section
      id="mechanism"
      ref={sectionRef}
      className="relative bg-slate-950 text-white border-y border-slate-800"
      style={{ height: '260vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pointer-events-none">
        {/* WebGL Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />

        {/* Top Header HUD overlay */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono-tabular tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Mechanism</span>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md border border-slate-800 px-4 py-2 rounded-lg text-xs font-mono-tabular text-slate-300">
            <span className="text-orange-400 font-bold">FRAME {String(currentFrameNum).padStart(3, '0')}</span>
            <span className="text-slate-600">/</span>
            <span>390</span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400 font-semibold">{Math.round(scrollProgress * 100)}% ENGAGED</span>
          </div>
        </div>

        {/* Bottom Status & Technical Indicator HUD */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4">
          {/* Active Stage Detail */}
          <div className="max-w-md bg-slate-900/85 backdrop-blur-md border border-slate-800 p-4 rounded-xl shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-orange-400 font-bold">
              <span>PHASE {stage.index}</span>
              <span className="text-slate-600">|</span>
              <span className="text-white font-medium">{stage.name}</span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {stage.detail}
            </p>
          </div>

          {/* Scroll progress cue */}
          <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md border border-slate-800 px-4 py-2.5 rounded-lg text-xs font-mono-tabular text-slate-300">
            <ArrowDown className="w-4 h-4 text-orange-500 animate-bounce" />
            <span>Scroll to rotate &amp; engage coupler</span>
          </div>
        </div>
      </div>
    </section>
  );
}
