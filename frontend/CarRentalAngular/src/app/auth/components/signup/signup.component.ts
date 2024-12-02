  import { Component } from '@angular/core';
  import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
  import { NzFormModule } from 'ng-zorro-antd/form';

  import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
  import { NzSpinModule } from 'ng-zorro-antd/spin';
  import { NzButtonModule } from 'ng-zorro-antd/button';
  import { NzInputModule } from 'ng-zorro-antd/input';
  import { NzLayoutModule } from 'ng-zorro-antd/layout';
  import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
  import { AuthService } from '../../services/auth/auth.service';

  @Component({
    selector: 'app-signup',
    standalone: true,
    imports: [NzFormModule,
      NzPageHeaderModule,
      NzSpinModule,
      NzButtonModule,
      NzInputModule,
      NzLayoutModule, ReactiveFormsModule], // Add ReactiveFormsModule here
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
  })
  export class SignupComponent {
    validateForm: FormGroup;

    constructor(private fb: NonNullableFormBuilder,
      private authService: AuthService
    ) {
      this.validateForm = this.fb.group({
        name: ['', [Validators.required]],  // Ensure 'name' is here
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required]],
        checkPassword: ['', [Validators.required, this.confirmationValidator]],
      });
    }

    submitForm(): void {
      if (this.validateForm.valid) {
        const formData = this.validateForm.value;  // Get form values
        console.log('Form Submitted', this.validateForm.value);
        this.authService.register(formData).subscribe({
          next: (res) => {
            console.log('Registration successful:', res);
          },
          error: (err) => {
            console.error('Registration failed:', err);
          }
        });
      } else {
        Object.values(this.validateForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }
    

    updateConfirmValidator(): void {
      Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
    }

    confirmationValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.value) {
        return { required: true };
      } else if (control.value !== this.validateForm.get('password')?.value) {
        return { confirm: true };
      }
      return null;
    };
  }
