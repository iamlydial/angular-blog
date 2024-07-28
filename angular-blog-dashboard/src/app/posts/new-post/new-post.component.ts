import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = './assets/placeholder-image.png';
  selectedImage: any;
  categories: Array<Category> = [];

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categories = val;
    });
  }

  onTitleChanges($event: any) {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };
    reader.readAsDataURL($event?.target.files[0]);
    this.selectedImage = $event?.target.files[0];
  }
}
