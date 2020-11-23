import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { FuncionarioService } from '../services/funcionario.service';
import { FuncionarioFormBaseComponent } from '../funcionario-form.base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { FUNCIONARIOS_LISTAR_TODOS } from 'src/app/shared/routes';
import { FUNCIONARIO_CADASTRADO_SUCESSO, OCORREU_UM_ERRO, OPA, SUCESSO } from 'src/app/shared/messages';
import { Funcionario } from '../models/funcionario';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends FuncionarioFormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  funcionarios: Funcionario[] = [];

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {
    super();
  }

  ngOnInit(): void {

    this.funcionarioForm = this.fb.group({
      primeiroNome: ['', [Validators.required, Validators.maxLength(20)]],
      sobrenome: ['', [Validators.required, Validators.maxLength(20)]],
      titulo: ['', Validators.maxLength(30)],
      dataNascimento: ['', Validators.required],
      dataAdmissao: ['', Validators.required],
      endereco: ['', Validators.maxLength(70)],
      cidade: ['', Validators.maxLength(40)],
      estado: ['', Validators.maxLength(40)],
      pais: ['', Validators.maxLength(40)],
      ceps: ['', Validators.maxLength(10)],
      fone: ['', [Validators.maxLength(24)]],
      fax: ['', Validators.maxLength(24)],
      email: ['', [Validators.email, Validators.maxLength(60)]],
      gerenteId: ['']
    });

    this.funcionarios = this.route.snapshot.data.funcionarios;
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarFuncionario() {
    if (this.funcionarioForm.dirty && this.funcionarioForm.valid) {
      this.loader.show();

      const gerenteId = Number(this.funcionarioForm.get('gerenteId').value);

      this.funcionario = {
        ...this.funcionario,
        gerente: this.funcionarios.find(f => f.funcionarioId === gerenteId)
      };

      this.funcionario = Object.assign({}, this.funcionario, this.funcionarioForm.value);

      this.funcionarioService.novoFuncionario(this.funcionario)
        .subscribe(
          () => { this.processarSucesso(); },
          falha => { this.processarFalha(falha); }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso() {
    this.funcionarioForm.reset();
    this.errors = [];

    const toast = this.toastr.success(FUNCIONARIO_CADASTRADO_SUCESSO, SUCESSO);

    this.loader.hide();

    if (toast) {
      this.router.navigate([FUNCIONARIOS_LISTAR_TODOS]);
    }
  }

  processarFalha(fail: any) {
    this.loader.hide();
    this.errors = fail?.error?.errors || [];
    this.toastr.error(OCORREU_UM_ERRO, OPA);
  }
}
