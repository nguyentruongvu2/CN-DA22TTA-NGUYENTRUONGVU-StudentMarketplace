# CẤU TRÚC CƠ SỞ DỮ LIỆU - DATABASE SCHEMA

## Tổng quan hệ thống

Hệ thống quản lý sàn giao dịch mua bán, trao đổi đồ cũ cho sinh viên với 12 bảng chính.

---

## 1. BẢNG NGUOI_DUNG (User)

**Collection:** `NGUOI_DUNG`

### Thuộc tính:

| Tên trường              | Kiểu dữ liệu | Mô tả                | Ràng buộc                                                                             |
| ----------------------- | ------------ | -------------------- | ------------------------------------------------------------------------------------- |
| \_id                    | ObjectId     | ID duy nhất          | Primary Key                                                                           |
| fullName                | String       | Họ và tên            | Required, trim                                                                        |
| email                   | String       | Email                | Required, Unique, lowercase                                                           |
| password                | String       | Mật khẩu (đã mã hóa) | Required, minlength: 6                                                                |
| studentId               | String       | Mã sinh viên         | Unique, sparse                                                                        |
| university              | String       | Trường đại học       | Enum: ["Đại học Bách Khoa", "Đại học Kinh tế", "Đại học Công nghệ thông tin", "Khác"] |
| major                   | String       | Ngành học            |                                                                                       |
| avatar                  | String       | URL ảnh đại diện     | Default: null                                                                         |
| bio                     | String       | Tiểu sử              |                                                                                       |
| phone                   | String       | Số điện thoại        |                                                                                       |
| address                 | String       | Địa chỉ              |                                                                                       |
| role                    | String       | Vai trò              | Enum: ["sinh_vien", "admin"], Default: "sinh_vien"                                    |
| isVerified              | Boolean      | Đã xác thực email    | Default: false                                                                        |
| verificationToken       | String       | Token xác thực       |                                                                                       |
| verificationTokenExpiry | Date         | Hết hạn token        |                                                                                       |
| resetPasswordToken      | String       | Token reset mật khẩu |                                                                                       |
| resetPasswordExpiry     | Date         | Hết hạn reset        |                                                                                       |
| isActive                | Boolean      | Trạng thái hoạt động | Default: true                                                                         |
| lockReason              | String       | Lý do khóa tài khoản |                                                                                       |
| lockedAt                | Date         | Thời gian khóa       |                                                                                       |
| warningCount            | Number       | Số lần cảnh báo      | Default: 0                                                                            |
| isOnline                | Boolean      | Đang online          | Default: false                                                                        |
| lastSeen                | Date         | Lần cuối online      | Default: Date.now                                                                     |
| rating                  | Number       | Đánh giá             | Min: 0, Max: 5, Default: 5                                                            |
| totalRatings            | Number       | Tổng số đánh giá     | Default: 0                                                                            |
| createdAt               | Date         | Ngày tạo             | Default: Date.now                                                                     |
| updatedAt               | Date         | Ngày cập nhật        | Default: Date.now                                                                     |

---

## Note: Audit log collection and related schema have been removed from the application.

| commentCount | Number | Số bình luận | Default: 0 |
| savedBy | [ObjectId] | Mảng user đã lưu | Reference: User |
| createdAt | Date | Ngày tạo | Default: Date.now |
| updatedAt | Date | Ngày cập nhật | Default: Date.now |
| expiresAt | Date | Ngày hết hạn | |

### Index:

- sellerId
- status, createdAt
- category
- postType

### Mối quan hệ:

- **sellerId** → User.\_id (Many-to-One)
- **savedBy[]** → User.\_id (Many-to-Many)

---

## 3. BẢNG BINH_LUAN (Comment)

**Collection:** `BINH_LUAN`

### Thuộc tính:

