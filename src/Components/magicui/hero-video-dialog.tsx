"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(' ');

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out";

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
}

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
};

export default function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const selectedAnimation = animationVariants[animationStyle];

  return (
    // Outer container to center everything
    <div className="w-full h-[100vh] mt-40 mb-40 flex items-center justify-center">
      <div className={cn("relative w-200 h-120 ", className)}>
        <button
          type="button"
          aria-label="Play video"
          className="group relative cursor-pointer border-0 bg-transparent p-0 w-full h-full block"
          onClick={() => setIsVideoOpen(true)}
        >
          {/* Image container */}
          <img
            src={thumbnailSrc}
            alt={thumbnailAlt}
            className="w-full h-full object-cover rounded-md border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]"
          />
          
          {/* Play button overlay - positioned absolutely over the image */}
          <div className="absolute  inset-0 flex items-center justify-center transition-all duration-200 ease-out group-hover:scale-105">
            <div className="flex size-28 items-center justify-center rounded-full bg-black/20 backdrop-blur-md transition-all duration-200 ease-out group-hover:scale-110">
              <div className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-b from-blue-500/30 to-blue-600 shadow-md transition-all duration-200 ease-out group-hover:scale-110">
                <Play
                  className="size-8 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105 ml-1"
                  style={{
                    filter:
                      "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                  }}
                />
              </div>
            </div>
          </div>
        </button>

        <AnimatePresence>
          {isVideoOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
                  setIsVideoOpen(false);
                }
              }}
              onClick={() => setIsVideoOpen(false)}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
            >
              <motion.div
                {...selectedAnimation}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="relative mx-4 aspect-video w-full max-w-4xl md:mx-0"
              >
                <motion.button 
                  className="absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md hover:bg-neutral-900/70 transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsVideoOpen(false);
                  }}
                >
                  <X className="size-5" />
                </motion.button>
                <div className="relative isolate z-[1] size-full overflow-hidden rounded-2xl border-2 border-white">
                  <iframe
                    src={videoSrc}
                    title="Hero Video player"
                    className="size-full rounded-2xl"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  ></iframe>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Demo component showing usage
const VideoElementDemo = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-900 to-purple-900">
      <HeroVideoDialog
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
        thumbnailSrc="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop"
        thumbnailAlt="Sample Video Thumbnail"
        className="w-96 h-96"
      />
    </div>
  );
};

 