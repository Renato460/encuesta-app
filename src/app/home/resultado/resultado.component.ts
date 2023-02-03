import {Component, OnInit} from '@angular/core';
import {Encuesta} from "../../models/encuesta";
import {FormBuilder} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {Genero} from "../../models/genero";
import {of} from "rxjs";

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit{

  encuestas: Encuesta[] = [];
  encuestaTablas: any[] =[];

  constructor( private readonly dataService : DataService ) {  }
  ngOnInit(): void {
    this.getEncuestas();
  }

  getEncuestas():void{
    this.dataService.getEncuestas().subscribe(
      encuestas=>{
        this.encuestas = [...encuestas.respuesta];
        this.encuestasTotales()
      }
    );

  }

  encuestasTotales():void{
    console.log(this.encuestas);

    this.encuestaTablas = this.encuestas.reduce((resultado: any[], encuesta: Encuesta)=>{
      const hayTotal = resultado.find((a:any)=> a.genero.genero_id === encuesta.genero?.genero_id);
      if (!hayTotal){
        resultado.push({total:1, genero:encuesta.genero})
      }else {
        hayTotal.total++;
      }
      return resultado;
    },[] as any).sort((a,b)=>b.total - a.total);

  }

}
