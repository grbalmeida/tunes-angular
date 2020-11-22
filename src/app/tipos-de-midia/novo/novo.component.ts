import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { TipoMidiaService } from '../services/tipo-midia.service';
import { TipoMidiaFormBaseComponent } from '../tipo-midia-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends TipoMidiaFormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(
    private fb: FormBuilder,
    private tipoMidiaService: TipoMidiaService,
    private router: Router,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit(): void {

    this.tipoMidiaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(120)]]
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarTipoMidia() {
    if (this.tipoMidiaForm.dirty && this.tipoMidiaForm.valid) {
      this.tipoMidia = Object.assign({}, this.tipoMidia, this.tipoMidiaForm.value);

      this.tipoMidiaService.novoTipoMidia(this.tipoMidia)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso); },
          falha => { this.processarFalha(falha); }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.tipoMidiaForm.reset();
    this.errors = [];

    const toast = this.toastr.success('Tipo de Mídia cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/tipos-de-midia/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail?.error?.errors || [];
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
