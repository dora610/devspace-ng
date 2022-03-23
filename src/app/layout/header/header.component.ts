import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/model/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title:string = 'Devgram';
  user!:User;

  constructor(private auth: AuthService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  signOutHandler(){
    this.auth.signOut().then((res)=>{
      console.log(res);
      // navigate to '/'
    }).catch(err => {
      console.error(err);
      this.toast.error(`Oops!! ${err}`)
    })
  }
  
}
