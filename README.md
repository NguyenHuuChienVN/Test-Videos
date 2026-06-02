# My Video App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Play/Pause Video khi cuộn trang

Ứng dụng sử dụng **IntersectionObserver** để tự động điều khiển trạng thái phát video dựa trên vị trí của video trong viewport.

### Cách hoạt động

* Khi video **xuất hiện trong viewport (≥70%)**:
  * Video sẽ **tự động phát (play)**
* Khi video **ra khỏi viewport**:
  * Video sẽ **tạm dừng (pause)**

### Logic chính

* Sử dụng `IntersectionObserver` để theo dõi từng video
* Thiết lập `threshold: 0.7` để đảm bảo video phải hiển thị đủ lớn mới phát
* Dùng `rootMargin` để preload video trước khi người dùng cuộn tới