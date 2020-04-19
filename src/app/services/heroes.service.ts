import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private heroesUrl = `https://heroesapp-dcc3e.firebaseio.com/heroes`;

  constructor(
    private http: HttpClient
  ) { }

  newHero(hero: Heroe) {
    const body = JSON.stringify(hero);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.heroesUrl}.json`, body, { headers }).pipe(
      map((res: any) => res.name)
    );
  }

  updateHero(hero: Heroe, key$: string) {
    const body = JSON.stringify(hero);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.heroesUrl}/${key$}.json`, body, { headers }).pipe(
      map((res: any) => res)
    );
  }

  getHero(key$: string) {

    return this.http.get(`${this.heroesUrl}/${key$}.json`).pipe(
      map((res: any) => res)
    );
  }

  getHeroes() {

    return this.http.get(`${this.heroesUrl}.json`).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    );
  }

  deleteHero(key$: string) {
    return this.http.delete(`${this.heroesUrl}/${key$}.json`).pipe(
      map(res => res)
    );
  }
}
