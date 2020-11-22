import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Genero } from './models/genero';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class GeneroFormBaseComponent extends FormBaseComponent {
  genero: Genero;
  errors: any[] = [];
  generoForm: FormGroup;

  constructor() {
    super();

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
        maxlength: 'Máximo de 120 caracteres'
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
    super.configurarValidacaoFormularioBase(formInputElements, this.generoForm);
  }
}
