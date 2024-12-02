import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

//NG Zoro Imports
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-car',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,

    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    NzSelectModule,
    NzDatePickerModule
  ],
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.css'
})
export class PostCarComponent {

  postCarForm!: FormGroup;

  isSpinning: boolean= false;

  selectedFile!: File | null;
  imagePreview!: string | ArrayBuffer | null;


  listOfOption: Array<{ label: string; value: string}>=[];

  listOfBrands= ["MERCEDES-BENZ","AUDI", "BMW", "MUSTANG", "VOLVO", "FERRARI", "LEXUS", "KOENIGSEGG"];

  listOfType= ["Petrol", "Hybrid", "Diesel", "Electric", "Gasoline"];

  listOfColor= ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];

  listOfTransmition = ["Manual", "Automatic"];

  constructor(private fb: FormBuilder,
    private adminService: AdminService,
    private message: NzMessageService,
    private router: Router
  ){}

  ngOnInit() {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(1)]], 
      description: [null, [Validators.required, Validators.minLength(1)]], 
      year: [null, Validators.required],
    });
  }
  
  
  postCar() {
    // Check if the form is valid
    if (this.postCarForm.invalid) {
      this.message.error('Please fill in all required fields correctly.', { nzDuration: 5000 });
      return;
    }
  
    console.log(this.postCarForm.value);
  
    this.isSpinning = true;
    const formData: FormData = new FormData();
  


    
    formData.append('name', this.postCarForm.get('name')!.value);
    formData.append('brand', this.postCarForm.get('brand')!.value);
    formData.append('color', this.postCarForm.get('color')!.value);
    formData.append('price', this.postCarForm.get('price')!.value);
    formData.append('year', this.postCarForm.get('year')!.value);
  
    formData.append('type', this.postCarForm.get('type')!.value);
    formData.append('description', this.postCarForm.get('description')!.value);
    formData.append('transmission', this.postCarForm.get('transmission')!.value);
    formData.append('image', this.selectedFile!);
    
  
    // Debug the FormData content --> that should be removed later
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  
    this.adminService.postCar(formData).subscribe(
      (res) => {
        this.isSpinning = false;
        this.message.success('Car posted successfully', { nzDuration: 5000 });
        this.router.navigateByUrl('/admin/dashboard');
        console.log(res);
      },
      error => {
        this.isSpinning = false;
        this.message.error('Error while posting car', { nzDuration: 5000 });
        console.error(error);
      }
    );
  }
  
  onFileSelected(event:any ){

    this.selectedFile= event?.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader= new FileReader();
    reader.onload= ()=>{
      this.imagePreview= reader.result;
    }

    reader.readAsDataURL(this.selectedFile!);
  }

}
