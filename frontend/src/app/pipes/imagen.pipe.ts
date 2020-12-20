import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: 'articulos'): string {
    if (!img) {
      return `/assets/images/no-image.png`;
    } else if (img.length === 0) {
      return `/assets/images/no-image.png`;
    } else if (img.includes('https')) {
      let position = img.toString().indexOf('articulos/');
      let codArticulo = img.toString().substring(position);
      return '/assets/images/' + codArticulo;
    } else if (img) {
      let position = img.toString().indexOf('articulos/');
      let codArticulo = img.toString().substring(position);
      return '/assets/images/' + codArticulo;
    }
  }
}
