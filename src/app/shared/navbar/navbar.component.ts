import { Component, HostListener } from '@angular/core';

// Services
import { ClaimNumberService } from '../../services/claimNumber.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  // Variables
  scrollOn: boolean = false;
  year = (new Date()).getFullYear();

  // Variables del servicio ClaimNumberService
  tableLength: number = 0; // El número que deseas convertir en una cadena con ceros a la izquierda
  desiredLength: number = 4; // La longitud total deseada de la cadena, incluidos los ceros a la izquierda
  stringWithZeros: string = '';

  constructor(
    private claimNumberService: ClaimNumberService
  ) { }

  ngOnInit(): void {
    // Obtén la cadena con ceros directamente desde el servicio
    this.claimNumberService.getTableLength().subscribe(length => {
      this.tableLength = length + 1;
      this.stringWithZeros = this.tableLength.toString().padStart(this.desiredLength, '0');
    });
  }

  @HostListener('scroll', ['$event'])
  onScroll($event: Event) {
    // let scrollEvent = $event.srcElement?.addEventListener;
    $event.srcElement?.addEventListener;

    if (window.scrollY > 50) {
      this.scrollOn = true
    } else {
      this.scrollOn = false;
    }
    // console.log("scroll: ", scrollEvent);
  }

}
