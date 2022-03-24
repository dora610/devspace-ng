import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth) { }

  signIn(email: string, password:string){
    return this.fireAuth.signInWithEmailAndPassword(email, password)
  }

  signUp(email: string, password:string){
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
  }

  signOut(){
    localStorage.removeItem('auth')
    return this.fireAuth.signOut()
  }

  getUser(){
    return this.fireAuth.onAuthStateChanged
    // return this.fireAuth.currentUser
    // return this.fireAuth.authState
  }
}
