import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';
import { Timestamp } from '@firebase/firestore';

@Component({
  selector: 'app-all-post',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css',
})
export class AllPostComponent implements OnInit {
  posts: Array<Post> = [];

  constructor(private postService: PostsService) {}
  ngOnInit(): void {
    this.postService.loadData().subscribe((postVal) => {
      this.posts = postVal;
    });
  }

  formatDate(timestamp: Timestamp | Date): string {
    const date =
      timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  onDeletePost(id: any, postImg: string) {
    console.log('post to delete ', id);
    this.postService.deletePostImage(postImg);
    this.postService.deleteData(id);
  }
}
