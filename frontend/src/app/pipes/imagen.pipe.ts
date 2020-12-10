import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: 'articulos'): string {
    if (!img) {
      return `./../../assets/images/no-image.png`;
    } else if (img.length === 0) {
      return `./../../assets/images/no-image.png`;
    } else if (img.includes('https')) {
      return img;
    } else if (img) {
      return img;
    }
  }
}
