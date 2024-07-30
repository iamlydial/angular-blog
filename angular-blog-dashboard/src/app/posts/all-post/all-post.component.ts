import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-all-post',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css',
})
export class AllPostComponent implements OnInit {
  posts: Array<Post> = [];

  constructor(private postService: PostsService){

  }
  ngOnInit(): void {
    this.postService.loadData().subscribe((postVal) => {
      this.posts = postVal;
    });
  }
}
