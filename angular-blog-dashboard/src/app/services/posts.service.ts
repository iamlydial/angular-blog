import { Injectable } from '@angular/core';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  Storage,
} from '@angular/fire/storage';

import { Post } from '../models/post';
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
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: Storage,
    private afs: Firestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  async uploadImage(selectedImage: any, postData: Post): Promise<string> {
    const filePath = `postImage/${Date.now()}`;
    console.log(filePath);

    const storageRef = ref(this.storage, filePath);
    await uploadBytes(storageRef, selectedImage);

    console.log('Post image uploaded successfully');
    postData.postImage = await getDownloadURL(storageRef);
    this.savePostData(postData);

    return postData.postImage;
  }

  async savePostData(postData: Post) {
    const postCollection = collection(this.afs, 'posts');
    const docRef = await addDoc(postCollection, postData);
    const docId = docRef.id;
    console.log(`Post saved with ID: ${docId}`);
    postData.id = docId;

    this.toastr.success('Post saved Successfully');
    this.router.navigate(['/posts']);
  }

  loadData(): Observable<Post[]> {
    const postsCollection = collection(this.afs, 'posts');
    const q = query(postsCollection);

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
}
