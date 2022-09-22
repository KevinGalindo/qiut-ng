import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { ApiAccessService } from 'src/app/services/api/api-access.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class LoginComponent implements OnInit {

  forma = new FormGroup({
    email    : new FormControl(``,{
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password : new FormControl('',{
      nonNullable: true, 
      validators: [Validators.required, Validators.pattern('^.{6,15}$')]})
  });

  recorEmail = new FormControl(false, { nonNullable: true});

  constructor(private _apiServices: ApiAccessService) {

    const email = localStorage.getItem('email');

    if (email) {
      this.forma.controls.email.setValue(email);
      this.recorEmail.setValue(true);
    }

  }

  ngOnInit(): void {
  }

  get isEmailInvalid():boolean{
    return this.forma.controls.email.invalid && this.forma.controls.email.touched;
  }

  get isPasswordvalid():boolean{
    return this.forma.controls.password.invalid && this.forma.controls.password.touched;
  }

  send(){

    if (this.forma.invalid) {
      this.forma.markAllAsTouched();
      return;
    }

    console.log(this.forma.getRawValue());
    this._apiServices.login(this.forma.getRawValue()).subscribe({
      next: (reps) => {
        console.log(reps);
        localStorage.setItem('token', reps.token);
        if (this.recorEmail.value === true) {
          localStorage.setItem('email', this.forma.controls.email.value);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error.message);
      } 
    });

  }

}

