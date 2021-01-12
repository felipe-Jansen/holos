import { Pipe, PipeTransform } from "@angular/core";

/**
 * Generated class for the NewsPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: "newsDate",
})
export class NewsPipe implements PipeTransform {
  /**
   * Pega a data vinda da API e transforma para 00/00/0000
   */
  transform(data: string) {
    let newDate: any = [];
    let arrayDate = [];
    // separa pelo traço num array
    arrayDate = data.split("-");
    // monta do jeito formatado no array newDate
    newDate[2] = arrayDate[0];
    newDate[1] = arrayDate[1];
    newDate[0] = arrayDate[2].slice(0, 1);
    // Junta tudo usando join e /
    newDate = newDate.join("/");
    return newDate;
  }
}
