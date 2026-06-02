import { Video } from "./types/video";
import VideoFeed from "./components/VideoFeed";

// Server Component: fetch dữ liệu phía server, truyền xuống client
async function getVideos(): Promise<Video[]> {

    const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  // Gọi internal API route của chính app
  const res = await fetch(`${baseUrl}/api/videos`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Không thể tải danh sách video");
  }

  return res.json();
}

export default async function HomePage() {
  const videos = await getVideos();

  return (
    // pb-16 md:pb-0 → chừa chỗ cho bottom nav trên mobile
    <div className="flex-1 overflow-hidden pb-16 md:pb-0">
      <VideoFeed videos={videos} />
    </div>
  );
}
