import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  onSnapshot,
  query,
  doc,
  docData,
  where,
  limit,
  orderBy,
} from '@angular/fire/firestore';

import { Post } from '../../../../angular-blog-dashboard/src/app/models/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private afs: Firestore) {}

  loadFeaturedData(): Observable<Post[]> {
    const postsCollection = collection(this.afs, 'posts');
    const q = query(postsCollection, where('isFeatured', '==', true), limit(4));

    // Return an Observable
    return new Observable<Post[]>((observer) => {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const posts: Post[] = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Post)
        );
        observer.next(posts); // Emit the categories
        console.log(posts);
      });

      // Clean up subscription
      return () => unsubscribe();
    });
  }

  loadLatestData(): Observable<Post[]> {
    const postsCollection = collection(this.afs, 'posts');
    const q = query(postsCollection, orderBy('createdAt'), limit(8));

    // Return an Observable
    return new Observable<Post[]>((observer) => {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const posts: Post[] = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Post)
        );
        observer.next(posts); // Emit the categories
        console.log(posts);
      });

      // Clean up subscription
      return () => unsubscribe();
    });
  }

  loadOneData(id: string): Observable<Post> {
    const postDocRef = doc(this.afs, `posts/${id}`);
    return docData(postDocRef) as Observable<Post>;
  }
}
