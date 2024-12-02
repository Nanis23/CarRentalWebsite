import { Component } from '@angular/core';
import { Car, CustomerService } from '../../services/customer.service';
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


@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, NzImageModule, NzInputModule, NzButtonModule, NzSelectModule, NzTableModule, RouterLink
  ],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {

  cars: Car[]=[];
  constructor(
    private customerService: CustomerService,
    private message: NzMessageService
  ) { }

  ngOnInit(){
    this.getAllCars();
  }

  getAllCars() {
    this.customerService.getAllCars().subscribe((res: Car[]) => {
      console.log(res);
      res.forEach((element) => {
        element.processedImage = 'data:image/jpeg; base64, ' + element.returnedImage;
        this.cars.push(element);
      });
    });
  }
}
