import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DarajaService } from '../daraja.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './home.component.css'
})
export class HomeComponent {
  phoneNumber: string = '';
  amount: number = 0;
  message: string = '';

  constructor(private darajaService: DarajaService) {}

  onSubmit() {
    this.darajaService.initiateStkPush(this.phoneNumber, this.amount).subscribe(
      response => {
        this.message = 'STK Push initiated successfully!';
        console.log(response);
      },
      error => {
        this.message = 'Error initiating STK Push!';
        console.error(error);
      }
    );
  }

  initiateStkPush(phoneNumber: string, amount: number) {
    // Mocking a service call
    console.log(`Initiating STK Push for ${phoneNumber} with amount ${amount}`);
    // Assume the service returns a success message
    this.message = 'STK Push initiated successfully!';
  }
}

