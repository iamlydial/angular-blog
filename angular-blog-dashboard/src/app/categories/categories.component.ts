import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
   this.categoryService.loadData().subscribe(val =>{console.log('categories from onInit',val)})
  }

  async onSubmit(formData: { value: any }) {
    let categoryData: Category = {
      category: formData.value.category,
      id: '',
    };

    this.categoryService.saveData(categoryData);
  }

}
