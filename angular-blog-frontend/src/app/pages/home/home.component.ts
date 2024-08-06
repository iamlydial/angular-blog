import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { Post } from '../../../../../angular-blog-dashboard/src/app/models/post';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  featuredPostsArray: Post[] = [];
  latestPostsArray: Post[] = [];

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.postService.loadFeaturedData().subscribe((val) => {
      this.featuredPostsArray = val;
      console.log(val, 'only featured posts from the frontend');
    });

    this.postService.loadLatestData().subscribe((val) => {
      this.latestPostsArray = val;
      console.log(val, 'only latest posts from the frontend');
    });
  }
}
