import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';

import { CustomValidators } from 'ngx-custom-validators';
import { ToastrService } from 'ngx-toastr';

import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';
import { Router } from '@angular/router';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HOME } from 'src/app/shared/routes';
import { BEM_VINDO, OCORREU_UM_ERRO, OPA, REGISTRO_REALIZADO_SUCESSO } from 'src/app/shared/messages';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  cadastroForm: FormGroup;
  usuario: Usuario;

  mudancasNaoSalvas: boolean;

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private router: Router,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {
    super();

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      senha: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      },
      confirmacaoSenha: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit(): void {
    const senha = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([6, 15])
    ]);

    const senhaConfirmacao = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([6, 15]),
      CustomValidators.equalTo(senha)
    ]);

    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha,
      confirmacaoSenha: senhaConfirmacao
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.cadastroForm);
  }

  adicionarConta() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.loader.show();

      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);

      this.contaService.registrarUsuario(this.usuario)
        .subscribe(
          sucesso => this.processarSucesso(sucesso),
          falha => this.processarFalha(falha)
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.cadastroForm.reset();
    this.errors = [];

    this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);

    const toast = this.toastr.success(REGISTRO_REALIZADO_SUCESSO, BEM_VINDO);

    this.loader.hide();

    if (toast) {
      this.router.navigate([HOME]);
    }
  }

  processarFalha(fail: any) {
    this.loader.hide();
    this.errors = fail?.error?.errors;
    this.toastr.error(OCORREU_UM_ERRO, OPA);
  }
}
