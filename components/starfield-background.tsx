"use client";

import { useEffect, useRef } from "react";

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = document.documentElement.scrollHeight;

    const resize = () => {
      width = window.innerWidth;
      height = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight
      );
      canvas.width = width;
      canvas.height = height;
    };

    resize();

    // Create Data Nodes
    const NODE_COUNT = Math.min(80, Math.floor((width * height) / 12000));
    
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Clean white background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
            const node2 = nodes[j];
            const dx = node.x - node2.x;
            const dy = node.y - node2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(node2.x, node2.y);
                const opacity = 1 - (dist / 150);
                // CyberLife Cyan connections
                ctx.strokeStyle = `rgba(0, 162, 255, ${opacity * 0.15})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }

        // Draw Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 162, 255, 0.4)`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 162, 255, 0.1)`;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(document.documentElement);

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-20"
        style={{ pointerEvents: "none" }}
        aria-hidden="true"
      />
      {/* Background Image Overlay */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: 'url("/blog/detroit_bg.png")' }}
        aria-hidden="true"
      />
    </>
  );
}
