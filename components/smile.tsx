"use client";

import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

import { AngrySmile } from "./icons/angry-smile";
import { DefaultSmile } from "./icons/default-smile";
import { HappySmile } from "./icons/happy-smile";
import { QuestioningSmile } from "./icons/questioning-smile";
import { SuprisedSmile } from "./icons/suprised-smile";
import { Button } from "./ui/button";

const moods = [
  "default",
  "questioning",
  "happy",
  "angry",
  "surprised",
] as const;

type Mood = (typeof moods)[number];
type EyeTransform = {
  x: number;
  y: number;
};

// Lower alpha = smoother but more lag. Tune between 0.08–0.2
const ORIENTATION_ALPHA = 0.12;
// Skip frames where gamma jumps more than this (discontinuity guard)
const GAMMA_JUMP_THRESHOLD = 55;

export function Smile(props: React.ComponentProps<"svg">) {
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const smileContainerRef = React.useRef<HTMLButtonElement>(null);
  const smoothedOrientationRef = React.useRef({ x: 0, y: 0 });
  const prevGammaRef = React.useRef<number | null>(null);

  const [mood, setMood] = React.useState<Mood>("default");

  const [eyeTransform, setEyeTransform] = React.useState<EyeTransform>({
    x: 0,
    y: 0,
  });

  const isTouchScreen =
    typeof window !== "undefined" && "ontouchstart" in window;

  async function requestOrientationPermission() {
    return (
      DeviceOrientationEvent as unknown as {
        requestPermission: () => Promise<string>;
      }
    )
      .requestPermission()
      .then((state) => {
        if (state !== "granted") {
          abortControllerRef.current?.abort();
        }
      })
      .catch(() => {
        abortControllerRef.current?.abort();
      });
  }

  async function moodChange() {
    setMood((prev) => {
      const filteredMoods = moods.findIndex((m) => m === prev);
      const nextMood = moods[(filteredMoods + 1) % moods.length];

      return nextMood;
    });

    if (isTouchScreen) {
      await requestOrientationPermission();
    }
  }

  React.useEffect(() => {
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    function onMouseMove(event: MouseEvent) {
      const smileContainer = smileContainerRef.current;
      if (!smileContainer) return;
      const left = smileContainer?.offsetLeft;
      const top = smileContainer?.offsetTop;
      const width = smileContainer?.offsetWidth;
      const height = smileContainer?.offsetHeight;
      const x = (event.clientX - left) / width - 0.5 * 2;
      const y = (event.clientY - top) / height - 0.5 * 2;

      const boundedX = Math.max(-0.5, Math.min(x, 0.5));
      const boundedY = Math.max(-0.5, Math.min(y, 0.7));

      React.startTransition(() => {
        setEyeTransform({ x: boundedX, y: boundedY });
      });
    }

    function onDeviceOrientationChange(event: DeviceOrientationEvent) {
      const { gamma, beta } = event;
      if (gamma == null || beta == null) return;

      // Guard: skip frames with large gamma discontinuity (wrap/flip artifact)
      const prevGamma = prevGammaRef.current;
      if (
        prevGamma !== null &&
        Math.abs(gamma - prevGamma) > GAMMA_JUMP_THRESHOLD
      ) {
        prevGammaRef.current = gamma;
        return;
      }
      prevGammaRef.current = gamma;

      // gamma: -90..90 → x: -0.5..0.5
      const rawX = (gamma / 90) * 0.5;

      // Center Y around ~90° (normal upright hold).
      // Putting phone down → beta drops toward 0 → rawY goes negative (up).
      // Scale kept modest so movement stays subtle.
      const rawY = ((beta - 90) / 90) * 0.35;

      // Exponential smoothing
      const sx =
        ORIENTATION_ALPHA * rawX +
        (1 - ORIENTATION_ALPHA) * smoothedOrientationRef.current.x;
      const sy =
        ORIENTATION_ALPHA * rawY +
        (1 - ORIENTATION_ALPHA) * smoothedOrientationRef.current.y;
      smoothedOrientationRef.current = { x: sx, y: sy };

      // Tight upward clamp (-0.15) prevents eyes going past brow
      const boundedX = Math.max(-0.5, Math.min(0.5, sx));
      const boundedY = Math.max(-0.15, Math.min(0.45, sy));

      React.startTransition(() => {
        setEyeTransform({ x: boundedX, y: boundedY });
      });
    }

    if (isTouchScreen) {
      document.addEventListener("mousemove", onMouseMove, {
        passive: true,
        signal: abortController.signal,
      });

      return;
    }

    window.addEventListener("deviceorientation", onDeviceOrientationChange, {
      passive: true,
      signal: abortController.signal,
    });

    return () => abortController.abort();
  }, [isTouchScreen]);

  return (
    <Button
      size="auto"
      variant="clean"
      data-slot="smile"
      onClick={moodChange}
      ref={smileContainerRef}
      className="size-11 [contain:strict]"
      onMouseEnter={() => {
        if (isTouchScreen) {
          return;
        }

        return moodChange();
      }}
      style={
        {
          "--eye-transform": `translate(${eyeTransform.x}px, ${eyeTransform.y}px)`,
        } as React.CSSProperties
      }
    >
      <span className="sr-only">{mood} smile, navigate to the home page</span>
      <AnimatePresence mode="wait">
        {mood === "default" && (
          <motion.span
            key={mood}
            {...{
              initial: { scale: 0.95 },
              exit: { scale: 0.95 },
              animate: { scale: 1 },
              transition: { duration: 0.1, ease: "easeOut" },
            }}
            className="inline-flex"
          >
            <DefaultSmile {...props} />
          </motion.span>
        )}

        {mood === "happy" && (
          <motion.span
            key={mood}
            {...{
              initial: { scale: 0.95 },
              exit: { scale: 0.95 },
              animate: { scale: 1 },
              transition: { duration: 0.1, ease: "easeOut" },
            }}
            className="inline-flex"
          >
            <HappySmile {...props} />
          </motion.span>
        )}

        {mood === "angry" && (
          <motion.span
            key={mood}
            {...{
              initial: { scale: 0.95 },
              exit: { scale: 0.95 },
              animate: { scale: 1 },
              transition: { duration: 0.1, ease: "easeOut" },
            }}
            className="inline-flex"
          >
            <AngrySmile {...props} />
          </motion.span>
        )}

        {mood === "surprised" && (
          <motion.span
            key={mood}
            {...{
              initial: { scale: 0.95 },
              exit: { scale: 0.95 },
              animate: { scale: 1 },
              transition: { duration: 0.1, ease: "easeOut" },
            }}
            className="inline-flex"
          >
            <SuprisedSmile {...props} />
          </motion.span>
        )}

        {mood === "questioning" && (
          <motion.span
            key={mood}
            {...{
              initial: { scale: 0.95 },
              exit: { scale: 0.95 },
              animate: { scale: 1 },
              transition: { duration: 0.1, ease: "easeOut" },
            }}
            className="inline-flex"
          >
            <QuestioningSmile {...props} />
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
