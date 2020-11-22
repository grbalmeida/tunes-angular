import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { GeneroService } from '../services/genero.service';
import { GeneroFormBaseComponent } from '../genero-form.base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { GENEROS_LISTAR_TODOS } from 'src/app/shared/routes';
import { GENERO_EDITADO_SUCESSO, OCORREU_UM_ERRO, OPA, SUCESSO } from 'src/app/shared/messages';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends GeneroFormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(
    private fb: FormBuilder,
    private generoService: GeneroService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {
    super();

    this.genero = this.route.snapshot.data.genero;
  }

  ngOnInit(): void {

    this.generoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(120)]]
    });

    this.generoForm.patchValue({
      nome: this.genero.nome
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  editarGenero() {
    if (this.generoForm.dirty && this.generoForm.valid) {
      this.loader.show();

      this.genero = Object.assign({}, this.genero, this.generoForm.value);

      this.generoService.atualizarGenero(this.genero)
        .subscribe(
          sucesso => { this.processarSucesso(); },
          falha => { this.processarFalha(falha); }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso() {
    this.generoForm.reset();
    this.errors = [];

    const toast = this.toastr.success(GENERO_EDITADO_SUCESSO, SUCESSO);

    this.loader.hide();

    if (toast) {
      this.router.navigate([GENEROS_LISTAR_TODOS]);
    }
  }

  processarFalha(fail: any) {
    this.loader.hide();
    this.errors = fail?.error?.errors || [];
    this.toastr.error(OCORREU_UM_ERRO, OPA);
  }
}
