import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

//NG ZORRO IMPORTS
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, NzImageModule, NzInputModule, NzButtonModule, NzSelectModule, NzTableModule, NzSpinModule
  ],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {

  bookings: any;
  isSpinning: boolean= false;
  constructor(
    private bookingService: CustomerService
  ){
    this.getMyBookings();
  }


  getMyBookings(){
    this.isSpinning= true;
    this.bookingService.getBookingsByUserId().subscribe((res)=>{
      this.isSpinning= false;
      console.log(res);

      this.bookings= res;
      
    })
  }
}
