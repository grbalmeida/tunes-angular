import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControlName, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { NotaFiscalService } from '../services/nota-fiscal.service';
import { NotaFiscalFormBaseComponent } from '../nota-fiscal-form.base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { NOTAS_FISCAIS_LISTAR_TODOS } from 'src/app/shared/routes';
import { OCORREU_UM_ERRO, OPA, NOTA_FISCAL_EDITADA_SUCESSO, SUCESSO } from 'src/app/shared/messages';
import { Cliente } from 'src/app/cliente/models/cliente';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends NotaFiscalFormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  clientes: Cliente[] = [];

  constructor(
    public fb: FormBuilder,
    private notaFiscalService: NotaFiscalService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {
    super(fb);

    this.notaFiscal = this.route.snapshot.data.notaFiscal;
    this.clientes = this.route.snapshot.data.clientes;
    this.faixas = this.route.snapshot.data.faixas;
  }

  ngOnInit(): void {

    this.notaFiscalForm = this.fb.group({
      dataNotaFiscal: ['', Validators.required],
      endereco: ['', Validators.maxLength(70)],
      cidade: ['', Validators.maxLength(40)],
      estado: ['', Validators.maxLength(40)],
      pais: ['', Validators.maxLength(40)],
      cep: ['', Validators.maxLength(10)],
      total: [{ value: 0, disabled: true }, Validators.required],
      clienteId: ['', Validators.required],
      itensNotaFiscal: this.fb.array([])
    });

    this.notaFiscalForm.patchValue({
      ...this.notaFiscal,
      dataNotaFiscal: this.notaFiscal.dataNotaFiscal?.toString().substring(0, 10),
      clienteId: this.notaFiscal.cliente?.clienteId,
    });

    this.preencherItensNotaFiscal();

    console.log(this.notaFiscalForm.value);
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  editarNotaFiscal() {
    if (this.notaFiscalForm.dirty && this.notaFiscalForm.valid) {
      this.loader.show();

      const clienteId = this.notaFiscalForm.get('clienteId').value;

      this.notaFiscal = {
        ...this.notaFiscal,
        cliente: this.clientes.find(c => c.clienteId === clienteId)
      };

      this.notaFiscal = Object.assign({}, this.notaFiscal, this.notaFiscalForm.value);

      this.atribuirFaixas();

      this.notaFiscalService.atualizarNotaFiscal(this.notaFiscal)
        .subscribe(
          sucesso => { this.processarSucesso(); },
          falha => { this.processarFalha(falha); }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  preencherItensNotaFiscal() {
    const itensNotaFiscal = this.notaFiscalForm.get('itensNotaFiscal') as FormArray;

    itensNotaFiscal.clear();

    this.notaFiscal.itensNotaFiscal?.forEach(inf => {
      const itemNotaFiscal = this.fb.group({
        precoUnitario: [inf.precoUnitario, Validators.required],
        quantidade: [inf.quantidade, Validators.required],
        faixaId: [inf.faixa?.faixaId, Validators.required],
        faixa: [inf.faixa]
      });

      itensNotaFiscal.push(itemNotaFiscal);
    });

    this.atualizarTotal();
  }

  processarSucesso() {
    this.notaFiscalForm.reset();
    this.errors = [];

    const toast = this.toastr.success(NOTA_FISCAL_EDITADA_SUCESSO, SUCESSO);

    this.loader.hide();

    if (toast) {
      this.router.navigate([NOTAS_FISCAIS_LISTAR_TODOS]);
    }
  }

  processarFalha(fail: any) {
    this.loader.hide();
    this.errors = fail?.error?.errors || [];
    this.toastr.error(OCORREU_UM_ERRO, OPA);
  }
}
