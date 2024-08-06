import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../../../angular-blog-dashboard/src/app/models/post';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent implements OnInit {
  @Input() postData!: Post;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.postData, "LLL")
    console.log('ngOnInit - postData:', this.postData);
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
