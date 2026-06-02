"use client";

import { Video } from "@/app/types/video";
import VideoItem from "./VideoItem";

interface VideoFeedProps {
  videos: Video[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  return (
    <main
      className="
        h-screen overflow-y-scroll
        snap-y snap-mandatory
        scrollbar-hide
        bg-black
        flex-1
        smooth-scroll
      "
      aria-label="Video feed"
    >
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </main>
  );
}
