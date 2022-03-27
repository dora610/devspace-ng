import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {Dev} from '../../model/Dev'

@Injectable({
  providedIn: 'root'
})
export class RtdbService {

  constructor(private rtdb: AngularFireDatabase) { }

  addData(userId: string, data: Dev){
    return this.rtdb.list<Dev>(`saved-profile/${userId}`).push(data)
  }

  getData(userId:string){
    return this.rtdb.list<Dev>(`saved-profile/${userId}`).valueChanges()
  }
}
