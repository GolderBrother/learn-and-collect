import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {JsonpService} from '../service/jsonp.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
  providers: [JsonpService]
})
export class ActorComponent implements OnInit {
  person: Object;
  movies: Array<Object>;
  constructor(private jsonp:JsonpService, private router: ActivatedRoute,) {

  }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      const id = params['id'];
      this.jsonp.getPersonDetail(id).subscribe(person => {
        this.person = person;
      });
      this.jsonp.getPersonCast(id).subscribe(res => {
        this.movies = res.cast;
      });
    })
  }

}