| Tên trường      | Kiểu dữ liệu | Mô tả                      | Ràng buộc                                     |
| --------------- | ------------ | -------------------------- | --------------------------------------------- |
| \_id            | ObjectId     | ID duy nhất                | Primary Key                                   |
| content         | String       | Nội dung                   | Required, maxlength: 1000                     |
| rating          | Number       | Đánh giá sao               | Min: 1, Max: 5                                |
| postId          | ObjectId     | ID bài đăng                | Required, Reference: Post                     |
| commenterId     | ObjectId     | ID người bình luận         | Required, Reference: User                     |
| targetUserId    | ObjectId     | ID người được đánh giá     | Reference: User                               |
| parentCommentId | ObjectId     | ID comment cha (reply)     | Reference: Comment, Default: null             |
| isApproved      | Boolean      | Đã duyệt                   | Default: true                                 |
| reactions       | Object       | Các cảm xúc                | like[], love[], haha[], wow[], sad[], angry[] |
| likes           | [ObjectId]   | Mảng user đã like (legacy) | Reference: User                               |
| createdAt       | Date         | Ngày tạo                   | Default: Date.now                             |
| updatedAt       | Date         | Ngày cập nhật              | Default: Date.now                             |

### Index:

- postId, createdAt
- commenterId
- parentCommentId

### Mối quan hệ:

- **postId** → Post.\_id (Many-to-One)
- **commenterId** → User.\_id (Many-to-One)
- **targetUserId** → User.\_id (Many-to-One)
- **parentCommentId** → Comment.\_id (One-to-Many - Self-referencing)

---

## 4. BẢNG BAO_CAO (Report)

**Collection:** `BAO_CAO`

### Thuộc tính:

| Tên trường     | Kiểu dữ liệu | Mô tả                  | Ràng buộc                                                                                |
| -------------- | ------------ | ---------------------- | ---------------------------------------------------------------------------------------- |
| \_id           | ObjectId     | ID duy nhất            | Primary Key                                                                              |
| title          | String       | Tiêu đề                | maxlength: 100                                                                           |
| description    | String       | Mô tả                  | maxlength: 2000                                                                          |
| reason         | String       | Lý do báo cáo          | Required                                                                                 |
| reporterId     | ObjectId     | ID người báo cáo       | Required, Reference: User                                                                |
| postId         | ObjectId     | ID bài đăng bị báo cáo | Reference: Post                                                                          |
| commentId      | ObjectId     | ID comment bị báo cáo  | Reference: Comment                                                                       |
| reportedUserId | ObjectId     | ID người bị báo cáo    | Required, Reference: User                                                                |
| reportType     | String       | Loại báo cáo           | Required, Enum: ["post", "comment"], Default: "post"                                     |
| evidence       | [String]     | Bằng chứng (URLs)      |                                                                                          |
| status         | String       | Trạng thái             | Enum: ["cho_xu_ly", "dang_xem_xet", "da_xu_ly", "bi_loai_bo"], Default: "cho_xu_ly"      |
| adminId        | ObjectId     | ID admin xử lý         | Reference: User                                                                          |
| adminResponse  | String       | Phản hồi từ admin      |                                                                                          |
| action         | String       | Hành động xử lý        | Enum: ["canh_bao", "tam_khoa", "xoa_bai", "khong_hanh_dong"], Default: "khong_hanh_dong" |
| createdAt      | Date         | Ngày tạo               | Default: Date.now                                                                        |
| resolvedAt     | Date         | Ngày giải quyết        |                                                                                          |

### Index:

- status, createdAt
- postId
- reportedUserId

### Mối quan hệ:

- **reporterId** → User.\_id (Many-to-One)
- **postId** → Post.\_id (Many-to-One)
- **commentId** → Comment.\_id (Many-to-One)
- **reportedUserId** → User.\_id (Many-to-One)
- **adminId** → User.\_id (Many-to-One)

---

## 5. BẢNG CANH_BAO (Warning)

**Collection:** `CANH_BAO`

### Thuộc tính:

| Tên trường    | Kiểu dữ liệu | Mô tả                | Ràng buộc                   |
| ------------- | ------------ | -------------------- | --------------------------- |
| \_id          | ObjectId     | ID duy nhất          | Primary Key                 |
| userId        | ObjectId     | ID người bị cảnh báo | Required, Reference: User   |
| reportId      | ObjectId     | ID báo cáo liên quan | Required, Reference: Report |
| adminId       | ObjectId     | ID admin xử lý       | Required, Reference: User   |
| reason        | String       | Lý do cảnh báo       | Required                    |
| adminResponse | String       | Phản hồi từ admin    | Required                    |
| isRead        | Boolean      | Đã đọc               | Default: false              |
| createdAt     | Date         | Ngày tạo             | Default: Date.now           |

