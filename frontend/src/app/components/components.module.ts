// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MaterialModule } from './../material.module';

// Componentes comunes
import { SharedModule } from './../shared/shared.module';

// Componentes páginas
import { ProductViewerComponent } from './product-viewer/product-viewer.component';

@NgModule({
  declarations: [ProductViewerComponent],
  imports: [CommonModule, MaterialModule, SharedModule],
  exports: [ProductViewerComponent],
})
export class ComponentsModule {}
