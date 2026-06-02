"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Video } from "@/app/types/video";
import { useVideoPlayer } from "@/app/hooks/useVideoPlayer";

interface VideoItemProps {
  video: Video;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".0", "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(".0", "") + "K";
  return n.toString();
}

export default function VideoItem({ video }: VideoItemProps) {
  const { videoRef, isPlaying, isMuted, togglePlay, toggleMute } =
    useVideoPlayer();

  // ── Social State (Bonus Feature) ──
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likesCount);
  const [following, setFollowing] = useState(false);
  const [showToast, setShowToast] = useState("");
  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(""), 2000);
    return () => clearTimeout(timer);
  }, [showToast]);

  const handleLike = () => {
    const next = !liked;
    setLiked(next);
    setLikeCount((prev) => {
        if (next) return prev + 1;
        return Math.max(0, prev - 1);
    });
  };

  const handleToast = (message: string) => {
    setShowToast(message);
  }

  const avatarColors: Record<string, string> = {
    MD: "from-violet-500 to-purple-700",
    LC: "from-rose-500 to-red-700",
    VU: "from-emerald-500 to-teal-700",
    TA: "from-amber-500 to-orange-700",
    HR: "from-sky-500 to-blue-700",
  };
  const initials = video.authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const avatarGrad = avatarColors[initials] ?? "from-zinc-500 to-zinc-700";

  return (
    <article
      className="
        relative w-full h-screen shrink-0
        snap-start snap-always
        flex items-center justify-center
        bg-black overflow-hidden
      "
    >
      {/* ── VIDEO ELEMENT (Core Feature) ── */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        muted={isMuted}
        preload="none"
        className="
          absolute inset-0 w-full h-full object-cover
          cursor-pointer select-none
          /* PC: giữ tỉ lệ 9:16, căn giữa */
          md:w-auto md:h-full md:max-h-screen md:left-1/2 md:-translate-x-1/2
        "
        loop
        playsInline
        onClick={togglePlay}
        aria-label={`Video của ${video.authorName}: ${video.description}`}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/90 via-black/10 to-black/30" />

      {/* ── PLAY / PAUSE INDICATOR ── */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center pointer-events-none
          transition-opacity duration-300
          ${isPlaying ? "opacity-0" : "opacity-100"}
        `}
      >
        <div className="bg-black/40 backdrop-blur-sm rounded-full p-5 border border-white/20">
          {isPlaying ? (
            /* pause icon */
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            /* play icon */
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </div>
      </div>

      {/* ── BOTTOM INFO (Core Feature) ── */}
      <div className="absolute bottom-0 left-0 right-20 md:right-20 p-4 md:p-6 pb-15 md:pb-15 z-10">
        {/* Author row */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-full bg-linear-to-br ${avatarGrad}
              flex items-center justify-center text-white text-xs font-bold
              ring-2 ring-white/30 shrink-0`}
          >
            {initials}
          </div>
          <span className="text-white font-semibold text-sm">{video.authorName}</span>
          <button
            onClick={() => setFollowing((f) => !f)}
            className={`
              ml-2 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200
              ${following
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-white/60 hover:border-white"}
            `}
          >
            {following ? "Đang theo dõi" : " Theo dõi"}
          </button>
        </div>

        {/* Description */}
        <p className="text-white text-sm leading-relaxed mb-2 line-clamp-3 mr-2">
          {video.description}
        </p>
      </div>

      {/* ── RIGHT ACTION BAR (Core Feature) ── */}
      <div className="absolute right-2 md:right-4 bottom-16 md:bottom-20 flex flex-col items-center gap-5 z-10">
        {/* Like Button (Bonus Feature: Social State) */}
        <button
          onClick={handleLike}
          aria-label={liked ? "Bỏ thích" : "Thích video"}
          className="flex flex-col items-center gap-1 group"
        >
          <div
            className={`
              w-11 h-11 rounded-full flex items-center justify-center
              backdrop-blur-sm transition-all duration-200
              ${liked
                ? "bg-red-500/30 scale-110"
                : "bg-white/10 hover:bg-white/20"}
            `}
          >
            <svg
              className={`w-6 h-6 transition-all duration-200 ${
                liked ? "fill-red-500 stroke-red-500 scale-110" : "fill-none stroke-white"
              }`}
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </div>
          <span
            className={`text-xs font-semibold transition-colors ${
              liked ? "text-red-400" : "text-white/80"
            }`}
          >
            {formatCount(likeCount)}
          </span>
        </button>

        {/* Comment */}
        <button
          onClick={() => handleToast("Tính năng bình luận sắp ra mắt!")}
          className="flex flex-col items-center gap-1 group"
          aria-label="Bình luận"
        >
          <div className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </div>
        </button>

        {/* Share */}
        <button
          onClick={() => handleToast("Đã sao chép link!")}
          className="flex flex-col items-center gap-1 group"
          aria-label="Chia sẻ"
        >
          <div className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </div>
        </button>

        {/* Mute toggle */}
        <button
          onClick={toggleMute}
          className="flex flex-col items-center gap-1"
          aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
        >
          <div className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all">
            {isMuted ? (
              <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" viewBox="0 0 24 24">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" viewBox="0 0 24 24">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 010 7.07" /><path d="M19.07 4.93a10 10 0 010 14.14" />
              </svg>
            )}
          </div>
        </button>
      </div>

      {/* ── TOAST NOTIFICATION ── */}
      {showToast && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap">
            {showToast}
          </div>
        </div>
      )}
    </article>
  );
}
