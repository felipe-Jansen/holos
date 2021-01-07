import { Component, OnInit } from "@angular/core";
import { NewsProvider } from "../../providers/news.service";
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

  loading: boolean = true;
  noResults: boolean = false;

  constructor(private newsService: NewsProvider, private route: Router) { }

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
    this.loading = true
    // requisição retornada pelo Service
    this.newsService
      .getLatestNews(this.actualPage)
      .subscribe((data: any) => {
        this.loading = false
        let formattedData = data.map(dta => this.formatNews(dta))
        if (event) event.target.complete();
        if (formattedData.length > 0) {
          if (this.actualPage === 1) this.news = formattedData;
          // a atribuição tem que ser assim para o Angular ficar ciente da mudança de estado
          // por que desse jeito mudamos a referencia do array news, usando push() não
          else this.news = [...this.news, ...formattedData];
          // se não existirem mais noticias, o disabled = true desativa o infinite scroll
        } else event.target.disabled = true;
      });
    // o evento não existe quando chamamos pela primeira vez
    // temos que ter esse event.complete pois avisa ao infinite scroll que os dados chegaram,
    // então ele pode retirar o spinner
  }

  formatNews(data: any): News {
    const { id, date, status, featured_media } = data
    const formattedNews = {
      id: id,
      date: date,
      status,
      title: data.title.rendered,
      content: data.content.rendered,
      author: {
        href: data._links.author[0].href,
      },
      thumbnailImage: '',
      mediumImage: ''
    }
    this.newsService.getNewsMedia(featured_media).subscribe(data => {
      formattedNews.mediumImage = data.media_details.sizes.medium.source_url
      formattedNews.thumbnailImage = data.media_details.sizes.thumbnail.source_url
    })
    return formattedNews
  }
}
