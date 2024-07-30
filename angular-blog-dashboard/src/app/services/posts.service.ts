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

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: Storage,
    private afs: Firestore,
    private toastr: ToastrService
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

  async savePostData(postData: Post){
    const postCollection = collection(this.afs, 'posts');
    const docRef = await addDoc(postCollection, postData);
    const docId = docRef.id;
    console.log(`Post saved with ID: ${docId}`);
    this.toastr.success('Post saved Successfully');
  }
}
