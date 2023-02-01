import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../services/data.service";
import {Genero} from "../models/genero";

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
        console.log(generos);
        this.generos = [...generos.respuesta];
      }
    );

  }

  onSubmit(){
    console.log(this.encuestaForm.value)
  }

  initForm(): FormGroup{
    return this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      genero: ['',[Validators.required]]
    })
  }
}
