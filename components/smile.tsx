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

export function Smile(props: React.ComponentProps<"svg">) {
  const smileContainerRef = React.useRef<HTMLButtonElement>(null);

  const [mood, setMood] = React.useState<Mood>("default");

  const [eyeTransform, setEyeTransform] = React.useState<EyeTransform>({
    x: 0,
    y: 0,
  });

  const [debug, setDebug] = React.useState<string>("");

  const isTouchScreen =
    typeof window !== "undefined" && "ontouchstart" in window;

  function moodChange() {
    setMood((prev) => {
      const filteredMoods = moods.findIndex((m) => m === prev);
      const nextMood = moods[(filteredMoods + 1) % moods.length];

      return nextMood;
    });
  }

  React.useEffect(() => {
    const abortController = new AbortController();

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

      const x = (gamma / 90) * 2 * 0.5;
      const y = ((beta - 90) / 90) * 2;

      const boundedX = Math.max(-2, Math.min(2, x * 2));
      const boundedY = Math.max(-2, Math.min(2 * 1.4, y * 2));

      React.startTransition(() => {
        setEyeTransform({ x: boundedX, y: boundedY });
      });

      setDebug(`x: ${x}, y: ${y}`);
    }

    if (!isTouchScreen) {
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

    if (
      typeof (
        DeviceOrientationEvent as unknown as {
          requestPermission?: () => Promise<string>;
        }
      ).requestPermission === "function"
    ) {
      const btn = smileContainerRef.current;
      if (btn) {
        const requestOnClick = () => {
          (
            DeviceOrientationEvent as unknown as {
              requestPermission: () => Promise<string>;
            }
          )
            .requestPermission()
            .then((state) => {
              if (state !== "granted") {
                window.removeEventListener(
                  "deviceorientation",
                  onDeviceOrientationChange
                );
              }
            });
          btn.removeEventListener("click", requestOnClick);
        };
        btn.addEventListener("click", requestOnClick, { once: true });
      }
    }

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

        moodChange();
      }}
      style={
        {
          "--eye-transform": `translate(${eyeTransform.x}px, ${eyeTransform.y}px)`,
        } as React.CSSProperties
      }
    >
      <span>{debug}</span>
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
