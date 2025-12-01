import { Genero } from'@core/model/genero'

export class Filme {
  id?: number;
  titulo?: string;
  descricao?: string;
  genero?: Genero;
  urlVideo?: string;         
  urlCapa?: string;          
}
