# 🎓 Student Marketplace - Hệ thống Trao đổi & Bán Dụng cụ Học tập

Một nền tảng trực tuyến toàn diện cho phép sinh viên đăng ký, đăng nhập bằng email sinh viên hợp lệ, tạo và quản lý các bài đăng bán hoặc trao đổi dụng cụ học tập.

---

## 📋 Mục lục

- [Tính năng chính](#-tính-năng-chính)
- [Tech Stack](#-tech-stack)
- [Cài đặt & Chạy dự án](#-cài-đặt--chạy-dự-án)
- [Đóng gói Docker](#-đóng-gói-docker)
- [Truy cập từ điện thoại (Ngrok)](#-truy-cập-từ-điện-thoại-ngrok)
- [Responsive Design](#-responsive-design)
- [API Documentation](#-api-documentation)

---

## 🌟 Tính năng chính

### Cho sinh viên:

- 📝 **Đăng ký & Đăng nhập**: Xác thực email sinh viên thông qua link xác minh
- 📢 **Tạo & Quản lý bài đăng**: Bán hoặc trao đổi dụng cụ học tập
- 🔍 **Tìm kiếm & Lọc**: Tìm bài đăng theo danh mục, tình trạng, giá cả
- 💬 **Bình luận & Đánh giá**: Tương tác với người bán
- 💬 **Chat Real-time**: Liên hệ trực tiếp với người bán
- 📊 **Xem chi tiết bài đăng**: Hình ảnh, mô tả, đánh giá người bán
- 🚩 **Báo cáo vi phạm**: Gửi báo cáo khi phát hiện nội dung không phù hợp
- ⭐ **Hệ thống đánh giá**: Đánh giá người bán dựa trên chất lượng dịch vụ

### Cho quản trị viên (Admin):

- ✅ **Duyệt bài đăng**: Phê duyệt hoặc từ chối bài đăng ban đầu
- 🔍 **Quản lý báo cáo**: Xem và xử lý báo cáo vi phạm
- 🔐 **Khóa/Mở tài khoản**: Khóa hoặc mở tài khoản sinh viên vi phạm
- 📊 **Thống kê**: Theo dõi hoạt động trên nền tảng

# Student Marketplace — Hướng dẫn cài đặt & kiểm thử

Phiên bản rút gọn và cập nhật của README cho dự án "Student Marketplace".

> NOTE: Tính năng "Audit Logs" đã bị gỡ khỏi mã nguồn — các API, trang và hướng dẫn liên quan sẽ không còn hoạt động.

---

## Mục lục

- Giới thiệu
- Yêu cầu hệ thống
- Cấu trúc dự án
- Cài đặt & chạy (Backend / Frontend)
- Biến môi trường (mẫu)
- Lệnh hữu ích
- API chính & ví dụ
- Hướng dẫn kiểm thử bằng Postman (Login, Create/Edit/Delete Post)
- Xóa collection Audit (nếu cần)
- Liên hệ

---

## Giới thiệu

Một nền tảng trao đổi và mua bán đồ dùng học tập cho sinh viên, gồm backend bằng Node/Express + MongoDB và frontend bằng React.

---

## Yêu cầu hệ thống

- Node.js v16+ (LTS)
- npm hoặc yarn
- MongoDB (local) hoặc MongoDB Atlas

---

## Cấu trúc dự án (tóm tắt)

- `Backend/` — server Express, models, controllers, routes
- `Frontent/` — React app (ghi chú tên thư mục giữ nguyên như trong repo)
- `mongo-backup/` — chứa bản sao dữ liệu nếu có

---

## Cài đặt & chạy

### 1) Backend

```bash
cd Backend
npm install
# Tạo file .env từ mẫu .env.example và cập nhật các biến cần thiết
# Ví dụ: MONGODB_URI, JWT_SECRET, EMAIL_...
npm run dev
```

Server mặc định chạy trên `http://localhost:5000`.

### 2) Frontend

```bash
cd Frontent
npm install
npm start
```

Frontend mặc định chạy trên `http://localhost:3000`.

---

## Biến môi trường (mẫu)

Tạo `Backend/.env` chứa ít nhất:

- `MONGODB_URI` — connection string MongoDB
- `PORT` — (ví dụ 5000)
- `JWT_SECRET`
- Email SMTP config nếu cần gửi mail

---

## Lệnh hữu ích

- Khởi động Docker (nếu cấu hình):

```bash
docker-compose up -d --build
```

- Backup dữ liệu (script có sẵn):

Windows PowerShell:

```powershell
.\backup-local-data.ps1
```

Bash:

```bash
./backup-local-data.sh
```

---

## API chính (tóm tắt)

Tài liệu dưới đây trình bày các endpoint quan trọng để test tính năng người dùng.

Base URL (dev): `http://localhost:5000/api`

Auth

- `POST /auth/register` — đăng ký
- `POST /auth/login` — đăng nhập (trả về token JWT)
- `POST /auth/logout` — đăng xuất

Posts

- `GET /posts` — lấy danh sách
- `GET /posts/:id` — xem chi tiết
- `POST /posts` — tạo bài (yêu cầu Authorization)
- `PUT /posts/:id` — cập nhật bài (yêu cầu Authorization)
- `DELETE /posts/:id` — xóa bài (yêu cầu Authorization)

Comments, Reports, Users: tương tự — xem trong mã nguồn `Backend/routes` nếu cần chi tiết.

---

## Hướng dẫn kiểm thử bằng Postman

Dưới đây là các bước cụ thể để kiểm thử tính năng cơ bản: đăng nhập, tạo bài, sửa bài, xóa bài.

Chuẩn bị:

- Mở Postman
- Tạo environment (ví dụ `Local`) và thêm biến `baseUrl = http://localhost:5000/api` và biến `token` (để lưu JWT sau khi login)

1.  Login (lấy token)

- Method: POST
- URL: `{{baseUrl}}/auth/login`
- Body (JSON):

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

- Tests (Postman) — lưu token tự động:

```javascript
// Trong tab Tests của request login
const json = pm.response.json();
if (json && json.token) {
  pm.environment.set("token", json.token);
}
```

- Sau khi chạy: kiểm tra `Environment` → biến `token` đã được set.

2.  Tạo bài viết (Create Post)

- Method: POST
- URL: `{{baseUrl}}/posts`
- Headers:
  - `Authorization: Bearer {{token}}`
  - (nếu gửi JSON) `Content-Type: application/json`
- Body (JSON) ví dụ:

```json
{
  "title": "Bán sách Lập trình C cơ bản",
  "description": "Sách còn mới, 200 trang",
  "category": "<categoryId>",
  "postType": "sell",
  "price": 100000,
  "condition": "like_new"
}
```

- Nếu API chấp nhận upload hình (multipart/form-data): chọn `form-data`, thêm field tương ứng `images` (type `file`) cùng các trường text.

- Kết quả mong đợi: HTTP 201 với object bài đăng và `createdBy`/`_id`.

- Lưu `postId` để dùng cho edit/delete (bạn có thể lưu vào environment: `pm.environment.set("postId", response.json().post._id)` trong Tests).

3.  Chỉnh sửa bài viết (Edit Post)

- Method: PUT
- URL: `{{baseUrl}}/posts/{{postId}}`
- Headers:
  - `Authorization: Bearer {{token}}`
  - `Content-Type: application/json`
- Body (JSON) ví dụ:

```json
{
  "title": "Bán sách Lập trình C - cập nhật",
  "price": 90000
}
```

- Kết quả mong đợi: HTTP 200 và object bài đã được cập nhật.

4.  Xóa bài viết (Delete Post)

- Method: DELETE
- URL: `{{baseUrl}}/posts/{{postId}}`
- Headers:

  - `Authorization: Bearer {{token}}`

- Kết quả mong đợi: HTTP 200 và thông báo thành công.

5.  Các lưu ý khi kiểm thử

- Đảm bảo `token` được set trước khi gọi các API cần xác thực.
- Nếu gặp lỗi 401/403: kiểm tra token còn hiệu lực hay user có quyền thao tác (owner/admin).
- Kiểm tra response body để biết cấu trúc lỗi (thường trả về `thành_công: false` và `tin_nhan`).

---

## Xóa collection Audit (nếu còn tồn tại)

Nếu trước đó có collection audit lưu trữ trong Mongo và bạn muốn xoá hoàn toàn (ví dụ tên collection là `auditlogs`), chạy lệnh trên Mongo shell:

```js
use nha-cho-sinh-vien
db.getCollection('auditlogs').drop()
// Hoặc tùy tên collection, ví dụ 'auditlogs' / 'audit_logs'...
```

Hoặc dùng MongoDB Compass để xóa collection.

---

## Ghi chú quan trọng

- Các file liên quan đến Audit Logs đã được gỡ hoặc chuyển thành stub để tránh làm hỏng hệ thống. Nếu bạn muốn khôi phục tính năng Audit Logs, cần thảo luận về cách triển khai lại và bảng schema trong MongoDB.

---

## Liên hệ

Nếu cần hỗ trợ thêm hoặc muốn tôi thực hiện xóa vật lý file/thu mục còn sót và commit thay đổi, cho biết — tôi sẽ thực hiện tiếp.

---

**Phiên bản README:** cập nhật tự động
