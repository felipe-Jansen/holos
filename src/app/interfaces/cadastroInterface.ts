export interface Cadastro {
    login: string;
    firstName: string;
    email: string;
    activated: boolean;
    password: string;
    authorities: Array<string>;
    langKey: string;
    lastName: string;
    imageUrl: string;
}
