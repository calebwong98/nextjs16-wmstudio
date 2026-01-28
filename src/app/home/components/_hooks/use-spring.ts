"use client";

/**
 * useSpring Hook
 *
 * A lightweight spring physics hook for smooth animations.
 * Uses requestAnimationFrame for 60fps animations without
 * external dependencies like GSAP or Framer Motion.
 *
 * Spring physics creates natural, organic motion that feels
 * more realistic than linear or eased transitions.
 */

import { useState, useEffect, useRef, useCallback } from "react";

interface SpringConfig {
  /** Stiffness of the spring (higher = snappier). Default: 150 */
  stiffness?: number;
  /** Damping ratio (higher = less oscillation). Default: 15 */
  damping?: number;
  /** Mass of the object (higher = more inertia). Default: 1 */
  mass?: number;
  /** Precision threshold for stopping. Default: 0.01 */
  precision?: number;
}

interface SpringState {
  value: number;
  velocity: number;
}

const DEFAULT_CONFIG: Required<SpringConfig> = {
  stiffness: 150,
  damping: 15,
  mass: 1,
  precision: 0.01,
};

/**
 * Animates a value using spring physics.
 *
 * @param target - The target value to animate toward
 * @param config - Spring configuration options
 * @returns Current animated value
 */
export function useSpring(target: number, config?: SpringConfig): number {
  const { stiffness, damping, mass, precision } = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  const [current, setCurrent] = useState(target);
  const state = useRef<SpringState>({ value: target, velocity: 0 });
  const rafId = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);

  const animate = useCallback(() => {
    const now = performance.now();
    const deltaTime = lastTime.current
      ? Math.min((now - lastTime.current) / 1000, 0.064) // Cap at ~15fps minimum
      : 0.016;
    lastTime.current = now;

    const { value, velocity } = state.current;

    // Spring force: F = -kx (Hooke's law)
    const displacement = value - target;
    const springForce = -stiffness * displacement;

    // Damping force: F = -cv
    const dampingForce = -damping * velocity;

    // Acceleration: a = F/m
    const acceleration = (springForce + dampingForce) / mass;

    // Update velocity and position
    const newVelocity = velocity + acceleration * deltaTime;
    const newValue = value + newVelocity * deltaTime;

    state.current = { value: newValue, velocity: newVelocity };
    setCurrent(newValue);

    // Check if spring has settled
    const isSettled =
      Math.abs(newVelocity) < precision && Math.abs(displacement) < precision;

    if (!isSettled) {
      rafId.current = requestAnimationFrame(animate);
    } else {
      // Snap to target when settled
      state.current = { value: target, velocity: 0 };
      setCurrent(target);
    }
  }, [target, stiffness, damping, mass, precision]);

  useEffect(() => {
    lastTime.current = null;
    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [animate]);

  return current;
}

/**
 * Animates multiple values using spring physics.
 * Useful for x/y coordinates or scale/opacity pairs.
 */
export function useSpringValues<T extends Record<string, number>>(
  targets: T,
  config?: SpringConfig,
): T {
  const [values, setValues] = useState<T>(targets);
  const states = useRef<Record<string, SpringState>>({});
  const rafId = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);

  const { stiffness, damping, mass, precision } = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  // Initialize states for new keys
  useEffect(() => {
    Object.keys(targets).forEach((key) => {
      if (!states.current[key]) {
        states.current[key] = { value: targets[key], velocity: 0 };
      }
    });
  }, [targets]);

  const animate = useCallback(() => {
    const now = performance.now();
    const deltaTime = lastTime.current
      ? Math.min((now - lastTime.current) / 1000, 0.064)
      : 0.016;
    lastTime.current = now;

    let allSettled = true;
    const newValues = { ...targets };

    Object.keys(targets).forEach((key) => {
      const target = targets[key];
      const state = states.current[key] || { value: target, velocity: 0 };
      const { value, velocity } = state;

      const displacement = value - target;
      const springForce = -stiffness * displacement;
      const dampingForce = -damping * velocity;
      const acceleration = (springForce + dampingForce) / mass;

      const newVelocity = velocity + acceleration * deltaTime;
      const newValue = value + newVelocity * deltaTime;

      const isSettled =
        Math.abs(newVelocity) < precision && Math.abs(displacement) < precision;

      if (isSettled) {
        states.current[key] = { value: target, velocity: 0 };
        newValues[key as keyof T] = target as T[keyof T];
      } else {
        allSettled = false;
        states.current[key] = { value: newValue, velocity: newVelocity };
        newValues[key as keyof T] = newValue as T[keyof T];
      }
    });

    setValues(newValues);

    if (!allSettled) {
      rafId.current = requestAnimationFrame(animate);
    }
  }, [targets, stiffness, damping, mass, precision]);

  useEffect(() => {
    lastTime.current = null;
    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [animate]);

  return values;
}
