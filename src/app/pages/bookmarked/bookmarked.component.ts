import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { RtdbService } from 'src/app/service/rtdb.service';
import { Dev } from 'src/model/Dev';
import {
  faBookmark,
  faLocationDot,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-bookmarked',
  templateUrl: './bookmarked.component.html',
  styleUrls: ['./bookmarked.component.css'],
})
export class BookmarkedComponent implements OnInit {
  profiles: Dev[] | undefined;
  isLoading: boolean = false;
  uid: string | undefined;

  aBookmark = faBookmark;
  faLocationDot = faLocationDot;
  faUser = faUser;
  faAddressCard = faAddressCard;

  constructor(
    private db: RtdbService,
    private auth: AuthService,
    private toast: ToastrService,
    private router: Router,
    private fireDb: AngularFireDatabase
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.auth.getUser()((user) => {
      if (user) {
        // let userId = user?.uid;
        /* this.db.getData(userId).subscribe({
            next: (res)=>{
              this.profiles = res
              this.isLoading = false
            },
            error: err =>{
              console.error(err);
            }
          }) */
        this.fireDb
          .list('saved-profile', (ref) =>
            ref.orderByChild('savedBy').equalTo(user?.uid)
          )
          .valueChanges()
          .subscribe((profiles:any) => {
            console.log(profiles);
            this.profiles = profiles
            this.isLoading = false;
          });
      } else {
        this.auth.signOut();
        this.router.navigateByUrl('/signin');
      }
    });
  }
}
