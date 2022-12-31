import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;
  message!: string;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  entrar(email: string, password: string){

    this.loginService.login(email, password)
    .pipe(catchError((error: HttpErrorResponse)=>{
      if(error.status==401)
      this.message='Email ou senha Invalidos'
      return throwError(()=> error);
    }))
    .subscribe(()=> this.router.navigate(['/products']))
   
  }

}
