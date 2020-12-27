import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-list-page",
  templateUrl: "./list-page.component.html",
  styleUrls: ["./list-page.component.scss"],
})
export class ListPageComponent implements OnInit {
  icons: string[];
  items: Array<{ title: string; note: string; icon: string }>;
  constructor(private route: Router) {}

  ngOnInit() {
    this.icons = [
      "flask",
      "wifi",
      "beer",
      "football",
      "basketball",
      "paper-plane",
      "american-football",
      "boat",
      "bluetooth",
      "build",
    ];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: "Item " + i,
        note: "This is item #" + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)],
      });
    }
  }

  itemTapped(event, item) {
    this.route.navigate(["item-detail"], { queryParams: { item } });
  }
}
