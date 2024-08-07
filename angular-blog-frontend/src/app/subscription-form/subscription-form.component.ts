import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormsModule } from '@angular/forms';
import { Sub } from '../models/sub';
import { SubscribeService } from '../services/subscribe.service';

interface FormValues {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.css',
})
export class SubscriptionFormComponent implements OnInit {
  isEmailError: boolean = false;
  isSubscribed: boolean = false;

  constructor(private subService: SubscribeService) {}

  ngOnInit(): void {}
  
  onSubmit(formVal: FormValues) {
    console.log(formVal);
    const subData: Sub = {
      name: formVal.name,
      email: formVal.email,
      id: '',
    };
    this.subService
      .checkSubs(formVal.email)
      .then((isDuplicate) => {
        if (isDuplicate) {
          console.log('This email is already subscribed.');
          this.isEmailError = true;
        } else {
          console.log('This email is not subscribed yet.');
          this.subService.addSubs(subData);
          this.isSubscribed = true;
        }
      })
      .catch((error) => {
        console.error('Error checking subscriber:', error);
      });
  }
}
