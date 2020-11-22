import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TipoMidia } from './models/tipo-midia';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class TipoMidiaFormBaseComponent extends FormBaseComponent {
  tipoMidia: TipoMidia;
  errors: any[] = [];
  tipoMidiaForm: FormGroup;

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
    super.configurarValidacaoFormularioBase(formInputElements, this.tipoMidiaForm);
  }
}
