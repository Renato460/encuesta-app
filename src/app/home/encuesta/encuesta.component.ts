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

  emailPatron: any = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

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
      }
    );
  }

  onSubmit(){
    if(this.encuestaForm.valid){
      const generoForm:Genero = this.generos.find(
        genero =>
          genero.generoId === Number(this.encuestaForm.value.generoId)
      ) ?? {} as Genero;

      const encuesta:Encuesta = new Encuesta(
        this.encuestaForm.value.mail,
        generoForm);
      this.dataService.setEncuesta(encuesta).subscribe(
        respuesta =>{
          this.newEvioEvent.emit(encuesta.mail);
        }
      );
    }
  }

  initForm(): FormGroup{
    return this.fb.group({
      mail: [undefined, [Validators.required, Validators.email, Validators.minLength(5),
        Validators.pattern(this.emailPatron)]],
      generoId: [undefined,[Validators.required]]
    })
  }

  get mail(){ return this.encuestaForm.get('mail');}
  get generoId(){return this.encuestaForm.get('generoId');}
}
