import { ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotaFiscal } from './models/nota-fiscal';
import { FormBaseComponent } from '../base-components/form-base.component';
import { Cliente } from '../cliente/models/cliente';
import { Faixa } from '../faixa/models/faixa';

export abstract class NotaFiscalFormBaseComponent extends FormBaseComponent {
  notaFiscal: NotaFiscal;
  clientes: Cliente[] = [];
  faixas: Faixa[] = [];
  errors: any[] = [];
  notaFiscalForm: FormGroup;

  get itensNotaFiscal() {
    return (this.notaFiscalForm.get('itensNotaFiscal') as FormArray).controls;
  }

  constructor(public fb: FormBuilder) {
    super();

    this.validationMessages = {
      dataNotaFiscal: {
        required: 'Informe a Data'
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
      total: {
        maxlength: 'Informe o Total'
      },
      cliente: {
        required: 'Informe o Cliente'
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
    super.configurarValidacaoFormularioBase(formInputElements, this.notaFiscalForm);
  }

  adicionarItemNotaFiscal() {
    const itensNotaFiscal = this.notaFiscalForm.get('itensNotaFiscal') as FormArray;
    itensNotaFiscal.push(this.createItemNotaFiscal());
  }

  protected createItemNotaFiscal() {
    const itemNotaFiscal = this.fb.group({
      precoUnitario: ['', Validators.required],
      quantidade: ['', Validators.required],
      faixaId: ['', Validators.required],
      faixa: ['']
    });

    this.atualizarTotal();

    return itemNotaFiscal;
  }

  removerItemNotaFiscal(index: number) {
    const itensNotaFiscal = this.notaFiscalForm.get('itensNotaFiscal') as FormArray;
    itensNotaFiscal.removeAt(index);

    this.atualizarTotal();
  }

  protected atualizarTotal() {
    let total = 0;

    const itensNotaFiscal = this.notaFiscalForm.get('itensNotaFiscal') as FormArray;

    for (const control of itensNotaFiscal.controls) {
      const precoUnitario = Number(control.get('precoUnitario').value) || 0;
      const quantidade = Number(control.get('quantidade').value) || 0;

      total += precoUnitario * quantidade;
    }

    this.notaFiscalForm.get('total').setValue(total);
  }

  protected atribuirFaixas() {
    const itensNotaFiscal = this.notaFiscalForm.get('itensNotaFiscal') as FormArray;

    for (const control of itensNotaFiscal.controls) {
      const faixaId = Number(control.get('faixaId').value);
      control.get('faixa').setValue(this.faixas.find(f => f.faixaId === faixaId));
    }
  }

  onItemNotaFiscalChange() {
    this.atribuirFaixas();
    this.atualizarTotal();
  }
}
