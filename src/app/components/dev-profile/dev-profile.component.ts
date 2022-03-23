import { Component, Input, OnInit } from '@angular/core';
import { GithubService } from 'src/app/service/github.service';
import { Repo } from 'src/model/Repo';

@Component({
  selector: 'app-dev-profile',
  templateUrl: './dev-profile.component.html',
  styleUrls: ['./dev-profile.component.css']
})
export class DevProfileComponent implements OnInit {
  @Input() userName:any

  repo!: Repo|any;

  constructor(private ghService: GithubService) { }

  ngOnInit(): void {
    this.ghService.getUserDetails(this.userName).subscribe({
      next: (repo)=>{
        console.log(repo);
        this.repo = repo
      },
      error: (err)=>console.error(err)
    })
  }

}
