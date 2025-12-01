import { Filme } from "./filmes";

export class Users {
  id?: number;
  nome?: string;
  email?: string;
  senha?: string;
  tipoUser?: string= "Default"
  favoritos?: Filme[] = [];

  confirmarEmail?: string;
  confirmarSenha?: string;
}