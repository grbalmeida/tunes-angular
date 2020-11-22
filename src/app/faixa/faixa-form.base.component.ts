import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Faixa } from './models/faixa';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class FaixaFormBaseComponent extends FormBaseComponent {
  faixa: Faixa;
  errors: any[] = [];
  faixaForm: FormGroup;

  constructor() {
    super();

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
        maxlength: 'Máximo de 200 caracteres'
      },
      compositor: {
        maxlength: 'Máximo de 220 caracteres'
      },
      milissegundos: {
        required: 'Informe a quantidade de milissegundos'
      },
      bytes: {
        required: 'Informe a quantidade de bytes'
      },
      precoUnitario: {
        required: 'Informe o Preço Unitário'
      },
      tipoMidia: {
        required: 'Informe o Tipo de Mídia'
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
    super.configurarValidacaoFormularioBase(formInputElements, this.faixaForm);
  }
}
