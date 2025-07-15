import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  getDoc,
  orderBy,
  query,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Experience, CreateExperienceData, UpdateExperienceData } from '@/types/experience';

const COLLECTION_NAME = 'experiences';

export class ExperienceService {
  // Lấy tất cả experiences
  static async getAllExperiences(): Promise<Experience[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Experience[];
    } catch (error) {
      console.error('Error getting experiences:', error);
      throw error;
    }
  }

  // Lấy experience theo ID
  static async getExperienceById(id: string): Promise<Experience | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        } as Experience;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting experience:', error);
      throw error;
    }
  }

  // Tạo experience mới
  static async createExperience(experienceData: CreateExperienceData): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...experienceData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating experience:', error);
      throw error;
    }
  }

  // Cập nhật experience
  static async updateExperience(data: UpdateExperienceData): Promise<void> {
    try {
      const { id, ...updateData } = data;
      const docRef = doc(db, COLLECTION_NAME, id);
      
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating experience:', error);
      throw error;
    }
  }

  // Xóa experience
  static async deleteExperience(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting experience:', error);
      throw error;
    }
  }

  // Lấy featured experiences
  static async getFeaturedExperiences(): Promise<Experience[]> {
    try {
      const allExperiences = await this.getAllExperiences();
      return allExperiences.filter(experience => experience.featured);
    } catch (error) {
      console.error('Error getting featured experiences:', error);
      throw error;
    }
  }
} 