import { NgModule } from '@angular/core';

import { ImagenJpgPipe } from './imagen-jpg.pipe';
import { ImagenWebpPipe } from './imagen-webp.pipe';

@NgModule({
  declarations: [ImagenJpgPipe, ImagenWebpPipe],
  exports: [ImagenJpgPipe, ImagenWebpPipe],
})
export class PipesModule {}
