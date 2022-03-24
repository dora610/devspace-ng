import { Component } from '@angular/core';
import { User } from 'src/model/User';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'devgram';
  
  constructor(){}
}
