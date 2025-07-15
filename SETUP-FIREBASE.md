# Hướng Dẫn Setup Firebase cho Portfolio

## 1. Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Bật Firestore Database
4. Cấu hình rules cho Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Cho phép đọc public, viết chỉ khi authenticated (để bảo vệ admin)
    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 2. Lấy Firebase Config

1. Vào Project Settings > General
2. Scroll xuống "Your apps" và click "Web app"
3. Copy config object

## 3. Setup Environment Variables

1. Copy file `.env.example` thành `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Thay thế các giá trị trong `.env.local` bằng config từ Firebase:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. **🔐 BẢO MẬT QUAN TRỌNG:**
   - **KHÔNG BAO GIỜ** commit file `.env.local` lên git
   - File `.env.local` đã được thêm vào `.gitignore`
   - Khi deploy production, đặt environment variables trong dashboard của hosting platform
   - Chia sẻ keys với team qua tools bảo mật, không qua chat/email

## 4. Migrate Data (Optional)

Nếu muốn migrate data hiện tại lên Firebase:

```bash
# Cài dotenv để load environment variables
npm install dotenv

# Chạy script migrate
node -r dotenv/config scripts/migrate-data.js
```

## 5. Test Setup

1. Chạy dev server:
   ```bash
   npm run dev
   ```

2. Truy cập `/admin` để test admin interface
3. Thử tạo project mới
4. Kiểm tra Firestore Database xem data đã được lưu

## 6. Admin Access (Optional)

Để bảo vệ admin panel, bạn có thể:

1. Bật Authentication trong Firebase
2. Thêm provider (Google, Email/Password...)
3. Tạo component AuthGuard cho admin routes
4. Cập nhật Firestore rules để chỉ admin mới có thể ghi

## Các Route Admin

- `/admin` - Dashboard
- `/admin/projects` - Danh sách projects
- `/admin/projects/new` - Thêm project mới
- `/admin/projects/[id]/edit` - Chỉnh sửa project

## Troubleshooting

### Lỗi Firebase Config
- Kiểm tra lại `.env.local` có đúng tên biến không
- Restart dev server sau khi thay đổi environment variables

### Lỗi Permission Denied
- Kiểm tra Firestore rules
- Đảm bảo rules cho phép read public

### Lỗi Network
- Kiểm tra internet connection
- Kiểm tra Firebase project có enable Firestore không 