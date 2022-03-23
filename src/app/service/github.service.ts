import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  baseUrl: string = 'https://api.github.com/users'

  constructor(private http: HttpClient) { }

  getUserDetails(userName:string){
    return this.http.get(`${this.baseUrl}/${userName}`)
  }

  getUserRepo(repoUrl:string){
    return this.http.get(repoUrl)
  }
}
