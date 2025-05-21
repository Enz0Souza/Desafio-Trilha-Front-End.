import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  imports: [CommonModule],
  templateUrl: './carrousel.component.html',
  styleUrl: './carrousel.component.css'
})
export class CarrouselComponent {
  intervalId: any; //armazena o setinterval para poder cancelalo
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  currentIndex = 0;//iniciando o array pela 1 imagem
  images = [
    { src: 'banner.png'},
    { src: 'Banner-site.png'},
    { src: 'banner23off.png'},

  ];
  ngOnInit() {//slide automatico
    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = setInterval(() => {
        this.nextSlide();
      }, 2000);
    }
  }

  nextSlide() {//função para passar para o proximo slide
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  backSlide() {//função para voltar para o slide anterior
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }


}



