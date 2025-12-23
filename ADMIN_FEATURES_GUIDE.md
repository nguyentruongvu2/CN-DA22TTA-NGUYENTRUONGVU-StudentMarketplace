# Hướng dẫn Quản lý Danh mục và Loại bài đăng

> NOTE: Tính năng "Audit Logs" đã bị gỡ khỏi dự án. Các hướng dẫn, trang và API liên quan đến audit logs không còn áp dụng.

## 🎯 Tóm tắt các thay đổi

### 1. ✅ Dữ liệu đã được tạo sẵn

Tôi đã tạo script seed và chạy thành công để tạo dữ liệu mẫu:

- **7 Danh mục**: Sách, Điện tử, Văn phòng phẩm, Quần áo, Thể thao, Nội thất, Khác
- **4 Loại bài đăng**: Bán, Trao đổi, Cho tặng, Tìm mua
- **4 Bộ lọc**: Tình trạng, Khoảng giá, Loại sách, Loại thiết bị

### 2. ✅ Ghi chú

- Tính năng Audit Logs đã bị gỡ khỏi mã nguồn. Các thông tin liên quan tới trang, routing và menu audit logs không còn áp dụng.

## 📋 Các trang quản lý hiện có

### 1. **Quản lý Danh mục** (`/admin/categories`)

- ✅ Xem danh sách danh mục
- ✅ Thêm danh mục mới
- ✅ Sửa danh mục
- ✅ Xóa danh mục
- 📱 Người dùng có thể chọn danh mục khi đăng bài

### 2. **Quản lý Loại bài đăng** (`/admin/post-types`)

- ✅ Xem danh sách loại bài đăng
- ✅ Thêm loại bài đăng mới
- ✅ Sửa loại bài đăng
- ✅ Xóa loại bài đăng
- 📱 Người dùng có thể chọn loại bài đăng khi đăng bài

### 3. **Quản lý Bộ lọc** (`/admin/filters`)

- ✅ Xem danh sách bộ lọc
- ✅ Thêm bộ lọc mới
- ✅ Sửa bộ lọc
- ✅ Xóa bộ lọc
- 📝 **Lưu ý**: Bộ lọc là tính năng nâng cao cho phép lọc bài đăng theo nhiều tiêu chí
  - Áp dụng cho danh mục cụ thể
  - Áp dụng cho loại bài đăng cụ thể
  - Hỗ trợ nhiều kiểu: dropdown, checkbox, range slider

### 4. **Nhật ký Hoạt động**

> NOTE: Đã gỡ bỏ tính năng Nhật ký Hoạt động (Audit Logs) khỏi ứng dụng.

## 🚀 Cách truy cập

1. **Đăng nhập với tài khoản Admin**:

   - Email: `admin@example.com`
   - Password: `admin123456`

2. **Truy cập trang admin**:

   - Vào URL: `http://localhost:3000/admin`
   - Hoặc click vào menu "Admin" trên navbar

3. **Sử dụng sidebar để điều hướng**:
   - 📊 Thống kê
   - 📝 Bài đăng
   - ⚠️ Báo cáo
   - 👥 Người dùng
   - 🏷️ **Danh mục** ← Click vào đây
   - 📄 **Loại bài đăng** ← Click vào đây
   - 🔍 **Bộ lọc** ← Click vào đây (nếu muốn tùy chỉnh nâng cao)
   - (Audit logs đã được gỡ và không hiển thị trong menu)

## 📝 Cách sử dụng

### Thêm Danh mục mới

1. Vào trang "Danh mục"
2. Click nút "+ Thêm Danh mục"
3. Điền thông tin:
   - **Tên**: Tên danh mục (VD: "Đồ gia dụng")
   - **Slug**: Mã định danh (VD: "do-gia-dung")
   - **Mô tả**: Mô tả ngắn gọn
   - **Icon**: Emoji hoặc icon (VD: "🏠")
   - **Màu**: Chọn màu đại diện
   - **Thứ tự**: Số thứ tự hiển thị
   - **Kích hoạt**: Bật/tắt danh mục
4. Click "Lưu"

### Thêm Loại bài đăng mới

1. Vào trang "Loại bài đăng"
2. Click nút "+ Thêm Loại Bài Đăng"
3. Điền thông tin:
   - **Tên**: Tên loại (VD: "Cho thuê")
   - **Mã**: Mã định danh (VD: "cho_thue")
   - **Mô tả**: Mô tả ngắn gọn
   - **Icon**: Emoji hoặc icon (VD: "🏘️")
   - **Màu**: Chọn màu đại diện
   - **Cấu hình**:
     - Yêu cầu giá: Có/Không
     - Yêu cầu mô tả đổi: Có/Không
     - Cho phép thương lượng: Có/Không
4. Click "Lưu"

<!-- Audit Logs removed -->

## 🔧 Chạy lại script seed (nếu cần)

Nếu bạn muốn reset dữ liệu và tạo lại từ đầu:

\`\`\`bash

# Từ thư mục Backend

cd Backend
node scripts/seed-categories-types-filters.js
\`\`\`

Script này sẽ:

- Xóa tất cả Categories, PostTypes, Filters cũ
- Tạo lại dữ liệu mẫu mới
- Gán cho admin user hiện tại

## 💡 Lưu ý quan trọng

### Về Bộ lọc

- **Bộ lọc không bắt buộc phải cấu hình** nếu bạn chỉ cần chức năng cơ bản
- Bộ lọc đã tạo sẵn:
  - **Tình trạng**: Lọc theo tình trạng sản phẩm (Mới, Như mới, Tốt...)
  - **Khoảng giá**: Lọc theo khoảng giá (dùng slider)
  - **Loại sách**: Chỉ hiện khi chọn danh mục "Sách"
  - **Loại thiết bị**: Chỉ hiện khi chọn danh mục "Điện tử"

### Về Audit Logs

- Tự động ghi lại mọi hành động quan trọng
- Không thể xóa hoặc sửa
- Chỉ có thể xem và lọc
- Hữu ích cho việc kiểm toán và debug

## 🎨 Tùy chỉnh

Bạn có thể dễ dàng:

- Thêm/sửa/xóa danh mục để phù hợp với nhu cầu
- Thêm/sửa/xóa loại bài đăng
- Bật/tắt các mục bất kỳ mà không cần xóa
- Sắp xếp thứ tự hiển thị

## 🐛 Khắc phục sự cố

### Không thấy dữ liệu trong trang admin?

1. Kiểm tra backend đang chạy: `http://localhost:5000/api/health`
2. Kiểm tra database đã có dữ liệu chưa:
   - Chạy script seed: `node scripts/seed-categories-types-filters.js`
3. Kiểm tra console trong browser (F12) để xem lỗi

<!-- Audit Logs removed -->

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy kiểm tra:

1. Console logs trong browser (F12)
2. Terminal logs của Backend server
3. MongoDB connection
