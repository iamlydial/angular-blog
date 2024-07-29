import { Injectable } from '@angular/core';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  Storage,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private storage: Storage) {}
}
