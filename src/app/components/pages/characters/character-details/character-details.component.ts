import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Character } from 'src/app/shared/components/interfaces/character.interface';
import { CharacterService } from 'src/app/shared/services/character.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent {

  character$: Observable<Character> | undefined;

  constructor(private route:ActivatedRoute, private characterSvc: CharacterService,
    private location: Location){}

  ngOnInit(): void{
    this.route.params.pipe(take(1)).subscribe((params) => {
      const id = params['id'];
      this.character$ = this.characterSvc.getDetails(id);
    });
  }

  onGoBack():void{
    this.location.back();
  }
}
