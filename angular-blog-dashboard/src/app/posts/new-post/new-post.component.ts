import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent implements OnInit {
  permalink: string = '';

  constructor() {}
  ngOnInit(): void {}

  onTitleChanges($event: any) {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }
}
