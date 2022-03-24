import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loadingbar',
  templateUrl: './loadingbar.component.html',
  styleUrls: ['./loadingbar.component.css']
})
export class LoadingbarComponent implements OnInit {
  @Input()
  isLoading:boolean
  
  constructor() {
    this.isLoading = false;
   }

  ngOnInit(): void {
  }

}
