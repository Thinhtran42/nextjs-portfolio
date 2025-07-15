import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  orderBy, 
  query, 
  serverTimestamp,
  limit,
  where
} from 'firebase/firestore';
import { db } from './firebase';
import type {
  PersonalInfo,
  AboutInfo,
  SkillCategory,
  ContactInfo,
  SiteSettings,
  CreatePersonalInfoData,
  UpdatePersonalInfoData,
  CreateAboutInfoData,
  UpdateAboutInfoData,
  CreateSkillCategoryData,
  UpdateSkillCategoryData,
  CreateContactInfoData,
  UpdateContactInfoData,
  CreateSiteSettingsData,
  UpdateSiteSettingsData
} from '@/types/portfolio';

// Helper function to safely convert Firebase timestamps
const convertTimestamp = (timestamp: any) => {
  if (!timestamp) return undefined;
  if (typeof timestamp?.toDate === 'function') return timestamp.toDate();
  if (timestamp instanceof Date) return timestamp;
  if (typeof timestamp === 'string') return new Date(timestamp);
  return undefined;
};

// Collections
const PERSONAL_INFO_COLLECTION = 'personalInfo';
const ABOUT_INFO_COLLECTION = 'aboutInfo';
const SKILL_CATEGORIES_COLLECTION = 'skillCategories';
const CONTACT_INFO_COLLECTION = 'contactInfo';
const SITE_SETTINGS_COLLECTION = 'siteSettings';

// Personal Info Services
export const personalInfoService = {
  // Get personal info (should only be one)
  getPersonalInfo: async (): Promise<PersonalInfo | null> => {
    try {
      const q = query(collection(db, PERSONAL_INFO_COLLECTION), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) return null;
      
      const doc = querySnapshot.docs[0];
      const data = doc.data() as any;
      return {
        id: doc.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as PersonalInfo;
    } catch (error) {
      console.error('Error getting personal info:', error);
      throw error;
    }
  },

  // Create personal info
  createPersonalInfo: async (data: CreatePersonalInfoData): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, PERSONAL_INFO_COLLECTION), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating personal info:', error);
      throw error;
    }
  },

  // Update personal info
  updatePersonalInfo: async (id: string, data: UpdatePersonalInfoData): Promise<void> => {
    try {
      const docRef = doc(db, PERSONAL_INFO_COLLECTION, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating personal info:', error);
      throw error;
    }
  },
};

// About Info Services  
export const aboutInfoService = {
  // Get about info (should only be one)
  getAboutInfo: async (): Promise<AboutInfo | null> => {
    try {
      // Use safe Firebase operations to avoid extension conflicts
      const { safeGetDocs, getSafeCollection } = await import('./firebaseWrapper');
      
      const q = query(getSafeCollection(ABOUT_INFO_COLLECTION), limit(1));
      const querySnapshot = await safeGetDocs(q);
      
      if (querySnapshot.empty) return null;
      
      const doc = querySnapshot.docs[0];
      const data = doc.data() as any;
      
      return {
        id: doc.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as AboutInfo;
    } catch (error) {
      console.error('Error getting about info:', error);
      throw error;
    }
  },

  // Create about info
  createAboutInfo: async (data: CreateAboutInfoData): Promise<string> => {
    try {
      // Use safe Firebase operations to avoid extension conflicts
      const { safeAddDoc, getSafeCollection } = await import('./firebaseWrapper');
      
      const docRef = await safeAddDoc(getSafeCollection(ABOUT_INFO_COLLECTION), data);
      return docRef.id;
    } catch (error) {
      console.error('Error creating about info:', error);
      throw error;
    }
  },

  // Update about info
  updateAboutInfo: async (id: string, data: UpdateAboutInfoData): Promise<void> => {
    try {
      // Use safe Firebase operations to avoid extension conflicts
      const { safeUpdateDoc, getSafeDoc } = await import('./firebaseWrapper');
      
      const docRef = getSafeDoc(ABOUT_INFO_COLLECTION, id);
      await safeUpdateDoc(docRef, data);
    } catch (error) {
      console.error('Error updating about info:', error);
      throw error;
    }
  },
};

// Skill Categories Services
export const skillCategoriesService = {
  // Get all skill categories
  getSkillCategories: async (): Promise<SkillCategory[]> => {
    try {
      const q = query(collection(db, SKILL_CATEGORIES_COLLECTION), orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data() as any;
        return {
          id: doc.id,
          ...data,
          createdAt: convertTimestamp(data.createdAt),
          updatedAt: convertTimestamp(data.updatedAt),
        } as SkillCategory;
      });
    } catch (error) {
      console.error('Error getting skill categories:', error);
      throw error;
    }
  },

  // Get skill category by ID
  getSkillCategoryById: async (id: string): Promise<SkillCategory | null> => {
    try {
      const docRef = doc(db, SKILL_CATEGORIES_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) return null;
      
      const data = docSnap.data() as any;
      return {
        id: docSnap.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as SkillCategory;
    } catch (error) {
      console.error('Error getting skill category:', error);
      throw error;
    }
  },

  // Create skill category
  createSkillCategory: async (data: CreateSkillCategoryData): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, SKILL_CATEGORIES_COLLECTION), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating skill category:', error);
      throw error;
    }
  },

  // Update skill category
  updateSkillCategory: async (id: string, data: UpdateSkillCategoryData): Promise<void> => {
    try {
      const docRef = doc(db, SKILL_CATEGORIES_COLLECTION, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating skill category:', error);
      throw error;
    }
  },

  // Delete skill category
  deleteSkillCategory: async (id: string): Promise<void> => {
    try {
      const docRef = doc(db, SKILL_CATEGORIES_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting skill category:', error);
      throw error;
    }
  },
};

// Contact Info Services
export const contactInfoService = {
  // Get contact info (should only be one)
  getContactInfo: async (): Promise<ContactInfo | null> => {
    try {
      const q = query(collection(db, CONTACT_INFO_COLLECTION), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) return null;
      
      const doc = querySnapshot.docs[0];
      const data = doc.data() as any;
      return {
        id: doc.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as ContactInfo;
    } catch (error) {
      console.error('Error getting contact info:', error);
      throw error;
    }
  },

  // Create contact info
  createContactInfo: async (data: CreateContactInfoData): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, CONTACT_INFO_COLLECTION), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating contact info:', error);
      throw error;
    }
  },

  // Update contact info
  updateContactInfo: async (id: string, data: UpdateContactInfoData): Promise<void> => {
    try {
      const docRef = doc(db, CONTACT_INFO_COLLECTION, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating contact info:', error);
      throw error;
    }
  },
};

// Site Settings Services
export const siteSettingsService = {
  // Get site settings (should only be one)
  getSiteSettings: async (): Promise<SiteSettings | null> => {
    try {
      const q = query(collection(db, SITE_SETTINGS_COLLECTION), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) return null;
      
      const doc = querySnapshot.docs[0];
      const data = doc.data() as any;
      return {
        id: doc.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as SiteSettings;
    } catch (error) {
      console.error('Error getting site settings:', error);
      throw error;
    }
  },

  // Create site settings
  createSiteSettings: async (data: CreateSiteSettingsData): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, SITE_SETTINGS_COLLECTION), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating site settings:', error);
      throw error;
    }
  },

  // Update site settings
  updateSiteSettings: async (id: string, data: UpdateSiteSettingsData): Promise<void> => {
    try {
      const docRef = doc(db, SITE_SETTINGS_COLLECTION, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating site settings:', error);
      throw error;
    }
  },
}; 