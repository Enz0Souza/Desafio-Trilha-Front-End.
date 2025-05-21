import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.css']
})
export class ProductCarouselComponent {
  products = [
    {
      name: 'Golden Cão Adulto - Carne - 15kg',
      price: 'R$171,99',
      image: 'raçãogolden.jpg'
    },
    {
      name: 'Premier Gato Adulto - Frango - 10kg',
      price: 'R$199,90',
      image: 'raçãogato.jpg'
    },
    {
      name: 'Special Dog Cão Filhote - Carne - 20kg',
      price: 'R$142,50',
      image: 'raçãoespecial.jpg'
    },
    {
      name: 'Gran Plus Cão Adulto - Frango e Carne - 15kg',
      price: 'R$165,00',
      image: 'raçãofrango.jpg'
    },
    {
      name: 'Pack Ração Úmida Cães Adultos Pequenos Dog Chow Salmão - Com 15 Sachês 100g',
      price: 'R$159,00',
      image: 'dogchow.jpg'
    },
    {
      name: 'Pack Ração Úmida Pedigree Sachê Carne ao Molho para Cães Filhotes 100 g - 36 unidades',
      price: 'R$120,00',
      image: 'pedrigre.jpg'
    },
    {
      name: 'Pack Ração Úmida Pedigree Sachê Carne ao Molho para Cães Filhotes 100 g - 36 unidades',
      price: 'R$120,00',
      image: 'pedrigre.jpg'
    },
    {
      name: 'Pack Ração Úmida Pedigree Sachê Carne ao Molho para Cães Filhotes 100 g - 36 unidades',
      price: 'R$120,00',
      image: 'pedrigre.jpg'
    },
    {
      name: 'Pack Ração Úmida Pedigree Sachê Carne ao Molho para Cães Filhotes 100 g - 36 unidades',
      price: 'R$120,00',
      image: 'pedrigre.jpg'
    }
  ];

  currentIndex = 0;
  visibleItems = 6;

  get visibleProducts() {
    return this.products.slice(this.currentIndex, this.currentIndex + this.visibleItems);
  }

  next() {
    if (this.currentIndex + this.visibleItems < this.products.length) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
