import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Sub } from '../../../../angular-blog-frontend/src/app/models/sub';
export interface SubWithId extends Sub {
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  constructor(private afs: Firestore) {}

  loadData(): Observable<SubWithId[]> {
    const subscribersCollection = collection(this.afs, 'subscribers');
    const q = query(subscribersCollection);

    return new Observable<SubWithId[]>((observer) => {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const subs: SubWithId[] = snapshot.docs.map((doc) => {
          const data = doc.data() as DocumentData;
          return {
            id: doc.id,
            name: data['name'],
            email: data['email'],
          } as SubWithId;
        });
        observer.next(subs); // Emit the subscribers
        console.log(subs);
      });

      // Clean up subscription
      return () => unsubscribe();
    });
  }

  async deleteData(id: string) {
    const docRef = doc(this.afs, `subscribers/${id}`);
    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  }
}
