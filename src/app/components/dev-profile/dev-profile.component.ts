import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GithubService } from 'src/app/service/github.service';
import { Dev } from 'src/model/Dev';

@Component({
  selector: 'app-dev-profile',
  templateUrl: './dev-profile.component.html',
  styleUrls: ['./dev-profile.component.css'],
})
export class DevProfileComponent implements OnInit, OnChanges {
  @Input() userName: any;
  @Output()
  newRepoUrl = new EventEmitter<string>()

  dev: Dev | any

  constructor(private ghService: GithubService, private toast: ToastrService) {}

  ngOnInit(): void {}

  fetchDevDetails(){
    this.ghService.getUserDetails(this.userName).subscribe({
      next: (dev:any) => {
        this.dev = dev;
        this.newRepoUrl.emit(dev?.repos_url)
      },
      error: (err) => {
        console.error(err);
        this.toast.error(err);
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if(prop==='userName' && changes[prop].currentValue && !changes[prop].firstChange){
        // console.log('userName changed');
        // console.log(changes[prop]);
        this.fetchDevDetails()
      }
    }
  }
}
