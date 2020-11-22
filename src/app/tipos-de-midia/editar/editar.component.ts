import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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

    const toast = this.toastr.success('Tipo de Mídia editado com sucesso!', 'Sucesso!');
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
