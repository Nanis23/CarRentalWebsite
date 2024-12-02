import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzFormModule,
    NzPageHeaderModule,
    NzSpinModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    ReactiveFormsModule,
    NzMessageModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isSpinning: boolean = false;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isSpinning = true;
    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);

        if(res.userId != null){

          const user= {
            id: res.userId,
            role: res.userRole
          }

          StorageService.saveUser(user);
          StorageService.saveToken(res.jwt);
          if(StorageService.isAdminLogedIn()){
            this.router.navigateByUrl("/admin/dashboard");
          }else if(StorageService.isCustomerLogedIn()){
            this.router.navigateByUrl("/customer/dashboard")
          } else{
            this.message.error("Bad Credentials!", { nzDuration: 50000});
          }
        }
        this.isSpinning = false; // Stop the spinner after success
        
      },
      error: (err) => {
        console.error(err);
        this.isSpinning = false; // Stop the spinner after error
      },
    });
  }
}
