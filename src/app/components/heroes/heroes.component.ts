import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: [
  ]
})
export class HeroesComponent implements OnInit {

  heroes: any[] = [];
  constructor(
    private heroesService: HeroesService
  ) {
    this.heroesService.getHeroes().subscribe(heroes => {
      console.log(heroes);
      this.heroes = heroes;
    });
  }

  ngOnInit(): void {
  }

  deleteHero(id: string) {
    this.heroesService.deleteHero(id).subscribe(resp => {
      if (resp) { return; }
      delete this.heroes[id];
    });
  }

}
