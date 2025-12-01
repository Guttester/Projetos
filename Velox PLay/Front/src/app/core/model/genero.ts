export enum Genero {
  ACAO = 'ACAO',
  COMEDIA = 'COMEDIA',
  DRAMA = 'DRAMA',
  ROMANCE = 'ROMANCE',
  FICCAO = 'FICCAO',
  TERROR = 'TERROR',
  SUSPENSE= 'SUSPENSE',
  AVENTURA= 'AVENTURA'
}

export const GeneroLabel: Record<Genero, string> = {
  [Genero.ACAO]: 'Ação',
  [Genero.COMEDIA]: 'Comédia',
  [Genero.DRAMA]: 'Drama',
  [Genero.ROMANCE]: 'Romance',
  [Genero.FICCAO]: 'Ficção',
  [Genero.TERROR]: 'Terror',
  [Genero.SUSPENSE]: 'Suspense',
  [Genero.AVENTURA]: 'Aventura'
};
