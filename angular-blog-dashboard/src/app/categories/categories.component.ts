import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  @ViewChild('formRef') formRef!: NgForm;
  categoryArray: Category[] = [];
  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      console.log('categories from onInit', val);
      this.categoryArray = val;
    });
  }

  async onSubmit(formData: NgForm) {
    let categoryData: Category = {
      category: formData.value.category,
      id: '',
    };

    this.categoryService.saveData(categoryData);
    formData.reset();
  }
}
