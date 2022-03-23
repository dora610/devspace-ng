import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GithubService } from 'src/app/service/github.service';
import { Dev } from 'src/model/Dev';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName!: string
  repoUrl!:string

  constructor(private ghService: GithubService, private toast:ToastrService) { }

  ngOnInit(): void {
  }

  fetchRepo(userName: string){
    this.userName = userName
  }

  shareRepoUrl(repoUrl: string){
    this.repoUrl=repoUrl
  }

}
