import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getColor, getFill, getIcon, getWeight} from "../../../../state/icon/icon.selectors";
import {AppState} from "../../../../state/app.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-icon-store',
  templateUrl: './icon-store.component.html',
  styleUrls: ['./icon-store.component.css']
})
export class IconStoreComponent implements OnInit, AfterViewInit, OnDestroy {

  icon: string = '';
  color: string = '';
  fill: number = 0;
  weight: number = 400;

  iconSubscription: any = null;
  colorSubscription: any = null;
  fillSubscription: any = null;
  weightSubscription: any = null;

  constructor(private store: Store<AppState>) {

  }

  ngOnDestroy() {
    this.iconSubscription.unsubscribe();
    this.colorSubscription.unsubscribe();
    this.fillSubscription.unsubscribe();
    this.weightSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.iconSubscription = this.store.select(getIcon).subscribe(iconValue => {
      this.icon = iconValue;
      this.updateStyle()
    });
    this.colorSubscription = this.store.select(getColor).subscribe(colorValue => {
      this.color = colorValue;
      this.updateStyle();
    });
    this.fillSubscription = this.store.select(getFill).subscribe(fillValue => {
      this.fill = fillValue;
      this.updateStyle();
    });
    this.weightSubscription = this.store.select(getWeight).subscribe(weightValue => {
      this.weight = weightValue;
      this.updateStyle();
    });
  }

  ngAfterViewInit() {
    this.updateStyle();
  }

  updateStyle() {
    document.getElementById('svicon')!.style.cssText = "font-variation-settings: 'FILL' " + this.fill + ", 'wght' " + this.weight + ", 'GRAD' 0, 'opsz' 48; color: " + this.color;
  }


}
