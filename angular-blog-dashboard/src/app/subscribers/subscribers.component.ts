import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';
import { Sub } from '../../../../angular-blog-frontend/src/app/models/sub';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscribers.component.html',
  styleUrl: './subscribers.component.css',
})
export class SubscribersComponent implements OnInit {
  subscribersArray: Sub[] = [];

  constructor(
    private subService: SubscribersService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subService.loadData().subscribe((val) => {
      console.log(val, 'subscribers from dashboard');
      this.subscribersArray = val; // Assign the loaded data to subscribersArray
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }

  onDelete(id: string) {
    this.subService.deleteData(id);
  }
}
