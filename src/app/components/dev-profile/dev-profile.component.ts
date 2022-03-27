import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GithubService } from 'src/app/service/github.service';
import { Dev } from 'src/model/Dev';
import {
  faBookmark,
  faLocationDot,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { RtdbService } from 'src/app/service/rtdb.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dev-profile',
  templateUrl: './dev-profile.component.html',
  styleUrls: ['./dev-profile.component.css'],
})
export class DevProfileComponent implements OnInit, OnChanges {
  @Input() userName: any;
  @Output()
  newRepoUrl = new EventEmitter<string>();

  dev: Dev | any;
  isLoading: boolean = false;
  userId: string = '';
  isBookMarked: boolean = false;
  savedProfId: string | undefined;

  faBookmark = faBookmark;
  faLocationDot = faLocationDot;
  faUser = faUser;
  faAddressCard = faAddressCard;

  constructor(
    private ghService: GithubService,
    private toast: ToastrService,
    private db: RtdbService,
    private auth: AuthService,
    private router: Router,
    private fireDb: AngularFireDatabase
  ) {}

  ngOnInit(): void {
    this.auth.getUser()((user) => {
      if (user) {
        this.userId = user?.uid;
      } else {
        this.auth.signOut();
        this.router.navigateByUrl('/signin');
      }
    });
  }

  fetchDevDetails() {
    this.isLoading = true;
    this.ghService.getUserDetails(this.userName).subscribe({
      next: (dev: any) => {
        this.dev = dev;
        this.newRepoUrl.emit(dev?.repos_url);
        /* this.fireDb
          .list('saved-profile', (ref) =>
            ref.orderByChild('savedBy').equalTo(this.userId)
          )
          .valueChanges()
          .subscribe((prof) => {
            console.log(prof);
            
            let currProf = prof.filter((p)=> {
              let profile:Dev = p as Dev
              let login:string = profile.login
              return login.toLocaleLowerCase() === this.userName.toLocaleLowerCase()
              
            })
            console.log(currProf);
            
            this.isBookMarked = currProf.length ? true : false
          }); */
        let profiles = this.fireDb
          .list('saved-profile', (ref) =>
            ref.orderByChild('savedBy').equalTo(this.userId)
          )
          .snapshotChanges()
          .pipe(
            map((changes) =>
              changes.map((c) => ({
                key: c.payload.key,
                ...(c.payload.val() as object),
              }))
            )
          );
        profiles.subscribe((prof) => {
          let currProf = prof.filter((p) => {
            let profile: any = p;
            let login: string = profile.login;
            return login.toLowerCase() === this.userName.toLowerCase();
          });
          // console.log(currProf);

          this.isBookMarked = currProf.length ? true : false;
          this.savedProfId = currProf.length && currProf[0].key ? currProf[0].key : '';
        });
      },
      error: (err) => {
        console.error(err);
        this.toast.error('Not found');
      },
      complete: () => (this.isLoading = false),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (
        prop === 'userName' &&
        changes[prop].currentValue &&
        !changes[prop].firstChange
      ) {
        // console.log('userName changed');
        // console.log(changes[prop]);
        this.isBookMarked = false;
        this.fetchDevDetails();
      }
    }
  }

  bookMarkProfile() {
    let profileData: Dev = {
      name: this.dev.name,
      bio: this.dev.bio,
      location: this.dev.location,
      avatar_url: this.dev.avatar_url,
      created_at: this.dev.created_at,
      updated_at: this.dev.updated_at,
      repos_url: this.dev.repos_url,
      login: this.dev.login,
      savedBy: this.userId,
    };
    /* this.db
      .addData(this.userId, this.dev)
      .then((res) => console.log(res))
      .catch((err) => console.error(err)); */
    this.fireDb
      .list('saved-profile')
      .push(profileData)
      .then((res) => {
        console.log(res);
        this.isBookMarked = true;
      })
      .catch((err) => console.error(err));
  }

  removeBookMark() {
    if (!this.savedProfId) {
      this.toast.error('no bookmark found');
    }
    this.fireDb
      .list('saved-profile')
      .remove(this.savedProfId)
      .catch((err) => console.error(err));
  }
}
