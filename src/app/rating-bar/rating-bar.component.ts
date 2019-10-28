import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

interface IRatingUnit {
  value: number;
  active: boolean;
  //trang thai active cua so
}

@Component({
  selector: 'app-rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.css']
})

export class RatingBarComponent implements OnInit, OnChanges {

  @Input()
  max = 5;
  //gia tri lon nhat chon
  @Input()
  ratingValue = 5;
  //trang thai mac dinh active

  @Input()
  showRatingValue = true;

  @Output()
  rateChange = new EventEmitter<number>();
  //thay doi ham

  ratingUnits: Array<IRatingUnit> = [];
  //ham dem

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("on change");
    if ('max' in changes) {
      let max = changes.max.currentValue;
      max = typeof max === 'undefined' ? 5 : max;
      this.max = max;
      this.calculate(max, this.ratingValue);
    }
  }

  calculate(max, ratingValue) {
    this.ratingUnits = Array.from({length: max},
      (_, index) => ({
        value: index + 1,
        active: index < ratingValue
      }));
  }

  ngOnInit() {
    console.log("on init");
    this.calculate(this.max, this.ratingValue);
  }

  select(index) {
    this.ratingValue = index + 1;
    this.ratingUnits.forEach((item, idx) => item.active = idx < this.ratingValue);
    this.rateChange.emit(this.ratingValue);
  }

  enter(index) {
    this.ratingUnits.forEach((item, idx) => item.active = idx <= index);
  }

  reset() {
    this.ratingUnits.forEach((item, idx) => item.active = idx < this.ratingValue);
  }

  onChange(a) {
    console.log(a);
  }
}
