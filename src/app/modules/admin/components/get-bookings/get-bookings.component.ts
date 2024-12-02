import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router , RouterLink} from '@angular/router';

//NG ZORRO IMPORTS
import { NzTableModule } from 'ng-zorro-antd/table'; 
import { NzSelectModule } from 'ng-zorro-antd/select'; 
import { NzButtonModule } from 'ng-zorro-antd/button'; 
import { NzInputModule } from 'ng-zorro-antd/input'; 
import { NzImageModule } from 'ng-zorro-antd/image'; 
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { error } from 'console';


@Component({
  selector: 'app-get-bookings',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, NzImageModule, NzInputModule, NzButtonModule, NzSelectModule, NzTableModule, NzSpinModule
  ],
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.css'
})
export class GetBookingsComponent {

  bookings: any;
  isSpinning: boolean= false;
  constructor(
    private adminService: AdminService,
    private message: NzMessageService
  ){
    this.getBookings();
  }



  getBookings(){
    this.isSpinning= true;
    this.adminService.getAllCarBookings().subscribe((res)=>{
      this.isSpinning= false;
      console.log(res);
      this.bookings= res;
    })
  }

  changeBookingStatus(bookingId: number, status: string){
    this.isSpinning=true;
    console.log(bookingId, status);
    this.adminService.changeBookingStatus(bookingId, status).subscribe((res)=>{
      this.isSpinning= false;
      console.log();
      this.getBookings();
      this.message.success("Booking status changed successfully! ", {nzDuration: 3000});
      
    }, error=>{
      this.message.error("Something went wrong!", { nzDuration: 3000});
    })

  }
}
