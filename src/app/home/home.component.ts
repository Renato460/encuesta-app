import {Component} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  mail:string = '';
  ishidden:boolean = false;
  envioExitoso(mail:string):void{
    this.mail = mail;
    this.ishidden = true;
  }
}
