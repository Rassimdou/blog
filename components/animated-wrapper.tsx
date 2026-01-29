"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface AnimatedWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "blur";
}

export function AnimatedWrapper({
  children,
  delay = 0,
  className = "",
  animation = "fade-up",
}: AnimatedWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const animationClasses = {
    "fade-up": "translate-y-8 opacity-0",
    "fade-down": "-translate-y-8 opacity-0",
    "fade-left": "translate-x-8 opacity-0",
    "fade-right": "-translate-x-8 opacity-0",
    scale: "scale-95 opacity-0",
    blur: "blur-sm opacity-0",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "translate-x-0 translate-y-0 scale-100 blur-0 opacity-100" : animationClasses[animation]
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function StaggeredList({
  children,
  staggerDelay = 100,
  className = "",
}: {
  children: ReactNode[];
  staggerDelay?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <AnimatedWrapper key={index} delay={index * staggerDelay}>
          {child}
        </AnimatedWrapper>
      ))}
    </div>
  );
}
