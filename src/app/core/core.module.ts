import { CategoriasService } from './../categorias/categorias.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastyModule } from 'ng2-toasty'

import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog'

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from 'app/lancamentos/lancamento.service';
import { PessoaService } from 'app/pessoas/pessoa.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule,
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers :[
    ErrorHandlerService,
    LancamentoService, 
    PessoaService, 
    ConfirmationService, 
    CategoriasService,
    { provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class CoreModule { }
