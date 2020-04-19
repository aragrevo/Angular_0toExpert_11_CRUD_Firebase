import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  id: string;

  heroe: Heroe = {
    name: '',
    bio: '',
    house: 'Marvel'
  };

  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((param: Params) => {
      this.id = param.id;
      if (this.id === 'nuevo') { return; }
      heroesService.getHero(this.id).subscribe(hero => this.heroe = hero);
    });
  }

  ngOnInit(): void {

  }

  newHero(form: NgForm) {
    this.router.navigate(['/heroe', 'nuevo']);
    form.reset({
      house: 'Marvel'
    });
  }

  saveHeroe() {
    console.log(this.id);
    this.id === 'nuevo' ? this.insertHero() : this.updateHero();
  }

  insertHero() {
    this.heroesService.newHero(this.heroe)
      .subscribe(id => this.router.navigate(['/heroe', id]),
        error => console.error(error)
      );
  }

  updateHero() {
    this.heroesService.updateHero(this.heroe, this.id)
      .subscribe(hero => console.log(hero),
        error => console.error(error)
      );
  }

}
