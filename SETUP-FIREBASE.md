# Firebase Setup Guide

## 1. Firestore Rules - CẬP NHẬT NGAY!

**QUAN TRỌNG:** Copy toàn bộ rules dưới đây vào Firebase Console → Firestore Database → Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Projects collection
    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Experiences collection  
    match /experiences/{experienceId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Portfolio Info Collections - MIGRATION CẦN CÁC RULES NÀY
    match /personalInfo/{infoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /aboutInfo/{infoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /skillCategories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /contactInfo/{infoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /siteSettings/{settingsId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

**LƯU Ý:** Nếu thiếu rules cho collections nào thì migration sẽ bị lỗi "Missing or insufficient permissions".

## 2. Authentication Setup

1. **Enable Google Sign-in:**
   - Go to Firebase Console → Authentication → Sign-in method
   - Enable Google provider
   - Set up OAuth consent screen

2. **Add Authorized Domains:**
   - localhost (for development)
   - Your production domain

3. **Configure Admin Email:**
   - The app is configured to only allow `vanxuatx@gmail.com`
   - To change this, edit `lib/auth.ts`

## 3. Firestore Collections

The app uses these collections:

### Core Collections:
- `projects` - Portfolio projects
- `experiences` - Work experiences

### Portfolio Info Collections:
- `personalInfo` - Hero section data (name, title, social links)
- `aboutInfo` - About section content
- `skillCategories` - Technical skills organized by categories
- `contactInfo` - Contact information and social media
- `siteSettings` - Website configuration and SEO

## 4. Data Migration

After setting up Firebase:

1. **Access Migration Tool:**
   ```
   http://localhost:3000/admin/migrate-portfolio
   ```

2. **Run Migration:**
   - Click "Bắt đầu Migration" to import existing data
   - This will populate all portfolio collections with current hardcoded data

3. **Verify Data:**
   - Check Firebase Console → Firestore Database
   - Verify all collections are created with data

## 5. Environment Variables

Create `.env.local` with your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 6. Admin Panel Features

- **Projects Management:** CRUD operations for portfolio projects
- **Experiences Management:** CRUD operations for work experiences  
- **Portfolio Info Management:** 
  - Personal Information (Hero section)
  - About Information
  - Skills Categories
  - Contact Information
  - Site Settings
- **Data Migration:** Import existing hardcoded data
- **Authentication:** Google sign-in with admin whitelist

## 7. Production Deployment

Before deploying to production:

1. Update Firebase rules to be more restrictive if needed
2. Set up proper environment variables
3. Configure authorized domains for your production URL
4. Test authentication flow
5. Verify all data migration completed successfully

## Troubleshooting

- **Permission Errors:** Check Firestore rules and user authentication
- **Auth Issues:** Verify authorized domains and Google provider setup
- **Migration Errors:** Check console logs and Firebase connection 