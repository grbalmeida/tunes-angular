import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControlName, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { NotaFiscalService } from '../services/nota-fiscal.service';
import { NotaFiscalFormBaseComponent } from '../nota-fiscal-form.base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { NOTAS_FISCAIS_LISTAR_TODOS } from 'src/app/shared/routes';
import { OCORREU_UM_ERRO, OPA, NOTA_FISCAL_CADASTRADA_SUCESSO, SUCESSO } from 'src/app/shared/messages';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends NotaFiscalFormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(
    public fb: FormBuilder,
    private notaFiscalService: NotaFiscalService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {
    super(fb);
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

    this.clientes = this.route.snapshot.data.clientes;
    this.faixas = this.route.snapshot.data.faixas;

    (this.notaFiscalForm.get('itensNotaFiscal') as FormArray).push(this.createItemNotaFiscal());
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarNotaFiscal() {
    if (this.notaFiscalForm.dirty && this.notaFiscalForm.valid) {
      this.loader.show();

      const clienteId = Number(this.notaFiscalForm.get('clienteId').value);

      this.notaFiscal = {
        ...this.notaFiscal,
        cliente: this.clientes.find(c => c.clienteId === clienteId)
      };

      this.atribuirFaixas();

      this.notaFiscal = Object.assign({}, this.notaFiscal, this.notaFiscalForm.value);

      this.notaFiscalService.novaNotaFiscal(this.notaFiscal)
        .subscribe(
          sucesso => { this.processarSucesso(); },
          falha => { this.processarFalha(falha); }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso() {
    this.notaFiscalForm.reset();
    this.errors = [];

    const toast = this.toastr.success(NOTA_FISCAL_CADASTRADA_SUCESSO, SUCESSO);

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
