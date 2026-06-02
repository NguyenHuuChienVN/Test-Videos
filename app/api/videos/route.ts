import { NextResponse } from "next/server";
import { Video } from "@/app/types/video";

const mockVideos: Video[] = [
    {
        id: "1",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        authorName: "Nguyễn Hữu Chiến",
        description: "Nội dung video thứ 1 trong feed",
        likesCount: 100,
    },
    {
        id: "2",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
        authorName: "Nguyễn Hữu Chiến",
        description: "Nội dung video thứ 2 trong feed",
        likesCount: 150,
    },
    {
        id: "3",
        videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
        authorName: "Nguyễn Hữu Chiến",
        description: "Nội dung video thứ 3 trong feed",
        likesCount: 200,
    }
];

export async function GET() {
    return NextResponse.json(mockVideos);
}
