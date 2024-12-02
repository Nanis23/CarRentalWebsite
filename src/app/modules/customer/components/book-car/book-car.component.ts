import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';

//NG ZORRO IMPORTS
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { error } from 'console';

@Component({
  selector: 'app-book-car',
  standalone: true,
  imports: [

    ReactiveFormsModule, CommonModule, NzImageModule, NzInputModule, NzButtonModule, NzSelectModule, NzTableModule, NzDatePickerModule, NzSpinModule, NzGridModule,
    NzFormModule
  ],
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.css'
})
export class BookCarComponent {

  carId: number;
  car: any;
  processedImage: any;
  isSpinning = false;
  dateFormat: string = 'yyyy-MM-dd'; // Correct type and value


  validateForm!: FormGroup;

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private message: NzMessageService,
    private fb: FormBuilder,
    private router: Router,

  ) {
    this.carId = this.activatedRoute.snapshot.params["id"]
  }

  ngOnInit() {

    this.validateForm = this.fb.group({
      toDate: [null, Validators.required],
      fromDate: [null, Validators.required],

    })

    this.getCarById();
  }


  // Helper method to format dates
  // private formatDate(date: Date): string {
  //   const d = new Date(date);
  //   const day = String(d.getDate()).padStart(2, '0');
  //   const month = String(d.getMonth() + 1).padStart(2, '0');
  //   const year = d.getFullYear();
  //   return `${year}-${month}-${day}`; // Matches 'yyyy-MM-dd'
  // }

  getCarById() {

    this.customerService.getCarById(this.carId).subscribe((res) => {
      console.log(res);

      this.processedImage = 'data:image/jpeg; base64,' + res.returnedImage;
      this.car = res;
    })
  }

  // bookACar(data: any) {

  //   // Format the date in 'yyyy-MM-dd' format before sending
  // const formattedFromDate = dayjs(data.fromDate).format('YYYY-MM-DD');
  // const formattedToDate = dayjs(data.toDate).format('YYYY-MM-DD');

  //   console.log(data);
  //   this.isSpinning = true;
  //   let bookACarDto = {
  //     toDate: formattedToDate,
  //     fromDate: formattedFromDate,
  //     userId: StorageService.getUserId(),
  //     carId: this.carId
  //   }

  //   this.customerService.bookACar(bookACarDto).subscribe((res) => {
  //     console.log(res);
  //     this.message.success("Booking request submitted successfully!", { nzDuration: 3000 });
  //     this.router.navigateByUrl("/customer/dashboard")

  //   }, error => {
  //     this.message.error("Something went wrong!", { nzDuration: 3000 });
  //   })
  // }


  bookACar(data: any) {
    // Ensure the date is in 'yyyy-MM-dd' format before sending it to the backend.
    const formattedFromDate = dayjs(data.fromDate).format('YYYY-MM-DD'); 
    const formattedToDate = dayjs(data.toDate).format('YYYY-MM-DD');
  
    console.log("Formatted From Date:", formattedFromDate);
    console.log("Formatted To Date:", formattedToDate);
  
    this.isSpinning = true;
    const bookACarDto = {
      toDate: formattedToDate,
      fromDate: formattedFromDate,
      userId: StorageService.getUserId(),
      carId: this.carId
    };
  
    // Call the backend service.
    this.customerService.bookACar(bookACarDto).subscribe(
      (res) => {
        console.log(res);
        this.message.success("Booking request submitted successfully!", { nzDuration: 3000 });
        this.router.navigateByUrl("/customer/dashboard");
      },
      (error) => {
        console.error("Error booking car:", error);
        this.message.error("Something went wrong!", { nzDuration: 3000 });
      }
    );
  }
    
}
