// Firebase wrapper to avoid browser extension conflicts
import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  serverTimestamp 
} from 'firebase/firestore';

// Wrapper functions that use setTimeout to avoid extension interference
export const safeFirebaseOperation = async <T>(operation: () => Promise<T>): Promise<T> => {
  // Use setTimeout to break out of extension context
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result = await operation();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }, 0);
  });
};

// Safe wrapper for updateDoc
export const safeUpdateDoc = async (docRef: any, data: any) => {
  return safeFirebaseOperation(async () => {
    // Create a clean copy of data to avoid extension pollution
    // Don't JSON.stringify serverTimestamp as it will break
    const cleanData = {
      ...JSON.parse(JSON.stringify(data)),
      updatedAt: serverTimestamp(),
    };
    
    return await updateDoc(docRef, cleanData);
  });
};

// Safe wrapper for addDoc
export const safeAddDoc = async (collectionRef: any, data: any) => {
  return safeFirebaseOperation(async () => {
    // Create a clean copy of data to avoid extension pollution
    // Don't JSON.stringify serverTimestamp as it will break
    const cleanData = {
      ...JSON.parse(JSON.stringify(data)),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    return await addDoc(collectionRef, cleanData);
  });
};

// Safe wrapper for getDocs
export const safeGetDocs = async (queryRef: any) => {
  return safeFirebaseOperation(async () => {
    return await getDocs(queryRef);
  });
};

// Safe wrapper for getDoc
export const safeGetDoc = async (docRef: any) => {
  return safeFirebaseOperation(async () => {
    return await getDoc(docRef);
  });
};

// Helper to get collection reference safely
export const getSafeCollection = (collectionName: string) => {
  return collection(db, collectionName);
};

// Helper to get doc reference safely
export const getSafeDoc = (collectionName: string, docId: string) => {
  return doc(db, collectionName, docId);
}; 