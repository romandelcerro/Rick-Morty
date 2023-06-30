import { Injectable } from '@angular/core';
import{HttpClient} from "@angular/common/http"
import { Character } from '../components/interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  
  baseUrlAPI: string = 'https://rickandmortyapi.com/api/character';
  UrlEpisode: string = 'https://rickandmortyapi.com/api/episode/'

  constructor(private http: HttpClient) { }

  searchCharacters(query='', page=1){
    const filter = `${this.baseUrlAPI}/?name=${query}&page=${page}`;
    return this.http.get<Character[]>(filter);
  }

  getDetails(id:number){
    return this.http.get<Character>(`${this.baseUrlAPI}/${id}`);
  }

}
