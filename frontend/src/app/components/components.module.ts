// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Rutas
import { RouterModule } from '@angular/router';

// Angular Material
import { MaterialModule } from './../material.module';

// Componentes comunes
import { SharedModule } from './../shared/shared.module';

// Componentes páginas
import { ProductViewerComponent } from './product-viewer/product-viewer.component';
import { WelcomeInfoComponent } from './welcome-info/welcome-info.component';
import { BotonAtrasComponent } from './boton-atras/boton-atras.component';
import { BotonTopComponent } from './boton-top/boton-top.component';

@NgModule({
  declarations: [
    ProductViewerComponent,
    WelcomeInfoComponent,
    BotonAtrasComponent,
    BotonTopComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, SharedModule],
  exports: [
    ProductViewerComponent,
    WelcomeInfoComponent,
    BotonAtrasComponent,
    BotonTopComponent,
  ],
})
export class ComponentsModule {}
