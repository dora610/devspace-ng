import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dev-repo',
  templateUrl: './dev-repo.component.html',
  styleUrls: ['./dev-repo.component.css']
})
export class DevRepoComponent implements OnInit {
  repoUrl!:string;
  constructor() { }

  ngOnInit(): void {
  }

}
