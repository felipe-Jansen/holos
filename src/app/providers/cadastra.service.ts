import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cadastro } from '../interfaces/cadastroInterface'

@Injectable({
  providedIn: 'root'
})
export class CadastraService {
  cadastroAtual: Cadastro;

  constructor(private http: HttpClient) { }

  setCadastro(cadastro: Cadastro): void {
    this.cadastroAtual = cadastro
  }

  getCadastro(): Cadastro {
    return this.cadastroAtual
  }

  newAccount(account: any): any {
    return this.http.post('api/register', account)
  }

  newUser(user: any): any {
    return this.http.post('api/users', user)
  }

}
