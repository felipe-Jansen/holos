import { News } from "./news";

export interface ResponseNewsAPI {
  status: string;
  totalResults: number;
  articles: News[];
}
