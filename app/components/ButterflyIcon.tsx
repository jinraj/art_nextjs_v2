'use client';

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// ButterflyIcon
// Usage: <ButterflyIcon size={80} flapSpeed={1} />
// - size: pixel size of the icon (default 80)
// - flapSpeed: multiplier for flap speed (default 1)
// This component listens to global mousemove events and starts flapping
// while the mouse is moving. After `INACTIVITY_MS` of no movement it stops.

type Props = {
  size?: number;
  flapSpeed?: number; // 0.5 = slower, 2 = faster
  className?: string;
};

const INACTIVITY_MS = 420; // milliseconds to wait before stopping

export default function ButterflyIcon({ size = 80, flapSpeed = 1, className = "" }: Props) {
  const [isFlying, setIsFlying] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const controls = useAnimation();

  // FOLLOW MOUSE: target and current positions
  const targetRef = useRef({ x: window?.innerWidth / 2 ?? 0, y: window?.innerHeight / 2 ?? 0 });
  const currentRef = useRef({ x: targetRef.current.x, y: targetRef.current.y });
  const rafRef = useRef<number | null>(null);

  // expose position to cause rendered move
  const [, setTick] = useState(0);

  // start/stop wing animation via framer-motion controls
  useEffect(() => {
    if (isFlying) {
      controls.start("fly");
    } else {
      controls.start("rest");
    }
  }, [isFlying, controls]);

  // movement / flap detection combined
  useEffect(() => {
    function onPointerMove(e: MouseEvent | TouchEvent) {
      // compute clientX/Y in a unified way
      let clientX: number | undefined;
      let clientY: number | undefined;

      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        const t = (e as TouchEvent).touches?.[0] || (e as TouchEvent).changedTouches?.[0];
        if (t) {
          clientX = t.clientX;
          clientY = t.clientY;
        }
      }
      if (clientX == null || clientY == null) return;

      // set target for follow
      targetRef.current.x = clientX;
      targetRef.current.y = clientY - 8; // small vertical offset so butterfly is slightly above cursor (adjust if needed)

      // flap logic (same as before)
      setIsFlying(true);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        setIsFlying(false);
        timeoutRef.current = null;
      }, INACTIVITY_MS);

      // start RAF loop if not running
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    function animate() {
      // ease factor - higher = snappier
      const ease = 0.16;

      // lerp current towards target
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * ease;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * ease;

      // trigger re-render (lightweight)
      setTick(t => t + 1);

      // stop animating when very close
      const dx = Math.abs(targetRef.current.x - currentRef.current.x);
      const dy = Math.abs(targetRef.current.y - currentRef.current.y);
      if (dx < 0.5 && dy < 0.5) {
        // small snap to exact target and stop RAF
        currentRef.current.x = targetRef.current.x;
        currentRef.current.y = targetRef.current.y;
        setTick(t => t + 1);
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("touchmove", onPointerMove, { passive: true });

    // initialize to center if needed
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []); // run once

  // Wing animation variants (side-view feel)
  const wingVariants = {
    rest: {
      rotate: [0, 0],
      y: 0,
      transition: { duration: 0.6 / flapSpeed, ease: "easeOut" },
    },
    fly: {
      rotate: [0, -18, 10, -12, 6, -6, 0],
      y: [0, -3, 2, -2, 1, -1, 0],
      transition: {
        duration: 0.9 / flapSpeed,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  } as const;

  // A compact side-view butterfly built with simple shapes + SVG for crispness.
  const w = size;
  const h = Math.round(size * 0.8);

  // Use the currentRef position to render the fixed-position wrapper.
  // We center the element on the pointer using transform: translate(-50%,-50%)
  const left = currentRef.current.x;
  const top = currentRef.current.y;

  return (
    // Floating fixed container that follows the mouse
    <div
      className={`inline-block ${className}`}
      style={{
        position: "fixed",
        left: left,
        top: top,
        transform: "translate(-50%, -50%)",
        width: w,
        height: h,
        pointerEvents: "none", // so it doesn't block page interactions
        touchAction: "none",
        zIndex: 9999, // ensure visible on top; lower if needed
      }}
      aria-hidden={false}
      role="img"
      aria-label="It Is Meaningful - butterfly icon"
    >
      {/* Body (slightly tilted for side profile) */}
      <svg viewBox="0 0 120 96" width={w} height={h} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="bodyGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#FFD57A" />
            <stop offset="100%" stopColor="#FF9A6A" />
          </linearGradient>
          <linearGradient id="wingGradA" x1="0" x2="1">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="50%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>
          <linearGradient id="wingGradB" x1="0" x2="1">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#FB7185" />
          </linearGradient>
        </defs>

        {/* Left (back) wing - identical to right wing, but using left wing's color */}
        <motion.g
          initial="rest"
          animate={controls}
          variants={wingVariants}
          transform-origin="64px 48px"
          style={{ transformBox: "fill-box" }}
        >
          <path
            d="M50 24 C 86 0, 110 22, 86 48 C 70 68, 52 80, 42 64 C 36 52, 40 36, 50 24 Z"
            fill="url(#wingGradB)" // <<< using left wing color gradient
            opacity="0.7" // <<< slightly transparent so it looks behind
            transform="scale(0.9) translate(-1,2) rotate(-25,64,50)" // <<< smaller and nudged to peek behind
          />

          {/* Decorative pattern (optional, faint, so it doesn’t overpower the front wing) */}
          <ellipse cx="78" cy="40" rx="10" ry="6" fill="#fff" opacity="0.08" transform="scale(0.9) translate(-6,4)" />
        </motion.g>

        {/* Right (front) wing - main colorful wing that flaps */}
        <motion.g initial="rest" animate={controls} variants={wingVariants} transform-origin="64px 48px" style={{ transformBox: "fill-box" }}>
          <path d="M50 24 C 86 0, 110 22, 86 48 C 70 68, 52 80, 42 64 C 36 52, 40 36, 50 24 Z" fill="url(#wingGradA)" />

          {/* decorative patterns inside wing */}
          <ellipse cx="73" cy="35" rx="10" ry="10" fill="#fff" opacity="0.18" />
          <ellipse cx="62" cy="55" rx="6" ry="6" fill="#fff" opacity="0.18" />
        </motion.g>

        {/* Antenna */}
        <g transform="translate(-14,16) rotate(-7,50,60)">
          <path d="M60 13 C58 6, 54 4, 52 6" stroke="#4B2E83" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="52" cy="6" r="2.2" fill="#4B2E83" />
        </g>
        <g transform="translate(-15,15) rotate(-15,64,50)">
          <path d="M60 13 C58 6, 54 4, 52 6" stroke="#4B2E83" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="52" cy="6" r="2.2" fill="#4B2E83" />
        </g>

        {/* Body */}
        <g transform="translate(28,18)">
          <ellipse cx="12" cy="30" rx="10" ry="20" fill="url(#bodyGrad)" />
          <rect x="6" y="18" width="12" height="8" rx="6" fill="#FFB07C" opacity="0.9" />

          {/* Eye (side view) */}
          <circle cx="10" cy="20" r="2.6" fill="#0B1226" />
          <circle cx="9" cy="19" r="0.9" fill="#fff" opacity="0.9" />

          {/* Body decoration: 3 subtle upward curved lines */}
          <path d="M6 28 C 9 30, 15 30, 18 28" stroke="#6B3E2E" strokeWidth="1.5" strokeOpacity="0.4" fill="none" strokeLinecap="round" />
          <path d="M6 34 C 9 36, 15 36, 18 34" stroke="#6B3E2E" strokeWidth="1.5" strokeOpacity="0.4" fill="none" strokeLinecap="round" />
          <path d="M6 40 C 9 42, 15 42, 18 40" stroke="#6B3E2E" strokeWidth="1.5" strokeOpacity="0.4" fill="none" strokeLinecap="round" />
        </g>
      </svg>

      {/* A small shadow to ground the icon */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: 2,
          width: Math.round(w * 0.38),
          height: Math.round(w * 0.08),
          borderRadius: 9999,
          filter: "blur(6px)",
          background: "rgba(12,12,12,0.12)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
