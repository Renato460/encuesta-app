import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Genero} from "../../models/genero";
import {Encuesta} from "../../models/encuesta";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit{
  encuestaForm!: FormGroup;
  generos: Genero[] = [];

  @Output() newEvioEvent = new EventEmitter<string>();

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
        this.newEvioEvent.emit(encuesta.mail);
        console.log(respuesta);
      }
    );
  }

  initForm(): FormGroup{
    return this.fb.group({
      mail: [undefined, [Validators.required, Validators.email]],
      generoId: [undefined,[Validators.required]]
    })
  }
}
