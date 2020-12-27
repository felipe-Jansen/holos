import { Component, OnInit } from "@angular/core";
import { NewsProvider } from "../../providers/news.service";
import { ResponseNewsAPI } from "../../interfaces/responseAPI";
import { News } from "../../interfaces/news";
import { Router } from "@angular/router";

@Component({
  selector: "app-blogdoc-page",
  templateUrl: "./blogdoc-page.component.html",
  styleUrls: ["./blogdoc-page.component.scss"],
})
export class BlogdocPageComponent implements OnInit {
  news: News[] = [];
  actualPage = 1;

  constructor(private newsService: NewsProvider, private route: Router) {}

  ngOnInit(): void {
    this.getNews();
  }

  navigateTo(news: News) {
    this.newsService.setActualNews(news);
    this.route.navigateByUrl("blogdetail");
  }

  nextPage(event) {
    this.actualPage = this.actualPage + 1;
    this.getNews(event);
  }

  getNews(event?: any) {
    // requisição retornada pelo Service
    this.newsService
      .getLatestNews(this.actualPage)
      .subscribe((data: ResponseNewsAPI) => {
        if (event) event.target.complete();
        if (data.articles.length > 0) {
          if (this.actualPage === 1) this.news = data.articles;
          // a atribuição tem que ser assim para o Angular ficar ciente da mudança de estado
          // por que desse jeito mudamos a referencia do array news, usando push() não
          else this.news = [...this.news, ...data.articles];
          // se não existirem mais noticias, o enable(false) desativa o infinite scroll
        } else event.target.disabled = true;
      });
    // o evento não existe quando chamamos pela primeira vez
    // temos que ter esse event.complete pois avisa ao infinite scroll que os dados chegaram,
    // então ele pode retirar o spinner
  }
}