### Index:

- userId, createdAt

### Mối quan hệ:

- **userId** → User.\_id (Many-to-One)
- **reportId** → Report.\_id (One-to-One)
- **adminId** → User.\_id (Many-to-One)

---

## 6. BẢNG TIN_NHAN (Message)

**Collection:** `TIN_NHAN`

### Thuộc tính:

| Tên trường     | Kiểu dữ liệu | Mô tả              | Ràng buộc                         |
| -------------- | ------------ | ------------------ | --------------------------------- |
| \_id           | ObjectId     | ID duy nhất        | Primary Key                       |
| content        | String       | Nội dung tin nhắn  | Required                          |
| images         | [String]     | Mảng URL hình ảnh  |                                   |
| conversationId | ObjectId     | ID cuộc trò chuyện | Required, Reference: Conversation |
| senderId       | ObjectId     | ID người gửi       | Required, Reference: User         |
| isRead         | Boolean      | Đã đọc             | Default: false                    |
| readAt         | Date         | Thời gian đọc      |                                   |
| isRecalled     | Boolean      | Đã thu hồi         | Default: false                    |
| recalledAt     | Date         | Thời gian thu hồi  |                                   |
| createdAt      | Date         | Ngày tạo           | Default: Date.now                 |

### Index:

- conversationId, createdAt
- senderId

### Mối quan hệ:

- **conversationId** → Conversation.\_id (Many-to-One)
- **senderId** → User.\_id (Many-to-One)

---

## 7. BẢNG TRAO_DOI (Conversation)

**Collection:** `TRAO_DOI`

### Thuộc tính:

| Tên trường    | Kiểu dữ liệu | Mô tả                  | Ràng buộc                 |
| ------------- | ------------ | ---------------------- | ------------------------- |
| \_id          | ObjectId     | ID duy nhất            | Primary Key               |
| participants  | [ObjectId]   | Mảng ID người tham gia | Required, Reference: User |
| postId        | ObjectId     | ID bài đăng liên quan  | Reference: Post           |
| lastMessage   | String       | Tin nhắn cuối          |                           |
| lastMessageAt | Date         | Thời gian tin cuối     |                           |
| isActive      | Boolean      | Đang hoạt động         | Default: true             |
| createdAt     | Date         | Ngày tạo               | Default: Date.now         |
| updatedAt     | Date         | Ngày cập nhật          | Default: Date.now         |

### Index:

### Mối quan hệ:

## 8. BẢNG NHAT_KY_KIEM_TRA (AuditLog)

**Collection:** `NHAT_KY_KIEM_TRA`

### Thuộc tính:

| Tên trường  | Kiểu dữ liệu | Mô tả                  | Ràng buộc                                                                                                                                                                                                                                                           |
| ----------- | ------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_id        | ObjectId     | ID duy nhất            | Primary Key                                                                                                                                                                                                                                                         |
| userId      | ObjectId     | ID người thực hiện     | Required, Reference: User                                                                                                                                                                                                                                           |
| action      | String       | Loại hành động         | Required, Enum: ["login", "logout", "register", "create_post", "update_post", "delete_post", "approve_post", "reject_post", "create_comment", "delete_comment", "create_report", "handle_report", "lock_user", "unlock_user", "warn_user", "send_message", "other"] |
| description | String       | Mô tả chi tiết         | Required                                                                                                                                                                                                                                                            |
| ipAddress   | String       | Địa chỉ IP             |                                                                                                                                                                                                                                                                     |
| userAgent   | String       | Thông tin trình duyệt  |                                                                                                                                                                                                                                                                     |
| targetId    | String       | ID đối tượng liên quan |                                                                                                                                                                                                                                                                     |
| targetType  | String       | Loại đối tượng         | Enum: ["post", "comment", "user", "report", "message", "other"]                                                                                                                                                                                                     |
| metadata    | Mixed        | Dữ liệu bổ sung (JSON) |                                                                                                                                                                                                                                                                     |
| createdAt   | Date         | Ngày tạo               | Default: Date.now                                                                                                                                                                                                                                                   |

