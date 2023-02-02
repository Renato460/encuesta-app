import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../services/data.service";
import {Genero} from "../models/genero";
import {Encuesta} from "../models/encuesta";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  encuestaForm!: FormGroup;
  generos: Genero[] = [];

  constructor(private readonly fb: FormBuilder,
              private readonly dataService : DataService) {  }

  ngOnInit() {
    this.encuestaForm = this.initForm();
    this.getGeneros();
  }

  getGeneros(){
    this.dataService.getGeneros().subscribe(
      generos => {
        this.generos = [...generos.respuesta];
        console.log(this.generos);
      }
    );
  }

  onSubmit(){
    const generoForm:Genero = this.generos.find(
            genero =>
              genero.genero_id === Number(this.encuestaForm.value.generoId)
            ) ?? {} as Genero;

    const encuesta:Encuesta = new Encuesta(
            this.encuestaForm.value.mail,
            generoForm);
    
    console.log(encuesta)

    this.dataService.setEncuesta(encuesta).subscribe(
            respuesta =>{
              console.log(respuesta);
            }
    );

    console.log(generoForm)
  }

  initForm(): FormGroup{
    return this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      generoId: [0,[Validators.required]]
    })
  }
}
