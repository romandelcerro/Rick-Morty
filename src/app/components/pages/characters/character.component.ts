import{ Component, Input, ChangeDetectionStrategy} from '@angular/core';
import { Character } from 'src/app/shared/components/interfaces/character.interface';

@Component({
    selector: 'app-character',
    template: `
    <div class="card bg-dark text-white border border-2 border-black rounded-4 d-flex justify-content-center w-auto w-sm-25">
            <div class="image">
                <a [routerLink]="['/character-details', character.id]">
                    <img
                    [src]="character.image"
                    [alt]="character.name"
                    class="card-img-top"
                    />
                </a>
            </div>
            <div class="card-inner  text-center">
            <div class="name-container">
                <a [routerLink]="['/character-details', character.id]" class="text-decoration-none text-white">
                <h2 class="pa">{{ character.name | slice: 0:12 }}</h2>
                </a>
                <span *ngIf="alive" class="status-span alive">🟢{{ character.status }} - {{ character.species | slice: 0:10 }}</span>
                <span *ngIf="dead" class="status-span dead">🔴{{ character.status }} - {{ character.species | slice: 0:10 }}</span>
                <span *ngIf="unknown" class="status-span unknown">🟣{{ character.status }} - {{ character.species | slice: 0:10 }}</span>
            </div>
            <div class="created-container">
                <small>Creation: {{ character.created | date }}</small>
            </div>
            <div class="gender-container">
                <p class="ph5">Location: {{ character.origin.name | slice: 0:10 }}</p>
            </div>
            </div>
    </div>
    `,
    changeDetection:ChangeDetectionStrategy.OnPush
})

export class CharacterComponent{
    @Input()character!:Character;
    get alive(): boolean {
        return this.character.status === 'Alive';
    }

    get dead(): boolean {
        return this.character.status === 'Dead';
    }

    get unknown(): boolean {
        return this.character.status === 'unknown';
    }

}