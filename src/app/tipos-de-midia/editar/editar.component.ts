import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastrService } from 'ngx-toastr';
import { OCORREU_UM_ERRO, OPA, SUCESSO, TIPO_MIDIA_EDITADO_SUCESSO } from 'src/app/shared/messages';
import { TIPOS_DE_MIDIA_LISTAR_TODOS } from 'src/app/shared/routes';

import { TipoMidiaService } from '../services/tipo-midia.service';
import { TipoMidiaFormBaseComponent } from '../tipo-midia-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends TipoMidiaFormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(
    private fb: FormBuilder,
    private tipoMidiaService: TipoMidiaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {
    super();

    this.tipoMidia = this.route.snapshot.data.tipoMidia;
  }

  ngOnInit(): void {

    this.tipoMidiaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(120)]]
    });

    this.tipoMidiaForm.patchValue({
      nome: this.tipoMidia.nome
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  editarTipoMidia() {
    if (this.tipoMidiaForm.dirty && this.tipoMidiaForm.valid) {
      this.loader.show();

      this.tipoMidia = Object.assign({}, this.tipoMidia, this.tipoMidiaForm.value);

      this.tipoMidiaService.atualizarTipoMidia(this.tipoMidia)
        .subscribe(
          sucesso => { this.processarSucesso(); },
          falha => { this.processarFalha(falha); }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso() {
    this.tipoMidiaForm.reset();
    this.errors = [];

    const toast = this.toastr.success(TIPO_MIDIA_EDITADO_SUCESSO, SUCESSO);

    this.loader.hide();

    if (toast) {
      this.router.navigate([TIPOS_DE_MIDIA_LISTAR_TODOS]);
    }
  }

  processarFalha(fail: any) {
    this.loader.hide();
    this.errors = fail?.error?.errors || [];
    this.toastr.error(OCORREU_UM_ERRO, OPA);
  }
}
