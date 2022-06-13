import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Member} from "../../../model/member";
import {MemberFormService} from "./member-form.service";

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  heroes: Member[] = [];
  editHero: Member | undefined; // the hero currently being edited
  heroName = '';

  constructor(private memberFormService: MemberFormService) {}

  @ViewChild('heroEditInput')
  set heroEditInput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.memberFormService.getHeroes()
        .subscribe(heroes => (this.heroes = heroes));
  }

  add(nom: string): void {
    this.editHero = undefined;
    nom = nom.trim();
    if (!nom) {
      return;
    }

    // The server will generate the id for this new hero
    const newHero: Member = { nom } as Member;
    this.memberFormService
        .addHero(newHero)
        .subscribe(hero => this.heroes.push(hero));
  }

  delete(member: Member): void {
    this.heroes = this.heroes.filter(h => h !== member);
    this.memberFormService
        .deleteHero(member.id)
        .subscribe();
    /*
    // oops ... subscribe() is missing so nothing happens
    this.heroesService.deleteHero(hero.id);
    */
  }

  edit(heroName: string) {
    this.update(heroName);
    this.editHero = undefined;
  }

  search(searchTerm: string) {
    this.editHero = undefined;
    if (searchTerm) {
      this.memberFormService
          .searchHeroes(searchTerm)
          .subscribe(heroes => (this.heroes = heroes));
    } else {
      this.getHeroes();
    }
  }

  update(heroName: string) {
    if (heroName && this.editHero && this.editHero.nom !== heroName) {
      this.memberFormService
          .updateHero({...this.editHero, nom: heroName})
          .subscribe(hero => {
            // replace the hero in the heroes list with update from server
            const ix = hero ? this.heroes.findIndex(h => h.id === hero.id) : -1;
            if (ix > -1) {
              this.heroes[ix] = hero;
            }
          });
      this.editHero = undefined;
    }
  }
}
