import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {getColor, getFill, getIcon, getWeight} from "../../../../state/icon/icon.selectors";
import {take} from "rxjs";
import {AppState} from "../../../../state/app.state";
import {IconActions} from "../../../../state/icon/icon.actions";

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.css']
})
export class SecondStepComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  fillBool: boolean = false;
  fill: number = 0;
  weightModel: number = 400;
  weight: number = 400;
  color: string = "rgb(0,0,0)";

  ngOnInit(): void {
    this.store.pipe(select(getFill)).pipe(take(1)).subscribe(fill => {
        this.fillBool = Boolean(fill);
        this.fill = fill;
    }
    );
    this.store.pipe(select(getWeight)).pipe(take(1)).subscribe(weight => {
        this.weightModel = weight;
        this.fill = weight;
      }
    );
    this.store.pipe(select(getColor)).pipe(take(1)).subscribe(color => {
        this.color = color;
      }
    );
  }

  setFill() {
    this.fillBool = !this.fillBool;
    this.store.dispatch(IconActions.setfill({ fill: this.fillBool? 1 : 0}))
  };

  setWeight() {
    this.store.dispatch(IconActions.setweight({weight: this.weightModel}))
    //this.$store.commit('icon/setWeight', this.weightModel);
  };

}
