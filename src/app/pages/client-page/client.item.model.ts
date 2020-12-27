import { ShellModel } from "../../shared/shell/data-store";

enum Captacao {
  face = "FACEBOOK",
  insta = "INSTAGRAM",
  revista = "REVISTA",
  indicacao = "INDICACAO",
}

enum Perfil {
  paciente = "PACIENTE",
  atendente = "ATENDENTE",
  medico = "MEDICO",
  fornecedor = "FORNECEDOR",
}

enum Sexo {
  masculino = "MASCULINO",
  feminino = "FEMININO",
}

export class ClientItemModel extends ShellModel {
  bairro: string;
  captacao: Captacao;
  celular: string;
  cep: string;
  cidade: string;
  cpf: string;
  cro: string;
  nascimento: string;
  email: string;
  endereco: string;
  foto: string;
  fotoContentType: string;
  id: number;
  indicacao: string;
  isDependente: boolean;
  nome: string;
  nomeMae: string;
  nomePai: string;
  numero: string;
  observacao: string;
  perfil: Perfil;
  profissao: string;
  rg: string;
  sexo: Sexo;
  telefone: string;
  uf: string;
  userId: number;
  whatsapp: string;

  constructor() {
    super();
  }
}
