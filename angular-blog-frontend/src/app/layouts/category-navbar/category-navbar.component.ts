import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../../../../angular-blog-dashboard/src/app/models/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-navbar.component.html',
  styleUrl: './category-navbar.component.css'
})
export class CategoryNavbarComponent implements OnInit {

  categoryArray: Category[] = [];

  constructor(private categoryService: CategoriesService){

  }
  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      console.log('frontend categories from onInit', val);
      this.categoryArray = val;
    });
  }
}
