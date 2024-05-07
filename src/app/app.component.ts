import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { Calculator } from './caculator';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-testing_services';

  ngOnInit(){
    const calculator= new Calculator();
    const rta =calculator.multiply(1,4);
  }
}
