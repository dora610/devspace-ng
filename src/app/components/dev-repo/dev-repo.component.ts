import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GithubService } from 'src/app/service/github.service';
import { Repo } from 'src/model/Repo';

@Component({
  selector: 'app-dev-repo',
  templateUrl: './dev-repo.component.html',
  styleUrls: ['./dev-repo.component.css'],
})
export class DevRepoComponent implements OnInit, OnChanges {
  @Input()
  repoUrl!: string;

  repos!: Repo[];
  isLoading: boolean = false;

  constructor(private gh: GithubService, private toast: ToastrService) {}

  ngOnInit(): void {}

  fetchRepo() {
    this.isLoading = true;
    this.gh.getUserRepo(this.repoUrl).subscribe({
      next: (repos: any) => {
        this.repos = repos;
      },
      error: (err) => {
        console.error(err);
        this.toast.error(err);
      },
      complete: () => (this.isLoading = false),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      if (prop === 'repoUrl' && changes[prop] && !changes[prop].firstChange) {
        this.fetchRepo();
      }
    }
  }
}
