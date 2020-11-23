import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Funcionario } from './models/funcionario';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class FuncionarioFormBaseComponent extends FormBaseComponent {
  funcionario: Funcionario;
  errors: any[] = [];
  funcionarioForm: FormGroup;

  constructor() {
    super();

    this.validationMessages = {
      primeiroNome: {
        required: 'Informe o Primeiro Nome',
        maxlength: 'Máximo de 20 caracteres'
      },
      sobrenome: {
        required: 'Informe o Sobrenome',
        maxlength: 'Máximo de 20 caracteres'
      },
      titulo: {
        maxlength: 'Máximo de 30 caracteres'
      },
      dataNascimento: {
        required: 'Informe a Data de Nascimento'
      },
      dataAdmissao: {
        required: 'Informe a Data de Admissão'
      },
      endereco: {
        maxlength: 'Máximo de 70 caracteres'
      },
      cidade: {
        maxlength: 'Máximo de 40 caracteres'
      },
      estado: {
        maxlength: 'Máximo de 40 caracteres'
      },
      pais: {
        maxlength: 'Máximo de 40 caracteres'
      },
      cep: {
        maxlength: 'Máximo de 10 caracteres'
      },
      fone: {
        maxlength: 'Máximo de 24 caracteres'
      },
      fax: {
        maxlength: 'Máximo de 24 caracteres'
      },
      email: {
        maxlength: 'Máximo de 60 caracteres',
        email: 'Email em formato inválido'
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
    super.configurarValidacaoFormularioBase(formInputElements, this.funcionarioForm);
  }
}
