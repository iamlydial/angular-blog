import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private afs: Firestore) {}

  async saveData(data: Category) {
    try {
      const categoriesCollection = collection(this.afs, 'categories'); // Get reference to the collection
      const docRef = await addDoc(categoriesCollection, data); // Add document to the collection
      const docId = docRef.id;
      console.log(`Document written with ID: ${docId}`);
    } catch (err) {
      console.log(err);
    }
  }

  loadData(): Observable<Category[]> {
    const categoriesCollection = collection(this.afs, 'categories');
    const q = query(categoriesCollection);

    // Return an Observable
    return new Observable<Category[]>((observer) => {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const categories: Category[] = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Category)
        );
        observer.next(categories); // Emit the categories
        console.log(categories);
      });

      // Clean up subscription
      return () => unsubscribe();
    });
  }

  async updateData(id: string, editData: any) {
    const docRef = doc(this.afs, `categories/${id}`);
    console.log('Category ID from edit function: ', docRef);
    try {
      await updateDoc(docRef, editData);
    } catch (error) {
      console.error('Error editing document: ', error);
    }
  }

  async deleteData(id: string) {
    const docRef = doc(this.afs, `categories/${id}`);
    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  }
}
