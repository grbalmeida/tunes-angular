import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Album } from './models/album';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class AlbumFormBaseComponent extends FormBaseComponent {
  album: Album;
  errors: any[] = [];
  albumForm: FormGroup;

  constructor() {
    super();

    this.validationMessages = {
      titulo: {
        required: 'Informe o Título',
        maxlength: 'Máximo de 160 caracteres'
      },
      artista: {
        required: 'Informe o Artista'
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
    super.configurarValidacaoFormularioBase(formInputElements, this.albumForm);
  }
}
