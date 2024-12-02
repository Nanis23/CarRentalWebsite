import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

//NZ IMPORTS
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { read } from 'node:fs';

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, NzImageModule, NzInputModule, NzButtonModule, NzSelectModule, NzTableModule
  ],
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.css'
})
export class UpdateCarComponent {

  carId: number;
  imageChange: boolean= false;

  existingImage: string| null= null;
  updateForm!: FormGroup;

  isSpinning: boolean= false;

  selectedFile!: File | null;
  imagePreview!: string | ArrayBuffer | null;


  listOfOption: Array<{ label: string; value: string}>=[];

  listOfBrands= ["MERCEDES-BENZ","AUDI", "BMW", "MUSTANG", "VOLVO", "FERRARI", "LEXUS", "KOENIGSEGG"];

  listOfType= ["Petrol", "Hybrid", "Diesel", "Electric", "Gasoline"];

  listOfColor= ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];

  listOfTransmition = ["Manual", "Automatic"];


  constructor(
    private adminService: AdminService,
    private activeRoute: ActivatedRoute,
    private message: NzMessageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.carId = this.activeRoute.snapshot.params['id'];
  }


  ngOnInit() {

    this.updateForm= this.fb.group({

      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      description: [null, [Validators.required, Validators.minLength(1)]],
      year: [null, Validators.required],
    })
    this.getCarById();
  }

  getCarById() {
    this.isSpinning= true;
    this.adminService.getCarById(this.carId).subscribe((res) => {
      //console.log(res);
      this.isSpinning=false;
      const carDto= res;
      this.existingImage= 'data:image/jpeg;base64,'+ res.returnedImage;
      console.log(carDto);
      console.log(this.existingImage);
      this.updateForm.patchValue(carDto);
    })
  }

  updateCar(){

    if (this.updateForm.invalid) {
      this.message.error('Please fill in all required fields correctly.', { nzDuration: 5000 });
      return;
    }

    console.log(this.updateForm.value);

    this.isSpinning = true;
    const formData: FormData = new FormData();

    if(this.imageChange&& this.selectedFile){

      formData.append('image', this.selectedFile!);

    }



    formData.append('name', this.updateForm.get('name')!.value);
    formData.append('brand', this.updateForm.get('brand')!.value);
    formData.append('color', this.updateForm.get('color')!.value);
    formData.append('price', this.updateForm.get('price')!.value);
    formData.append('year', this.updateForm.get('year')!.value);

    formData.append('type', this.updateForm.get('type')!.value);
    formData.append('description', this.updateForm.get('description')!.value);
    formData.append('transmission', this.updateForm.get('transmission')!.value);


    // Debug the FormData content --> that should be removed later
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    this.adminService.updateCar(this.carId, formData).subscribe(
      (res) => {
        this.isSpinning = false;
        this.message.success('Car updated successfully', { nzDuration: 5000 });
        this.router.navigateByUrl('/admin/dashboard');
        console.log(res);
      },
      error => {
        this.isSpinning = false;
        this.message.error('Error while updating car', { nzDuration: 5000 });
        console.error(error);
      }
    );
  }


  // onFileSelected(event: any){
  //   this.selectedFile= event.target.files[0];
  //   this.imageChange= true;
  //   this.existingImage=null;
  //   this.previewImage()
  // }

  // previewImage(){
  //   const reader= new FileReader();
  //   reader.onload= ()=>{
  //     this.imagePreview= reader.result;

  //   }
  //   reader.readAsDataURL(this.selectedFile!);
  // }


  onFileSelected(event: any) {
    const file = event.target.files[0];  // Get the selected file
    if (file) {
      this.selectedFile = file;          // Save the selected file
      this.imageChange = true;           // Set flag to indicate image change
      this.previewImage();               // Call previewImage method to show preview
    }
  }
  
  // Method to generate the image preview
  previewImage() {
    const reader = new FileReader();   // Create a FileReader to read the selected file
    reader.onload = () => {
      this.imagePreview = reader.result;  // Set the preview image when the file is read
    }
    reader.readAsDataURL(this.selectedFile!);  // Read the file as a Data URL
  }
  


}