### Index:

### Mối quan hệ:

---

## Note: Audit log collection and related schema have been removed from the application.

## 9. BẢNG DANH_MUC (Category) - MỚI

**Collection:** `DANH_MUC`

### Thuộc tính:

| Tên trường  | Kiểu dữ liệu | Mô tả             | Ràng buộc                          |
| ----------- | ------------ | ----------------- | ---------------------------------- |
| \_id        | ObjectId     | ID duy nhất       | Primary Key                        |
| name        | String       | Tên danh mục      | Required, Unique, maxlength: 50    |
| slug        | String       | URL-friendly name | Required, Unique, lowercase        |
| description | String       | Mô tả             | maxlength: 500                     |
| icon        | String       | Icon/Emoji        |                                    |
| color       | String       | Màu sắc (hex)     | Default: "#3b82f6"                 |
| order       | Number       | Thứ tự hiển thị   | Default: 0                         |
| isActive    | Boolean      | Hoạt động         | Default: true                      |
| parentId    | ObjectId     | Danh mục cha      | Reference: Category, Default: null |
| postCount   | Number       | Số bài đăng       | Default: 0                         |
| createdBy   | ObjectId     | Người tạo         | Required, Reference: User          |
| createdAt   | Date         | Ngày tạo          | Default: Date.now                  |
| updatedAt   | Date         | Ngày cập nhật     | Default: Date.now                  |

### Index:

- slug
- isActive, order
- parentId

### Mối quan hệ:

- **parentId** → Category.\_id (Self-referencing, One-to-Many)
- **createdBy** → User.\_id (Many-to-One)

---

## 10. BẢNG LOAI_BAI_DANG (PostType) - MỚI

**Collection:** `LOAI_BAI_DANG`

### Thuộc tính:

| Tên trường  | Kiểu dữ liệu | Mô tả           | Ràng buộc                                              |
| ----------- | ------------ | --------------- | ------------------------------------------------------ |
| \_id        | ObjectId     | ID duy nhất     | Primary Key                                            |
| name        | String       | Tên loại        | Required, Unique, maxlength: 50                        |
| code        | String       | Mã loại         | Required, Unique, lowercase                            |
| description | String       | Mô tả           | maxlength: 500                                         |
| icon        | String       | Icon/Emoji      |                                                        |
| color       | String       | Màu sắc (hex)   | Default: "#10b981"                                     |
| isActive    | Boolean      | Hoạt động       | Default: true                                          |
| order       | Number       | Thứ tự hiển thị | Default: 0                                             |
| config      | Object       | Cấu hình        | { requirePrice, requireExchangeFor, allowNegotiation } |
| postCount   | Number       | Số bài đăng     | Default: 0                                             |
| createdBy   | ObjectId     | Người tạo       | Required, Reference: User                              |
| createdAt   | Date         | Ngày tạo        | Default: Date.now                                      |
| updatedAt   | Date         | Ngày cập nhật   | Default: Date.now                                      |

### Index:

- code
- isActive, order

### Mối quan hệ:

- **createdBy** → User.\_id (Many-to-One)

---

## 11. BẢNG BO_LOC (Filter) - MỚI

**Collection:** `BO_LOC`

### Thuộc tính:

