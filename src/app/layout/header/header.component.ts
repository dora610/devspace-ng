import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  brandName:string = 'Devgram';

  uid:string|undefined;
  email: string|null = '';

  constructor(private auth: AuthService, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getUser()(
      (user)=> {
        if(user){
          this.uid = user.uid
          this.email = user.email
        }else{
          this.router.navigateByUrl('/signin')
        }
      },
      (err)=>{
        console.error(err.message);
        this.toast.error(err.message)
      }
    )
  }

  signOutHandler(){
    this.auth.signOut().then(()=>{
      this.router.navigateByUrl('/signin')
    }).catch(err => {
      console.error(err);
      this.toast.error(`Oops!! ${err}`)
    })
  }
  
}
