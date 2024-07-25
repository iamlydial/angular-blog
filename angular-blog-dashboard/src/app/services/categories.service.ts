import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Category } from '../models/category';

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
}