| Tên trường           | Kiểu dữ liệu | Mô tả               | Ràng buộc                                                                        |
| -------------------- | ------------ | ------------------- | -------------------------------------------------------------------------------- |
| \_id                 | ObjectId     | ID duy nhất         | Primary Key                                                                      |
| name                 | String       | Tên bộ lọc          | Required, maxlength: 50                                                          |
| type                 | String       | Loại bộ lọc         | Required, Enum: ["price_range", "condition", "location", "university", "custom"] |
| group                | String       | Nhóm                | Default: "general"                                                               |
| values               | [Object]     | Giá trị bộ lọc      | [{ label, value, icon }]                                                         |
| priceRange           | Object       | Cấu hình khoảng giá | { min, max, step }                                                               |
| inputType            | String       | Kiểu input          | Enum: ["select", "checkbox", "range", "radio"], Default: "select"                |
| isActive             | Boolean      | Hoạt động           | Default: true                                                                    |
| order                | Number       | Thứ tự hiển thị     | Default: 0                                                                       |
| applicableCategories | [ObjectId]   | Danh mục áp dụng    | Reference: Category                                                              |
| applicablePostTypes  | [ObjectId]   | Loại bài áp dụng    | Reference: PostType                                                              |
| createdBy            | ObjectId     | Người tạo           | Required, Reference: User                                                        |
| createdAt            | Date         | Ngày tạo            | Default: Date.now                                                                |
| updatedAt            | Date         | Ngày cập nhật       | Default: Date.now                                                                |

### Index:

- type, isActive
- group, order

### Mối quan hệ:

- **applicableCategories[]** → Category.\_id (Many-to-Many)
- **applicablePostTypes[]** → PostType.\_id (Many-to-Many)
- **createdBy** → User.\_id (Many-to-One)

---

## 12. BẢNG BANNER (Banner) - MỚI

**Collection:** `BANNER`

### Thuộc tính:

| Tên trường  | Kiểu dữ liệu | Mô tả           | Ràng buộc                                           |
| ----------- | ------------ | --------------- | --------------------------------------------------- |
| \_id        | ObjectId     | ID duy nhất     | Primary Key                                         |
| title       | String       | Tiêu đề         | Required, maxlength: 100                            |
| description | String       | Mô tả           | maxlength: 200                                      |
| imageUrl    | String       | URL hình ảnh    | Required                                            |
| link        | String       | Link đích       |                                                     |
| linkType    | String       | Loại link       | Enum: ["internal", "external"], Default: "internal" |
| order       | Number       | Thứ tự hiển thị | Default: 0                                          |
| isActive    | Boolean      | Hoạt động       | Default: true                                       |
| startDate   | Date         | Ngày bắt đầu    | Default: Date.now                                   |
| endDate     | Date         | Ngày kết thúc   |                                                     |
| clickCount  | Number       | Lượt click      | Default: 0                                          |
| viewCount   | Number       | Lượt xem        | Default: 0                                          |
| createdBy   | ObjectId     | Người tạo       | Required, Reference: User                           |
| createdAt   | Date         | Ngày tạo        | Default: Date.now                                   |
| updatedAt   | Date         | Ngày cập nhật   | Default: Date.now                                   |

### Index:

- isActive, order
- startDate, endDate

### Mối quan hệ:

- **createdBy** → User.\_id (Many-to-One)

---

## BIỂU ĐỒ MỐI QUAN HỆ THỰC THỂ (ERD)

```
┌─────────────────┐
│     USER        │◄────────────┐
│  (NGUOI_DUNG)   │             │
└────────┬────────┘             │
         │                      │
         │ 1:N                  │
         ▼                      │
┌─────────────────┐             │
│     POST        │             │
│  (BAI_DANG)     │             │
└────────┬────────┘             │
         │                      │
         │ 1:N                  │
         ▼                      │
┌─────────────────┐             │
│    COMMENT      │             │
│  (BINH_LUAN)    │─────────────┘
└────────┬────────┘    N:1
         │
         │ Self 1:N (parentCommentId)
         │
┌────────┴────────┐
│     REPORT      │
│   (BAO_CAO)     │
└────────┬────────┘
         │
         │ 1:1
         ▼
┌─────────────────┐
│    WARNING      │
│   (CANH_BAO)    │
└─────────────────┘

┌─────────────────┐         ┌──────────────────┐
│  CONVERSATION   │◄───N:N──┤     USER         │
│   (TRAO_DOI)    │         │  (participants)  │
└────────┬────────┘         └──────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐
│    MESSAGE      │
│   (TIN_NHAN)    │
└─────────────────┘

┌─────────────────┐
│   AUDIT_LOG     │
│(NHAT_KY_KT)     │──N:1──► USER
└─────────────────┘

┌─────────────────┐
│    CATEGORY     │──Self 1:N (parentId)
│   (DANH_MUC)    │
└─────────────────┘

┌─────────────────┐
│   POST_TYPE     │
│ (LOAI_BAI_DANG) │
└─────────────────┘

┌─────────────────┐         ┌──────────────────┐
│     FILTER      │◄───N:N──┤    CATEGORY      │
│   (BO_LOC)      │         └──────────────────┘
│                 │
│                 │◄───N:N──┤    POST_TYPE     │
└─────────────────┘         └──────────────────┘

┌─────────────────┐
│     BANNER      │──N:1──► USER (createdBy)
└─────────────────┘
```

