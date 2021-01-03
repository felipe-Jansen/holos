import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientProps'
})
export class ClientPropsPipe implements PipeTransform {
  clientProps = {
    bairro: 'Bairro',
    captacao: 'Captação',
    celular: 'Celular',
    cep: 'Cep',
    cidade: 'Cidade',
    cpf: 'Cpf',
    dataDeNascimento: 'Data de Nascimento',
    email: 'E-mail',
    endereco: 'Endereço',
    indicacao: 'Indicação',
    nome: 'Nome',
    nomeMae: 'Nome da mãe',
    nomePai: 'Nome do pai',
    numero: 'Número',
    observacao: 'Observação',
    profissao: 'Profissão',
    rg: 'RG',
    sexo: 'Sexo',
    telefone: 'Telefone',
    uf: 'UF',
    whatsapp: 'Whatsapp'
  }

  transform(propParam: string): string {
    const entriesProp = Object.entries(this.clientProps)
    const index = entriesProp.findIndex(([prop, valor]) => {
      return propParam === prop
    })
    if (index !== -1) {
      return entriesProp[index][1]
    } else return ''
  }

}
