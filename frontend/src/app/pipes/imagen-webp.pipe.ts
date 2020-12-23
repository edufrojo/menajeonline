import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagenWebp',
})
export class ImagenWebpPipe implements PipeTransform {
  transform(img: string, tipo: 'articulos'): string {
    let codArticulo;
    if (img) {
      codArticulo = img.toString().match(/^.*?([^\\/.]*)[^\\/]*$/)[1];
    }
    if (!img) {
      return `/assets/images/no-image.png`;
    } else if (img.length === 0) {
      return `/assets/images/no-image.png`;
    } else if (img.includes('https')) {
      return '/assets/images/articulos/' + codArticulo + '.webp';
    } else if (img) {
      return '/assets/images/articulos/' + codArticulo + '.webp';
    }
  }
}
