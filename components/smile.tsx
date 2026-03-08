"use client";

import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

import { AngrySmile } from "./icons/angry-smile";
import { Click } from "./icons/click";
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

export function Smile({
  defaultAcknowledged = false,
  ...props
}: React.ComponentProps<"svg"> & { defaultAcknowledged?: boolean }) {
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const smileContainerRef = React.useRef<HTMLButtonElement>(null);

  const [mood, setMood] = React.useState<Mood>("default");
  const [ackowledged, setAcknowledged] = React.useState(defaultAcknowledged);

  const [eyeTransform, setEyeTransform] = React.useState<EyeTransform>({
    x: 0,
    y: 0,
  });

  const isTouchScreen =
    typeof window !== "undefined" && "ontouchstart" in window;

  async function requestOrientationPermission() {
    const requestPermission = (
      DeviceOrientationEvent as unknown as {
        requestPermission: () => Promise<string>;
      }
    )?.requestPermission;

    if (typeof requestPermission !== "function") {
      // Android / non-iOS — no permission needed, events fire freely
      return;
    }

    return requestPermission()
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

    setAcknowledged(true);
    document.cookie = "acknowledged=true; path=/; max-age=604800";

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

      const x = (gamma / 90) * 2 * 0.5;
      const y = (beta / 180) * 0.6;

      const boundedX = Math.max(-0.5, Math.min(0.5, x));
      const boundedY = Math.max(-0.5, Math.min(0.7, y));

      React.startTransition(() => {
        setEyeTransform({ x: boundedX, y: boundedY });
      });
    }

    document.addEventListener("mousemove", onMouseMove, {
      passive: true,
      signal: abortController.signal,
    });

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
      className="relative size-11"
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
      {!ackowledged ? (
        <span
          data-slot="click"
          className="absolute -right-1.5 -bottom-1.5 transition-transform duration-100 group-active/button:scale-90"
        >
          <Click className="size-6" />
        </span>
      ) : null}

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
