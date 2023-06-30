import { Component, HostListener, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Params, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { Character } from 'src/app/shared/components/interfaces/character.interface';
import { CharacterService } from 'src/app/shared/services/character.service';
import { DOCUMENT } from '@angular/common';

type RequestInfo = {
  next: string;
}

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent {

  characters: Character[] = [];

  info: RequestInfo = {
    next: "",
  };

  showGoUpButton = false;

  private pageNum=1;
  private query:string | undefined;

  constructor(
    @Inject(DOCUMENT) private document:Document,
    private characterSvc: CharacterService, private route: ActivatedRoute,
    private router: Router){
      this.onUrlChanged();
    }

  ngOnInit(): void{
  }

 
  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffSet = window.scrollY;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showGoUpButton = (yOffSet || scrollTop) > 500;
  }


 onScrollTop(): void{
    this.document.body.scrollTop = 0; // Safari
    this.document.documentElement.scrollTop = 0; // Other
  }


  onScrollDown(){
    if(this.info.next){
      this.pageNum++;
      this.getDataFromService();
    }
  }
  
  private onUrlChanged(): void{
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(()=>{
      this.characters = [];
      this.pageNum=1;
      this.getCharactersByQuery();
    })
  }

  private getCharactersByQuery(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: Params) => {
      this.query = params['q'];
      this.getDataFromService();
    });
  }
  

  private getDataFromService():void{
    this.characterSvc.searchCharacters(this.query, this.pageNum)
    .pipe(
      take(1)
    ).subscribe((res:any) => {
      if(res?.results?.length){
        const {info, results} = res;
        this.characters = [...this.characters, ...results]
        this.info = info;
      } else{
        this.characters = [];
      }
    })
  }
}
