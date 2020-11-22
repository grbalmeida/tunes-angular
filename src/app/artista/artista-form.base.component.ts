import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Artista } from './models/artista';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class ArtistaFormBaseComponent extends FormBaseComponent {
  artista: Artista;
  errors: any[] = [];
  artistaForm: FormGroup;

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
    super.configurarValidacaoFormularioBase(formInputElements, this.artistaForm);
  }
}
