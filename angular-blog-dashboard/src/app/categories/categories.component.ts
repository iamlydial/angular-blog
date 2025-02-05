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
  formCategory!: string;
  formCategoryId!: string;
  formStatus: string = 'Add';

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
      id: this.formStatus === 'Edit' ? this.formCategoryId : '',
    };

    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);
    } else if (this.formStatus == 'Edit') {
      this.categoryService.updateData(this.formCategoryId, categoryData);
    } else if (this.formStatus == 'Delete') {
      this.categoryService.deleteData(this.formCategoryId);
    }
    formData.reset();
    this.formStatus = 'Add';
  }

  onEdit(category: string, id: string) {
    console.log('Item to be Edited', category, id);
    this.formCategory = category;
    this.formCategoryId = id;
    this.formStatus = 'Edit';
  }

  onDelete(category: string, id: string) {
    console.log('Item to be Deleted', category, id);
    this.formCategory = category;
    this.formCategoryId = id;
    this.formStatus = 'Delete';
  }
}
