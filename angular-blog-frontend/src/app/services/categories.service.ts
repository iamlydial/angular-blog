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
import { Observable } from 'rxjs';
import {Category} from '../../../../angular-blog-dashboard/src/app/models/category'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: Firestore) { }

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
