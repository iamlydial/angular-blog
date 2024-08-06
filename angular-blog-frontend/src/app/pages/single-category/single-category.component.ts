import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-category',
  standalone: true,
  imports: [PostCardComponent],
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.css',
})
export class SingleCategoryComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((val) => {
      console.log(val);
    });
  }

  ngOnInit(): void {}
}
