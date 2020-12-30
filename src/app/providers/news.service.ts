import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { News } from "../interfaces/news";
import { ResponseNewsAPI } from "../interfaces/responseApi";
/*
  Generated class for the NewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const APIURL = "http://newsapi.org/v2/top-headlines";
const APIKEY = "1bee8432ea4d4ca386313d3d9d771e08";

@Injectable( {
  providedIn: 'root'
})
export class NewsProvider {
  actualNews: News;

  constructor(public http: HttpClient) {}

  getLatestNews(page: number): Observable<ResponseNewsAPI> {
    return this.http.get<ResponseNewsAPI>(
      `${APIURL}?country=pt&apiKey=${APIKEY}&page=${page}`
    );
  }

  getOneNews(): any {
    return this.actualNews;
  }

  setActualNews(news: News) {
    this.actualNews = news;
  }
}
