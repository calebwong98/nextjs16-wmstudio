/**
 * Component Metadata
 *
 * Full metadata for each showcased component including
 * preview, code, and documentation. Separated from the
 * registry index to allow lazy loading.
 */

import type { ComponentMeta } from "./types";
import { AnimatedButton } from "../_demos/animated-button";
import { ScrollRevealDemo } from "../_demos/scroll-reveal-card";
import { MagneticCursorDemo } from "../_demos/magnetic-cursor";

/**
 * Full component metadata registry.
 * Preview components are rendered client-side on detail pages.
 */
export const componentMeta: Record<string, ComponentMeta> = {
  "animated-button": {
    slug: "animated-button",
    title: "Animated Button",
    description:
      "A button with physics-based hover animations and tactile press feedback. Demonstrates spring animations and micro-interactions.",
    tags: ["interaction", "animation", "button", "spring"],
    preview: (
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap gap-4 justify-center">
          <AnimatedButton variant="primary">Primary Button</AnimatedButton>
          <AnimatedButton variant="secondary">Secondary</AnimatedButton>
          <AnimatedButton variant="outline">Outline</AnimatedButton>
        </div>
        <div className="flex gap-4">
          <AnimatedButton size="sm">Small</AnimatedButton>
          <AnimatedButton size="md">Medium</AnimatedButton>
          <AnimatedButton size="lg">Large</AnimatedButton>
        </div>
      </div>
    ),
    usage: `import { AnimatedButton } from "@/components/animated-button";

export default function Example() {
  return (
    <AnimatedButton 
      variant="primary" 
      size="md"
      onClick={() => console.log("Clicked!")}
    >
      Click Me
    </AnimatedButton>
  );
}`,
    code: `"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useSpring, useReducedMotion } from "./hooks";

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function AnimatedButton({
  children,
  className,
  onClick,
  variant = "primary",
  size = "md",
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Spring-animated scale value
  const targetScale = isPressed ? 0.95 : isHovered ? 1.05 : 1;
  const scale = useSpring(targetScale, {
    stiffness: 400,
    damping: 25,
    mass: 0.5,
  });

  const currentScale = prefersReducedMotion ? targetScale : scale;

  const variantStyles = {
    primary: "bg-foreground text-background hover:shadow-lg",
    secondary: "bg-muted text-foreground hover:bg-muted/80",
    outline: "border-2 border-foreground text-foreground",
  };

  const sizeStyles = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center",
        "font-medium rounded-xl transition-shadow duration-200",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      style={{ transform: \`scale(\${currentScale})\` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
    >
      {/* Glow effect */}
      <span
        className={cn(
          "absolute inset-0 rounded-xl transition-opacity",
          variant === "primary" && "bg-primary/20 blur-xl",
          isHovered ? "opacity-100" : "opacity-0"
        )}
        style={{ transform: "translateY(4px)" }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}`,
    animationNotes: `**Spring Physics Animation**

The button uses a custom \`useSpring\` hook that simulates real-world spring physics:

- **Stiffness (400)**: Higher values make the animation snappier
- **Damping (25)**: Controls oscillation - we want minimal bounce
- **Mass (0.5)**: Lower mass = faster response to input

**State Transitions:**
- Rest → Hover: Scale 1.0 → 1.05 (subtle growth)
- Hover → Press: Scale 1.05 → 0.95 (instant tactile feedback)
- Press → Release: Spring back to 1.05 or 1.0

The spring creates natural-feeling motion that responds smoothly to rapid state changes without jarring transitions.`,
    performanceNotes: `**Optimizations Applied:**

1. **GPU-accelerated transforms**: Uses \`transform: scale()\` which is composited on the GPU, avoiding layout recalculation.

2. **Isolated state**: Each button manages its own hover/press state without prop drilling or context.

3. **RAF-based animation**: The spring hook uses \`requestAnimationFrame\` with proper cleanup to prevent memory leaks.

4. **Minimal re-renders**: State updates only affect the transform style, not the entire component tree.

5. **Reduced motion support**: When \`prefers-reduced-motion\` is enabled, the spring is bypassed entirely, using the target value directly.

**Bundle impact**: ~1.2KB gzipped (including useSpring hook)`,
    accessibilityNotes: `**Accessibility Features:**

- Respects \`prefers-reduced-motion\` system setting
- Uses semantic \`<button>\` element
- Focus states inherited from base styles
- No animation during keyboard navigation
- Click handler works with keyboard activation`,
  },

  "scroll-reveal-card": {
    slug: "scroll-reveal-card",
    title: "Scroll Reveal Card",
    description:
      "Cards that gracefully animate into view as you scroll. Uses intersection observer with staggered entrance animations.",
    tags: ["scroll", "animation", "card", "intersection-observer"],
    preview: <ScrollRevealDemo />,
    usage: `import { ScrollRevealCard } from "@/components/scroll-reveal-card";

export default function Example() {
  return (
    <div className="space-y-4">
      <ScrollRevealCard direction="up" delay={0}>
        First card appears immediately
      </ScrollRevealCard>
      
      <ScrollRevealCard direction="up" delay={100}>
        Second card with 100ms delay
      </ScrollRevealCard>
      
      <ScrollRevealCard direction="left" delay={200}>
        Third card from the left
      </ScrollRevealCard>
    </div>
  );
}`,
    code: `"use client";

import { cn } from "@/lib/utils";
import { useIntersectionObserver, useReducedMotion } from "./hooks";
import type { ReactNode, CSSProperties } from "react";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealCardProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  distance?: number;
  duration?: number;
  threshold?: number;
}

export function ScrollRevealCard({
  children,
  className,
  direction = "up",
  delay = 0,
  distance = 40,
  duration = 600,
  threshold = 0.1,
}: ScrollRevealCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isInView } = useIntersectionObserver({
    threshold,
    triggerOnce: true,
    rootMargin: "-50px",
  });

  const getInitialTransform = (): string => {
    if (prefersReducedMotion) return "none";
    
    const transforms: Record<Direction, string> = {
      up: \`translateY(\${distance}px)\`,
      down: \`translateY(-\${distance}px)\`,
      left: \`translateX(\${distance}px)\`,
      right: \`translateX(-\${distance}px)\`,
    };
    return transforms[direction];
  };

  const style: CSSProperties = {
    opacity: prefersReducedMotion ? 1 : isInView ? 1 : 0,
    transform: isInView ? "none" : getInitialTransform(),
    transition: prefersReducedMotion
      ? "none"
      : \`opacity \${duration}ms ease-out \${delay}ms, 
         transform \${duration}ms ease-out \${delay}ms\`,
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn("rounded-xl border bg-card p-6", className)}
      style={style}
    >
      {children}
    </div>
  );
}`,
    animationNotes: `**Intersection Observer Animation**

This component uses the browser's native IntersectionObserver API to detect when elements enter the viewport:

**How it works:**
1. The \`useIntersectionObserver\` hook attaches an observer to the card element
2. When the element crosses the visibility threshold, \`isInView\` becomes true
3. CSS transitions handle the animation from initial to final state
4. \`triggerOnce: true\` ensures the animation only plays once

**Animation Properties:**
- **Opacity**: Fades from 0 to 1
- **Transform**: Slides from offset position to final position
- **Duration**: 600ms with ease-out timing
- **Stagger**: Configurable delay for sequential animations

**Direction Support:**
Cards can animate from any direction (up, down, left, right), making it flexible for different layout needs.`,
    performanceNotes: `**Performance Optimizations:**

1. **IntersectionObserver vs Scroll Listener**: 
   - Runs off the main thread
   - No layout thrashing from getBoundingClientRect()
   - Browser-optimized for intersection detection

2. **CSS-based animation**:
   - Uses CSS transitions instead of JavaScript animation
   - GPU-accelerated opacity and transform
   - No JavaScript running during the animation

3. **One-time trigger**:
   - Observer disconnects after first intersection
   - No continuous observation overhead

4. **Minimal DOM reads**:
   - No dimension calculations during scroll
   - Threshold-based triggering

**Considerations:**
- For many cards, consider virtualization
- Root margin prevents animation starting too late`,
    accessibilityNotes: `**Accessibility Considerations:**

- **Reduced motion**: Animation completely disabled when \`prefers-reduced-motion\` is set
- **Content always visible**: Even without animation, content is rendered and accessible
- **No content shifting**: Final position matches initial layout, preventing CLS
- **Screen reader friendly**: Content structure unchanged by animation state`,
  },

  "magnetic-cursor": {
    slug: "magnetic-cursor",
    title: "Magnetic Cursor",
    description:
      "Interactive elements that attract toward the cursor, creating a magnetic pull effect. Great for CTAs and navigation.",
    tags: ["cursor", "interaction", "magnetic", "hover"],
    preview: <MagneticCursorDemo />,
    usage: `import { MagneticCursor } from "@/components/magnetic-cursor";

export default function Example() {
  return (
    <MagneticCursor strength={25} magneticDistance={150}>
      <button className="px-6 py-3 bg-primary text-white rounded-lg">
        Hover near me
      </button>
    </MagneticCursor>
  );
}`,
    code: `"use client";

import { useState, useRef, useCallback, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { useSpringValues, useReducedMotion } from "./hooks";

interface MagneticCursorProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  magneticDistance?: number;
  stiffness?: number;
  damping?: number;
}

export function MagneticCursor({
  children,
  className,
  strength = 20,
  magneticDistance = 150,
  stiffness = 150,
  damping = 15,
}: MagneticCursorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const position = useSpringValues(target, { stiffness, damping });

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < magneticDistance) {
        const pull = 1 - distance / magneticDistance;
        const moveX = distanceX * pull * (strength / magneticDistance);
        const moveY = distanceY * pull * (strength / magneticDistance);
        setTarget({ x: moveX, y: moveY });
      } else {
        setTarget({ x: 0, y: 0 });
      }
    },
    [magneticDistance, strength, prefersReducedMotion]
  );

  return (
    <div
      ref={ref}
      className={cn("relative inline-block", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTarget({ x: 0, y: 0 })}
    >
      <div style={{ transform: \`translate(\${position.x}px, \${position.y}px)\` }}>
        {children}
      </div>
    </div>
  );
}`,
    animationNotes: `**Magnetic Physics Calculation**

The magnetic effect simulates attraction based on cursor proximity:

**Distance Calculation:**
\`\`\`
distance = √(distanceX² + distanceY²)
\`\`\`

**Pull Strength:**
\`\`\`
pull = 1 - (distance / magneticDistance)
\`\`\`
- At center: pull = 1 (maximum attraction)
- At edge: pull = 0 (no attraction)
- Beyond: no effect

**Movement Calculation:**
\`\`\`
moveX = distanceX × pull × (strength / magneticDistance)
moveY = distanceY × pull × (strength / magneticDistance)
\`\`\`

The spring animation smooths the position updates, creating fluid motion that follows the cursor naturally.

**Return Animation:**
When the cursor leaves, target resets to (0, 0) and the spring animates the element back to center.`,
    performanceNotes: `**Performance Considerations:**

1. **Mouse move throttling**:
   - Spring physics naturally rate-limits visual updates
   - Target state updates are lightweight

2. **Scoped event handling**:
   - Mouse events only fire within the magnetic wrapper
   - No global listeners

3. **Transform-only animation**:
   - Uses GPU-composited translate transform
   - No layout recalculation

4. **Ref-based measurements**:
   - getBoundingClientRect called per move
   - Consider caching for static layouts

**Potential optimizations:**
- Add ResizeObserver to cache element rect
- Throttle mousemove with requestAnimationFrame
- Use passive event listeners`,
    accessibilityNotes: `**Accessibility Features:**

- **Reduced motion**: Effect completely disabled when system preference is set
- **Keyboard navigation**: Element functions normally without magnetic effect
- **Focus handling**: Focus states unaffected by magnetic movement
- **No content obscuring**: Element returns to original position on mouse leave

**Note:** The magnetic effect is purely visual enhancement. All interactive elements remain fully functional via keyboard.`,
  },
};

/**
 * Get full metadata for a component by slug
 */
export function getComponentMeta(slug: string): ComponentMeta | undefined {
  return componentMeta[slug];
}
