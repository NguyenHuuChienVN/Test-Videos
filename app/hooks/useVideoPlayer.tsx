"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function useVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // ── Auto-play / Pause via IntersectionObserver (Bonus Feature) ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
          // Video vào viewport đủ 70% → tự động phát
          video.play().catch(() => {
            // Trình duyệt sẽ chặn autoplay → cần muted
            video.muted = true;
            video.play().catch(() => {});
          });
          setIsPlaying(true);
        } else {
          // Video rời viewport → tự động dừng
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.7 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  // ── Click để Play/Pause (Core Feature) ──
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  return { videoRef, isPlaying, isMuted, togglePlay, toggleMute };
}
