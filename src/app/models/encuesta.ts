import {Genero} from "../models/genero";

export class Encuesta{
  id?: number;
  mail?: string;
  genero?:Genero;

  constructor(mail: string, genero:Genero) {
    {
      this.mail = mail;
      this.genero = genero;
    }
  }
}
