import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email!: string;
  password!: string;

  isLoading: boolean = false;
  title:string = 'Sign Up'

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.isLoading = true;
    this.auth
      .signUp(this.email, this.password)
      .then((res) => {
        console.log(res);
        this.toast.success('Successfully signed up. Please signin with your creds')
        this.router.navigateByUrl('/signin');
      })
      .catch((err) => {
        console.error(err);
        this.toast.error(err);
      })
      .finally(() => (this.isLoading = false));
  }
}
