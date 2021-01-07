import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnChanges {
  @Input() messageLoading: string;
  @Input() messageNoResults: string;
  @Input() loading: boolean = true;
  @Input() noResults: boolean = false;
  constructor() { }

  ngOnInit() { }


  ngOnChanges() {
    console.log(this.loading)
    console.log(this.noResults)
  }
}
