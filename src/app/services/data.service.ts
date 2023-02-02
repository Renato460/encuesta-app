import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Genero} from "../models/genero";
import {Encuesta} from "../models/encuesta";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private  readonly url = 'http://localhost:8080/api/v1/encuesta';
  constructor(private readonly http: HttpClient) { }

  getGeneros():Observable<any>{
    let respuesta = this.http.get<any>(this.url + '/generos');
    return respuesta;
  }

  setEncuesta(encuesta:Encuesta):Observable<any>{
    console.log(encuesta)
    let respuesta = this.http.post<any>(this.url + '/save', encuesta);
    return respuesta;
  }
}
