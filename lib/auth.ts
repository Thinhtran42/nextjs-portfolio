import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from './firebase';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Admin email whitelist - chỉ những email này mới có quyền admin
const ADMIN_EMAILS = [
  'vanxuatx@gmail.com', // Email admin chính
  // Có thể thêm email khác nếu cần
];

export const authService = {
  // Đăng nhập bằng Google
  signInWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Kiểm tra user có trong whitelist không
      if (!ADMIN_EMAILS.includes(user.email || '')) {
        await signOut(auth);
        throw new Error('Bạn không có quyền truy cập admin panel');
      }
      
      return user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  },

  // Đăng xuất
  signOut: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  // Kiểm tra user có quyền admin không
  isAdmin: (user: User | null) => {
    return user && ADMIN_EMAILS.includes(user.email || '');
  },

  // Subscribe to auth state changes
  onAuthStateChanged: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
  }
}; 