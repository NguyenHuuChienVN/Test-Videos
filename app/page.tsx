
import VideoFeed from "./components/VideoFeed";
import { getVideos } from "@/lib/videos";

export default async function HomePage() {
  const videos = await getVideos();

  return (
    // pb-16 md:pb-0 → chừa chỗ cho bottom nav trên mobile
    <div className="flex-1 overflow-hidden pb-16 md:pb-0">
      <VideoFeed videos={videos} />
    </div>
  );
}
