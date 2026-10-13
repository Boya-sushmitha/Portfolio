import React, { useEffect, useRef } from 'react';
import './Canvas3D.css';

const Canvas3D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // 1. Generate Interactive Cosmic Nebula Wave Grid (3D Surface Ribbons)
    const GRID_COLS = 26;
    const GRID_ROWS = 14;
    const GRID_SPACING = 55;

    // 2. Generate 3D Glowing Constellation Starfield with Depth
    const STAR_COUNT = 90;
    const stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 1.8,
        y: (Math.random() - 0.5) * height * 1.8,
        z: Math.random() * 800 + 40,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 0.8,
        colorType: Math.random() > 0.4 ? 'violet' : 'cyan',
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // 3. Floating Cosmic Wireframe Polyhedra (Sacred Geometry Stellated Core)
    const createDodecahedron = (radius) => {
      // Golden ratio
      const phi = (1 + Math.sqrt(5)) / 2;
      const b = 1 / phi;
      const rawV = [
        [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
        [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1],
        [0, b, phi], [0, b, -phi], [0, -b, phi], [0, -b, -phi],
        [b, phi, 0], [b, -phi, 0], [-b, phi, 0], [-b, -phi, 0],
        [phi, 0, b], [phi, 0, -b], [-phi, 0, b], [-phi, 0, -b]
      ];
      const vertices = rawV.map(([x, y, z]) => {
        const len = Math.sqrt(x*x + y*y + z*z);
        return [(x / len) * radius, (y / len) * radius, (z / len) * radius];
      });
      // Selected edge pairings for clean cosmic holographic look
      const edges = [
        [0, 8], [8, 4], [4, 14], [14, 12], [12, 0],
        [0, 16], [16, 17], [17, 1], [1, 12],
        [1, 9], [9, 5], [5, 14],
        [4, 18], [18, 6], [6, 10], [10, 8],
        [8, 10], [10, 2], [2, 16],
        [2, 13], [13, 3], [3, 17],
        [3, 11], [11, 9],
        [5, 19], [19, 7], [7, 11],
        [6, 15], [15, 7], [15, 13]
      ];
      return { vertices, edges };
    };

    const cosmicOrbs = [
      {
        geom: createDodecahedron(95),
        x: width * 0.36,
        y: -height * 0.15,
        z: 320,
        rx: 0.2, ry: 0.4, rz: 0.1,
        speedX: 0.005, speedY: 0.007,
        color: 'violet'
      },
      {
        geom: createDodecahedron(68),
        x: -width * 0.32,
        y: height * 0.26,
        z: 420,
        rx: 0.5, ry: 0.2, rz: 0.3,
        speedX: 0.006, speedY: 0.004,
        color: 'cyan'
      }
    ];

    // 3D Perspective Projection
    const project = (x, y, z) => {
      const fov = 420;
      const scale = fov / (fov + z);
      const x2d = x * scale + width / 2;
      const y2d = y * scale + height / 2;
      return { x: x2d, y: y2d, scale, visible: z > -fov };
    };

    let tick = 0;

    const render = () => {
      tick += 0.018;

      // Mouse camera parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const parallaxX = (mouse.x - width / 2) * 0.14;
      const parallaxY = (mouse.y - height / 2) * 0.14;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

      // --- A. Render 3D Cosmic Nebula Grid Waves ---
      ctx.save();
      const wavePoints = [];
      const waveOffsetY = height * 0.28;

      for (let r = 0; r < GRID_ROWS; r++) {
        wavePoints[r] = [];
        for (let c = 0; c < GRID_COLS; c++) {
          const wx = (c - GRID_COLS / 2) * GRID_SPACING;
          const wz = r * 50 + 200;
          // Sine wave rippling outward from mouse
          const waveHeight = Math.sin(tick * 1.5 + (c * 0.3) + (r * 0.4)) * 32
            + Math.cos(tick + c * 0.2) * 16;
          const wy = waveOffsetY + waveHeight;

          const p = project(wx - parallaxX * 0.6, wy - parallaxY * 0.6, wz);
          wavePoints[r][c] = p;
        }
      }

      // Draw horizontal & vertical nebula wave grid lines
      for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
          const p = wavePoints[r][c];
          if (!p.visible) continue;

          // Connect to right neighbor
          if (c < GRID_COLS - 1) {
            const pRight = wavePoints[r][c + 1];
            if (pRight.visible) {
              const alpha = Math.min(p.scale * 1.2, 0.22);
              ctx.strokeStyle = isDark
                ? `rgba(139, 92, 246, ${alpha})`
                : `rgba(124, 58, 237, ${alpha * 0.7})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(pRight.x, pRight.y);
              ctx.stroke();
            }
          }

          // Connect to bottom neighbor
          if (r < GRID_ROWS - 1) {
            const pDown = wavePoints[r + 1][c];
            if (pDown.visible) {
              const alpha = Math.min(p.scale * 1.2, 0.16);
              ctx.strokeStyle = isDark
                ? `rgba(56, 189, 248, ${alpha})`
                : `rgba(2, 132, 199, ${alpha * 0.7})`;
              ctx.lineWidth = 0.7;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(pDown.x, pDown.y);
              ctx.stroke();
            }
          }
        }
      }
      ctx.restore();

      // --- B. Render 3D Sacred Geometry Dodecahedrons ---
      cosmicOrbs.forEach((orb) => {
        orb.rx += orb.speedX;
        orb.ry += orb.speedY;

        const rotated = orb.geom.vertices.map(([vx, vy, vz]) => {
          let y1 = vy * Math.cos(orb.rx) - vz * Math.sin(orb.rx);
          let z1 = vy * Math.sin(orb.rx) + vz * Math.cos(orb.rx);
          let x2 = vx * Math.cos(orb.ry) + z1 * Math.sin(orb.ry);
          let z2 = -vx * Math.sin(orb.ry) + z1 * Math.cos(orb.ry);
          return [x2, y1, z2];
        });

        const projected = rotated.map(([rx, ry, rz]) => {
          return project(orb.x + rx - parallaxX, orb.y + ry - parallaxY, orb.z + rz);
        });

        ctx.save();
        const strokeColor = orb.color === 'violet'
          ? (isDark ? 'rgba(167, 139, 250, 0.3)' : 'rgba(124, 58, 237, 0.25)')
          : (isDark ? 'rgba(56, 189, 248, 0.26)' : 'rgba(2, 132, 199, 0.2)');

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.2;

        orb.geom.edges.forEach(([i, j]) => {
          const p1 = projected[i];
          const p2 = projected[j];
          if (p1 && p2 && p1.visible && p2.visible) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });

        // Glowing vertices
        projected.forEach((p) => {
          if (p.visible) {
            ctx.fillStyle = orb.color === 'violet'
              ? (isDark ? '#c4b5fd' : '#7c3aed')
              : (isDark ? '#7dd3fc' : '#0284c7');
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.2 * p.scale, 0, Math.PI * 2);
            ctx.fill();
          }
        });
        ctx.restore();
      });

      // --- C. Render Cosmic Constellations & Starlight Particles ---
      const projectedStars = [];
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.z += s.vz;

        if (s.z < 20) s.z = 820;
        if (s.z > 840) s.z = 30;
        if (s.x > width * 0.9) s.x = -width * 0.9;
        if (s.x < -width * 0.9) s.x = width * 0.9;
        if (s.y > height * 0.9) s.y = -height * 0.9;
        if (s.y < -height * 0.9) s.y = height * 0.9;

        const p = project(s.x - parallaxX * (s.z * 0.0016), s.y - parallaxY * (s.z * 0.0016), s.z);
        if (p.visible) {
          projectedStars.push({
            ...p,
            radius: s.radius,
            colorType: s.colorType,
            glow: Math.sin(tick * 2 + s.pulse)
          });
        }
      }

      // Constellation lines between nearby stars
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projectedStars.length; i++) {
        for (let j = i + 1; j < projectedStars.length; j++) {
          const s1 = projectedStars[i];
          const s2 = projectedStars[j];
          const dx = s1.x - s2.x;
          const dy = s1.y - s2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 105) {
            const alpha = (1 - dist / 105) * 0.18 * (s1.scale * s2.scale * 1.5);
            ctx.strokeStyle = isDark
              ? `rgba(167, 139, 250, ${Math.min(alpha, 0.28)})`
              : `rgba(124, 58, 237, ${Math.min(alpha, 0.18)})`;
            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.stroke();
          }
        }
      }

      // Star beacons
      projectedStars.forEach((p) => {
        const r = Math.max(p.radius * p.scale, 0.9);
        const alpha = Math.min(p.scale * 1.3, 0.9) * (0.7 + p.glow * 0.3);

        ctx.fillStyle = p.colorType === 'violet'
          ? (isDark ? `rgba(196, 181, 253, ${alpha})` : `rgba(124, 58, 237, ${alpha})`)
          : (isDark ? `rgba(125, 211, 252, ${alpha})` : `rgba(2, 132, 199, ${alpha})`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas-3d-background" aria-hidden="true" />;
};

export default Canvas3D;
