import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  DocumentData,
} from '@angular/fire/firestore';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  constructor(private afs: Firestore, private toastr: ToastrService) {}

  async saveData(data: Category) {
    try {
      const categoriesCollection = collection(this.afs, 'categories'); // Get reference to the collection
      const docRef = await addDoc(categoriesCollection, data); // Add document to the collection
      const docId = docRef.id;
      console.log(`Document written with ID: ${docId}`);
      this.toastr.success('Data Insert Successful');
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
}
