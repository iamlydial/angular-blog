import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    AngularEditorModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = './assets/placeholder-image.png';
  selectedImage: any;
  categories: Array<Category> = [];
  postForm!: FormGroup;
  post: any;
  formStatus: string = 'Add New';
  docId: string;

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((val) => {
      this.docId = val['id'];
      console.log(val, 'val from the queryParams');
      this.postService.loadOneData(val['id']).subscribe((post) => {
        this.post = post;
        console.log(post, 'post from from the queryParams');
        this.postForm = this.fb.group({
          title: [post.title, [Validators.required, Validators.minLength(10)]],
          permalink: [
            { value: post.permalink, disabled: true },
            [Validators.required],
          ],
          excerpt: [
            post.excerpt,
            [Validators.required, Validators.minLength(50)],
          ],
          category: [
            `${this.post.category.categoryId}-${this.post.category.category}`,
            [Validators.required],
          ],
          postImage: ['', [Validators.required]],
          content: [post.content, [Validators.required]],
        });
        this.imgSrc = post.postImage;
        this.formStatus = 'Edit';
      });
    });
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categories = val;
    });
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChanges($event: any) {
    const title = $event.target.value;
    const permalink = title.trim().toLowerCase().replace(/\s+/g, '-');
    this.postForm.patchValue({ permalink });
  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };
    reader.readAsDataURL($event?.target.files[0]);
    this.selectedImage = $event?.target.files[0];
  }

  onSubmit() {
    console.log(this.postForm.value);

    let splitted = this.postForm.value.category.split('-');
    console.log(splitted);

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.get('permalink')?.value,
      excerpt: this.postForm.value.excerpt,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImage: '',
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };
    this.postService.uploadImage(
      this.selectedImage,
      postData,
      this.formStatus,
      this.docId
    );
    this.postForm.reset();
    this.imgSrc = './assets/placeholder-image.png';
  }
}
