import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { FaixaService } from '../services/faixa.service';
import { FaixaFormBaseComponent } from '../faixa-form.base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Album } from 'src/app/album/models/album';
import { TipoMidia } from 'src/app/tipos-de-midia/models/tipo-midia';
import { Genero } from 'src/app/genero/models/genero';
import { FAIXAS_LISTAR_TODOS } from 'src/app/shared/routes';
import { FAIXA_CADASTRADA_SUCESSO, OCORREU_UM_ERRO, OPA, SUCESSO } from 'src/app/shared/messages';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends FaixaFormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  albuns: Album[] = [];
  tiposDeMidia: TipoMidia[] = [];
  generos: Genero[] = [];

  constructor(
    private fb: FormBuilder,
    private faixaService: FaixaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {
    super();
  }

  ngOnInit(): void {

    this.faixaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(200)]],
      compositor: ['', Validators.maxLength(220)],
      milissegundos: ['', Validators.required],
      bytes: ['', Validators.required],
      precoUnitario: ['', Validators.required],
      albumId: [''],
      tipoMidiaId: ['', Validators.required],
      generoId: ['']
    });

    this.albuns = this.route.snapshot.data.albuns;
    this.tiposDeMidia = this.route.snapshot.data.tiposDeMidia;
    this.generos = this.route.snapshot.data.generos;
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarFaixa() {
    if (this.faixaForm.dirty && this.faixaForm.valid) {
      this.loader.show();

      const albumId = Number(this.faixaForm.get('albumId').value);
      const tipoMidiaId = Number(this.faixaForm.get('tipoMidiaId').value);
      const generoId = Number(this.faixaForm.get('generoId').value);

      this.faixa = {
        ...this.faixa,
        album: this.albuns.find(a => a.albumId === albumId),
        tipoMidia: this.tiposDeMidia.find(t => t.tipoMidiaId === tipoMidiaId),
        genero: this.generos.find(g => g.generoId === generoId)
      };

      this.faixa = Object.assign({}, this.faixa, this.faixaForm.value);

      this.faixaService.novaFaixa(this.faixa)
        .subscribe(
          sucesso => { this.processarSucesso(); },
          falha => { this.processarFalha(falha); }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso() {
    this.faixaForm.reset();
    this.errors = [];

    const toast = this.toastr.success(FAIXA_CADASTRADA_SUCESSO, SUCESSO);

    this.loader.hide();

    if (toast) {
      this.router.navigate([FAIXAS_LISTAR_TODOS]);
    }
  }

  processarFalha(fail: any) {
    this.loader.hide();
    this.errors = fail?.error?.errors || [];
    this.toastr.error(OCORREU_UM_ERRO, OPA);
  }
}
