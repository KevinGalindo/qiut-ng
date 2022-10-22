import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiAccessService } from 'src/app/services/api/api-access.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogModalService } from 'src/app/components/dialog-modal/dialog-modal.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class RegisterComponent implements OnInit {

  forma = new FormGroup({
    name     : new FormControl(``,{
      nonNullable: true,
      validators: [Validators.required]
    }),
    email    : new FormControl(``,{
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password : new FormControl('',{
      nonNullable: true, 
      validators: [Validators.required, Validators.pattern('^.{6,15}$')]})
  });

  loading: boolean = false;

  recorEmail = new FormControl(false, { nonNullable: true});

  constructor(private _authService: ApiAccessService,
              private _modal: DialogModalService,
              private _router: Router,) { }

  ngOnInit(): void {
  }

  get isEmailInvalid():boolean{
    return this.forma.controls.email.invalid && this.forma.controls.email.touched;
  }

  get isNameInvalid():boolean{
    return this.forma.controls.name.invalid && this.forma.controls.name.touched;
  }

  get isPasswordInvalid():boolean{
    return this.forma.controls.password.invalid && this.forma.controls.password.touched;
  }

  send(){

    if (this.forma.invalid) {
      this.forma.markAllAsTouched();
      return;
    }

    this.loading = true;
    this._authService.createAccount(this.forma.getRawValue()).subscribe({
      next: (resp) => {
        this.loading = false;
        localStorage.setItem('token', resp.token);
        if (this.recorEmail.value === true) {
          localStorage.setItem('email', this.forma.controls.email.value);
        }

        this._router.navigateByUrl('');

      },
      error: (err: HttpErrorResponse) => {

        this.loading = false;

        this._modal.error({ 
          content: err.error.message, 
          title: 'Error al crear cuenta' });
      }
    })

  }

}
