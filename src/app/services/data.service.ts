import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Genero} from "../models/genero";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private  readonly url = 'http://localhost:8080/api/v1';
  constructor(private readonly http: HttpClient) { }

  getGeneros():Observable<any>{
    let respuesta = this.http.get<any>(this.url + '/encuesta/generos');
    return respuesta;
  }
}
