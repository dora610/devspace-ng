import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output()
  newUserNameEvent = new EventEmitter<string>()


  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    this.newUserNameEvent.emit(f.value.userName)
  }

}
