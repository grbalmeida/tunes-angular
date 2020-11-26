import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ClienteService } from '../services/cliente.service';
import { ClienteFormBaseComponent } from '../cliente-form.base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CLIENTES_LISTAR_TODOS } from 'src/app/shared/routes';
import { CLIENTE_CADASTRADO_SUCESSO, OCORREU_UM_ERRO, OPA, SUCESSO } from 'src/app/shared/messages';
import { Funcionario } from 'src/app/funcionario/models/funcionario';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends ClienteFormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  funcionarios: Funcionario[] = [];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {
    super();
  }

  ngOnInit(): void {

    this.clienteForm = this.fb.group({
      primeiroNome: ['', [Validators.required, Validators.maxLength(40)]],
      sobrenome: ['', [Validators.required, Validators.maxLength(40)]],
      empresa: ['', Validators.maxLength(80)],
      endereco: ['', Validators.maxLength(70)],
      cidade: ['', Validators.maxLength(40)],
      estado: ['', Validators.maxLength(40)],
      pais: ['', Validators.maxLength(40)],
      cep: ['', Validators.maxLength(10)],
      fone: ['', [Validators.maxLength(24)]],
      fax: ['', Validators.maxLength(24)],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(60)]],
      suporteId: ['']
    });

    this.funcionarios = this.route.snapshot.data.funcionarios;
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarCliente() {
    if (this.clienteForm.dirty && this.clienteForm.valid) {
      this.loader.show();

      const suporteId = Number(this.clienteForm.get('suporteId').value);

      this.cliente = {
        ...this.cliente,
        suporte: this.funcionarios.find(f => f.funcionarioId === suporteId)
      };

      this.cliente = Object.assign({}, this.cliente, this.clienteForm.value);

      this.clienteService.novoCliente(this.cliente)
        .subscribe(
          () => { this.processarSucesso(); },
          falha => { this.processarFalha(falha); }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso() {
    this.clienteForm.reset();
    this.errors = [];

    const toast = this.toastr.success(CLIENTE_CADASTRADO_SUCESSO, SUCESSO);

    this.loader.hide();

    if (toast) {
      this.router.navigate([CLIENTES_LISTAR_TODOS]);
    }
  }

  processarFalha(fail: any) {
    this.loader.hide();
    this.errors = fail?.error?.errors || [];
    this.toastr.error(OCORREU_UM_ERRO, OPA);
  }
}
