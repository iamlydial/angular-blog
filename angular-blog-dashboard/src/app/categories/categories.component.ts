import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSubmit(formData: { value: any }) {
    console.log(formData.value);

    let categoryData = {
      category: formData.value.category,
    };

    console.log(categoryData);
  }
}
