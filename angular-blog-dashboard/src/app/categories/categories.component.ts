import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private afs: Firestore) {}

  ngOnInit(): void {}

  async onSubmit(formData: { value: any }) {
    let categoryData = {
      category: formData.value.category,
    };

    try {
      const categoriesCollection = collection(this.afs, 'categories'); // Get reference to the collection
      const docRef = await addDoc(categoriesCollection, categoryData); // Add document to the collection
      const docId = docRef.id;
      console.log(`Document written with ID: ${docId}`);
    } catch (err) {
      console.log(err);
    }
  }
}
