import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {IconActions} from "../../../../state/icon/icon.actions";
import {getIcon, getIcons} from "../../../../state/icon/icon.selectors";
import {AppState} from "../../../../state/app.state";
import {take} from "rxjs";

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.css']
})
export class FirstStepComponent implements OnInit {

  @Input() msg: string = "";

  constructor(private store: Store<AppState>) {
  }

  icons: Array<string> = ["home", "mood", "cancel", "settings", "favorite", "savings", "star", "bolt", "map", "terminal",
    "person", "public", "eco", "sunny", "rocket", "rainy", "cloudy", "bedtime", "cookie","psychiatry", "ent", "lunch_dining", "emoji_nature"];
  selectedIcon: string = "";//TODOthis.$state.state.icon.icon,
  iconSaved: boolean = false;
  searchInput: string = "";
  filteredIcons: Array<string> = [];

  //TODO mounted()
  ngOnInit(): void {
    this.store.pipe(select(getIcon)).pipe(take(1)).subscribe(icon => {
        this.selectedIcon = icon;
        if (this.selectedIcon) {
          setTimeout(() => {
            document.getElementById(this.selectedIcon)!.parentElement!.style.border = "#0d6efd 5px solid";
          }, 10);
        }
      }
    );
    this.store.pipe(select(getIcons)).pipe(take(1)).subscribe(icons => {
      this.filteredIcons = icons;
    });
  }

  //TODO
  saveIcon(icon: string) {
    if (this.selectedIcon != "") {
      document.getElementById(this.selectedIcon)!.parentElement!.style.border = "white 4px solid";
    }
    this.store.dispatch(IconActions.seticon({icon: icon.toLowerCase()}));
    //this.$state.commit("icon/setIcon", icon.toLowerCase());
    document.getElementById(icon)!.parentElement!.style.border = "#0d6efd 4px solid";
    this.selectedIcon = icon;
    this.iconSaved = true;
  };

  search() {
    this.filteredIcons = this.icons.filter(icon => {
      return icon.toLowerCase().indexOf(this.searchInput.toLowerCase()) != -1;
    });
  };

  //TODO
  createRandomIcon() {
    //set random icon
    //vue: let icons = this.$state.state.icon.icons;
    //vue: this.$state.commit('icon/setIcon', randomIcon);
    this.store.pipe(select(getIcons)).pipe(take(1)).subscribe(icons => {
      let randomIconIdx = Math.round(Math.random() * icons.length);
      let randomIcon = icons[randomIconIdx];
      this.store.dispatch(IconActions.seticon({icon: randomIcon}));
      console.log("created random icon: " + randomIcon);
      //set random filled/outline
      let iconFill = Math.round(Math.random());
      this.store.dispatch(IconActions.setfill({ fill: iconFill}));
      //set random weight
      let randomWeight = Math.round(Math.random()*7)*100;
      this.store.dispatch(IconActions.setweight({ weight: randomWeight}));
      //set random rgb color
      let r = Math.round(Math.random()*255);
      let g = Math.round(Math.random()*255);
      let b = Math.round(Math.random()*255);
      let rgb = "rgb("+r+","+g+","+b+")";
      this.store.dispatch(IconActions.setcolor({ color: rgb}))
      this.store.dispatch(IconActions.setstep( { step: 3}));
      });
  };
}
