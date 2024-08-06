import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { CommentFormComponent } from '../../comments/comment-form/comment-form.component';
import { CommentListComponent } from '../../comments/comment-list/comment-list.component';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../../../../angular-blog-dashboard/src/app/models/post';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [PostCardComponent, CommentFormComponent, CommentListComponent],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent implements OnInit {
  postData!: Post;

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.postService.loadOnePost(val['id']).subscribe((post) => {
        this.postData = post
      });
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
}
