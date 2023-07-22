import {Component, Input, OnInit} from '@angular/core';
import {AppState} from "../../../../state/app.state";
import {select, Store} from "@ngrx/store";
import {IconActions} from "../../../../state/icon/icon.actions";
import {getColor, getFill} from "../../../../state/icon/icon.selectors";
import {take} from "rxjs";

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.css']
})
export class ThirdStepComponent implements OnInit {

  @Input() showColorPicker: boolean = true;
  color: string = "#000000";

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.pipe(select(getColor)).pipe(take(1)).subscribe(color => {
      this.color = this.rgbToHex(color);
      console.log("store color is: " + this.color.toString());
    });
  }

  setColor() {
    this.store.dispatch(IconActions.setcolor({color: this.color}))
  }

  rgbToHex(rgbString: string): string {
    if (rgbString.includes("#")) return rgbString;
    let valuesArray =
      rgbString
        .replace("r", "")
        .replace("g", "")
        .replace("b", "")
        .replace("(","")
        .replace(")","").split(","); //rgb(10,0,20);
    let r = Number(valuesArray[0]);
    let g = Number(valuesArray[1]);
    let b = Number(valuesArray[2]);

    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  componentToHex(comp: Number) {
    let hex = comp.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

}
