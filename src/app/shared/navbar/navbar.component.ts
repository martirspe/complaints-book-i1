import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  scrollOn: boolean = false;

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
