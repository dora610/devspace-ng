import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output()
  newUserNameEvent = new EventEmitter<string>()

  constructor(private auth: AuthService, private router:Router, private toast: ToastrService){}

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    this.auth.getUser()(
      (user)=>{
        if(user){
          this.newUserNameEvent.emit(f.value.userName)
        }
        else{
          this.router.navigateByUrl('/signin')
        }
      },
      (err)=>{
        console.error(err.message);
        this.toast.error(err.message)
      }
    )
  }

  onReset(f: NgForm){
    f.form.reset()
    this.newUserNameEvent.emit(f.value.userName)
  }

}
