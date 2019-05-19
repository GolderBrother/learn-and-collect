import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {MoviesService} from '../movies.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {
  person: Object;
  movies: Array<Object>;
  constructor(private http: MoviesService, private router: ActivatedRoute,) {

  }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      const id = params['id'];
      this.http.getPersonDetail(id).subscribe(person => {
        this.person = person;
      });
      this.http.getPersonCast(id).subscribe(res => {
        this.movies = res.cast;
      });
    })
  }

}
