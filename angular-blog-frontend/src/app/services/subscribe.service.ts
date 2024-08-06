import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  doc,
  docData,
  where,
  limit,
  orderBy,
  updateDoc,
  getDocs,
} from '@angular/fire/firestore';
import { Sub } from '../models/sub';
import { ref } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root',
})
export class SubscribeService {
  constructor(private afs: Firestore) {}

  async addSubs(subData: Sub) {
    const subscriberCollection = collection(this.afs, 'subscribers');
    const docRef = await addDoc(subscriberCollection, subData);
    console.log('Successful subscription!');
  }

  async checkSubs(subEmail: string): Promise<boolean> {
    const subscriberCollection = collection(this.afs, 'subscribers');
    const q = query(subscriberCollection, where('email', '==', subEmail));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log('Duplicate subscriber found:', subEmail);
      return true; // Duplicate found
    } else {
      console.log('No duplicate subscriber found:', subEmail);
      return false; // No duplicate
    }
  }
}
