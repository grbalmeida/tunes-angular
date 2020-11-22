import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Playlist } from './models/playlist';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class PlaylistFormBaseComponent extends FormBaseComponent {
  playlist: Playlist;
  errors: any[] = [];
  playlistForm: FormGroup;

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
    super.configurarValidacaoFormularioBase(formInputElements, this.playlistForm);
  }
}
