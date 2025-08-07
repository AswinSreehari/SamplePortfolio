import React from "react";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import Video from "../../assets/Videos/desktop.mp4"
import Thumpnail from "../../assets/Images/Thumpnail.webp"

const VideoElement = () => {
  return (
    <div className="h-[100vh] w-full relative ">
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="from-center"
        videoSrc= {Video}
        thumbnailSrc= {Thumpnail}
        thumbnailAlt=" Video Thumbnail"
      />
    </div>
  );
};

export default VideoElement;
