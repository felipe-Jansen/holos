import { Component, OnInit } from "@angular/core";
import { News } from "../../interfaces/news";
import { NewsProvider } from "../../providers/news.service";

@Component({
  selector: "app-blog-page",
  templateUrl: "./blog-page.component.html",
  styleUrls: ["./blog-page.component.scss"],
})
export class BlogPageComponent implements OnInit {
  newsDetail: News;
  constructor(private newsService: NewsProvider) {}

  ngOnInit() {
    this.newsDetail = this.newsService.getOneNews();
  }
}
