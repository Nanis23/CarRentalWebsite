import { Component } from '@angular/core';
import { AdminService, Car } from '../../services/admin.service';
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

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, NzImageModule, NzInputModule, NzButtonModule, NzSelectModule, NzTableModule, RouterLink

  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})


export class AdminDashboardComponent {

  
  cars: Car[] = [];
  constructor(
    private adminService: AdminService,
    private message: NzMessageService
  ) {}
  
  ngOnInit() {
    this.getAllCars();
  }
  
  // getAllCars() {
  //   this.adminService.getAllCars().subscribe((res: Car[]) => {
  //     console.log(res);
  
  //     res.forEach((element) => {
  //       element.processedImage = 'data: image/jpeg; base64,' + element.returnedImage;
  //       this.cars.push(element);
  //     });
  //   });
  // }

  getAllCars(): void {
    this.adminService.getAllCars().subscribe({
      next: (res: Car[]) => {
        console.log(res); // Log the fetched cars for debugging
        
        this.cars = []; // Clear the existing list of cars to avoid duplicates
  
        // Process each car to add the base64 image data and push to the list
        res.forEach((element) => {
          element.processedImage = 'data:image/jpeg;base64,' + element.returnedImage;
          this.cars.push(element);
        });
      },
      error: (err) => {
        console.error(`Error fetching cars:`, err);
        this.message.error("Error fetching cars.", { nzDuration: 3000 });
      }
    });
  }
  
  
  deleteCar(id: number): void {
    console.log(id); // Log the car ID to be deleted
    this.adminService.deleteCar(id).subscribe({
      next: () => {
        // Call to refresh the list of cars after successful deletion
        this.getAllCars();
        
        // Display success message
        this.message.success("Car Deleted Successfully!", { nzDuration: 3000 });
      },
      error: (err) => {
        console.error(`Error deleting car:`, err);
        // You can add an error message here if desired, for example:
        this.message.error("Error deleting car, please try again.", { nzDuration: 3000 });
      }
    });
  }
  

}
