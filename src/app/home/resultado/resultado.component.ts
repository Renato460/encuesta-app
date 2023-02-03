import {Component, Input, OnInit} from '@angular/core';
import {Encuesta} from "../../models/encuesta";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit{

  @Input() mail:string = '';

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

    this.encuestaTablas = this.encuestas.reduce((resultado: any[], encuesta: Encuesta)=>{
      const hayTotal = resultado.find((a:any)=> a.genero.generoId === encuesta.genero?.generoId);
      if (!hayTotal){
        resultado.push({total:1, genero:encuesta.genero})
      }else {
        hayTotal.total++;
      }
      return resultado;
    },[] as any).sort((a,b)=>b.total - a.total);

  }

}
