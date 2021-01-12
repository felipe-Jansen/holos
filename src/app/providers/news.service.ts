import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { News } from "../interfaces/news";
/*
  Generated class for the NewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const APIURL = "https://www.holosodontologia.com.br/wp-json/wp/v2";

@Injectable( {
  providedIn: 'root'
})
export class NewsProvider {
  actualNews: News;

  constructor(public http: HttpClient) {}

  getLatestNews(page: number): Observable<any> {
    return this.http.get<any>(
      `${APIURL}/posts?orderBy=date&page=${page}`
    );
  }

  getNewsMedia(idMedia: string): Observable<any> {
    return this.http.get(`${APIURL}/media/${idMedia}`)
  }

  getOneNews(): any {
    return this.actualNews;
  }

  setActualNews(news: News) {
    this.actualNews = news;
  }
}
