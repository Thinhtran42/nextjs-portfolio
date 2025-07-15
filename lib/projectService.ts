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
import { Project, CreateProjectData, UpdateProjectData } from '@/types/project';

const COLLECTION_NAME = 'projects';

export class ProjectService {
  // Lấy tất cả projects
  static async getAllProjects(): Promise<Project[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Project[];
    } catch (error) {
      console.error('Error getting projects:', error);
      throw error;
    }
  }

  // Lấy project theo ID
  static async getProjectById(id: string): Promise<Project | null> {
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
        } as Project;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting project:', error);
      throw error;
    }
  }

  // Tạo project mới
  static async createProject(projectData: CreateProjectData): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...projectData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  // Cập nhật project
  static async updateProject(data: UpdateProjectData): Promise<void> {
    try {
      const { id, ...updateData } = data;
      const docRef = doc(db, COLLECTION_NAME, id);
      
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }

  // Xóa project
  static async deleteProject(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }

  // Lấy featured projects
  static async getFeaturedProjects(): Promise<Project[]> {
    try {
      const allProjects = await this.getAllProjects();
      return allProjects.filter(project => project.featured);
    } catch (error) {
      console.error('Error getting featured projects:', error);
      throw error;
    }
  }
} 