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
  getDoc,
  docData,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { deleteObject } from '@firebase/storage';

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

  async uploadImage(
    selectedImage: any,
    postData: Post,
    formStatus: any,
    id: string
  ): Promise<string> {
    const filePath = `postImage/${Date.now()}`;
    console.log(filePath);

    const storageRef = ref(this.storage, filePath);
    await uploadBytes(storageRef, selectedImage);

    console.log('Post image uploaded successfully');
    postData.postImage = await getDownloadURL(storageRef);

    if (formStatus == 'Edit') {
      this.updateData(id, postData);
    } else {
      this.savePostData(postData);
    }

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

  loadOneData(id: string): Observable<Post> {
    const postDocRef = doc(this.afs, `posts/${id}`);
    return docData(postDocRef) as Observable<Post>;
  }

  async updateData(id: string, editData: any) {
    const docRef = doc(this.afs, `posts/${id}`);
    try {
      await updateDoc(docRef, editData);
      this.toastr.success('Post Edited Successfully');
      this.router.navigate(['/posts']);
    } catch (error) {
      console.error('Error editing post: ', error);
      this.toastr.error('Error editing post');
    }
  }

  async deletePostImage(postImage: string) {
    const imageRef = ref(this.storage, postImage);
    try {
        await deleteObject(imageRef);
        this.toastr.success('Post Image Deleted Successfully');
    } catch (error) {
        console.error('Error deleting post image: ', error);
        this.toastr.error('Error deleting post image');
    }
}

  async deleteData(id: string) {
    const docRef = doc(this.afs, `posts/${id}`);
    try {
      await deleteDoc(docRef);
      this.toastr.success('Post Deleted Successfully');
    } catch (error) {
      console.error('Error deleting post: ', error);
      this.toastr.error('Error deleting post');
    }
  }
}
