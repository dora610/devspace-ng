import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  email!: string;
  password!: string;

  isLoading: boolean = false;
  title:string = 'Sign In'

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.isLoading = true;
    this.auth
      .signIn(this.email, this.password)
      .then((res) => {
        console.log(res);
        this.router.navigateByUrl('/');
      })
      .catch((err) => {
        console.error(err);
        this.toast.error(err);
      })
      .finally(() => (this.isLoading = false));
  }
}