---

## CHI TIẾT MỐI QUAN HỆ

### 1. User ↔ Post (1:N)

- Một User có thể tạo nhiều Post
- Mỗi Post thuộc về một User (sellerId)

### 2. Post ↔ Comment (1:N)

- Một Post có thể có nhiều Comment
- Mỗi Comment thuộc về một Post

### 3. User ↔ Comment (1:N)

- Một User có thể viết nhiều Comment
- Mỗi Comment được viết bởi một User (commenterId)

### 4. Comment ↔ Comment (1:N - Self-referencing)

- Một Comment có thể có nhiều Comment con (replies)
- Mỗi Comment reply thuộc về một Comment cha (parentCommentId)

### 5. User ↔ Report (1:N)

- Một User có thể tạo nhiều Report
- Một User có thể bị nhiều Report
- Mỗi Report có một reporterId và một reportedUserId

### 6. Report ↔ Warning (1:1)

- Mỗi Report có thể tạo ra một Warning
- Mỗi Warning liên quan đến một Report

### 7. User ↔ Conversation (N:M)

- Một User có thể tham gia nhiều Conversation
- Mỗi Conversation có nhiều User (participants[])

### 8. Conversation ↔ Message (1:N)

- Một Conversation có nhiều Message
- Mỗi Message thuộc về một Conversation

### 9. User ↔ Message (1:N)

- Một User có thể gửi nhiều Message
- Mỗi Message được gửi bởi một User (senderId)

### 10. User ↔ AuditLog (1:N)

- Một User có thể có nhiều AuditLog
- Mỗi AuditLog ghi nhận hành động của một User

### 11. Category ↔ Category (1:N - Self-referencing)

- Một Category có thể có nhiều Category con
- Mỗi Category con thuộc về một Category cha (parentId)

### 12. Filter ↔ Category (N:M)

- Một Filter có thể áp dụng cho nhiều Category
- Một Category có thể có nhiều Filter

### 13. Filter ↔ PostType (N:M)

- Một Filter có thể áp dụng cho nhiều PostType
- Một PostType có thể có nhiều Filter

### 14. User ↔ Banner (1:N)

- Một User (admin) có thể tạo nhiều Banner
- Mỗi Banner được tạo bởi một User (createdBy)

---

## CARDINALITY (Lực lượng quan hệ)

| Quan hệ                | Cardinality | Giải thích                         |
| ---------------------- | ----------- | ---------------------------------- |
| User → Post            | 1:N         | Một user nhiều bài đăng            |
| Post → Comment         | 1:N         | Một bài đăng nhiều bình luận       |
| User → Comment         | 1:N         | Một user nhiều bình luận           |
| Comment → Comment      | 1:N         | Một comment nhiều replies          |
| User → Report          | N:M         | User báo cáo và bị báo cáo         |
| Report → Warning       | 1:1         | Một báo cáo một cảnh báo           |
| User ↔ Conversation    | N:M         | Nhiều user nhiều cuộc trò chuyện   |
| Conversation → Message | 1:N         | Một cuộc trò chuyện nhiều tin nhắn |
| Category → Category    | 1:N         | Danh mục cha nhiều danh mục con    |
| Filter ↔ Category      | N:M         | Nhiều filter nhiều category        |
| Filter ↔ PostType      | N:M         | Nhiều filter nhiều posttype        |

---

## NOTES

- Tất cả \_id đều là ObjectId của MongoDB
- Timestamps (createdAt, updatedAt) tự động được tạo
- Index được tạo để tối ưu query performance
- Enum values được validate ở application level
- Reference relationships được implement qua populate()
