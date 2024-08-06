import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../../../../angular-blog-dashboard/src/app/models/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-category',
  standalone: true,
  imports: [PostCardComponent, CommonModule],
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.css',
})
export class SingleCategoryComponent implements OnInit {
  postsArray!: Array<Post>;
  categoryObj!: any;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) {
    this.route.params.subscribe((val) => {
      console.log(val);
      this.categoryObj = val;
      this.postService.loadCategoryPost(val['id']).subscribe((post) => {
        this.postsArray = post;
      });
    });
  }

  ngOnInit(): void {}

}
