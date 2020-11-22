import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ArtistaService } from '../services/artista.service';
import { ArtistaFormBaseComponent } from '../artista-form.base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends ArtistaFormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(
    private fb: FormBuilder,
    private artistaService: ArtistaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {
    super();

    this.artista = this.route.snapshot.data.artista;
  }

  ngOnInit(): void {

    this.artistaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(120)]]
    });

    this.artistaForm.patchValue({
      nome: this.artista.nome
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  editarArtista() {
    if (this.artistaForm.dirty && this.artistaForm.valid) {
      this.loader.show();

      this.artista = Object.assign({}, this.artista, this.artistaForm.value);

      this.artistaService.atualizarArtista(this.artista)
        .subscribe(
          sucesso => { this.processarSucesso(); },
          falha => { this.processarFalha(falha); }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso() {
    this.artistaForm.reset();
    this.errors = [];

    const toast = this.toastr.success('Artista editado com sucesso!', 'Sucesso!');

    this.loader.hide();

    if (toast) {
      this.router.navigate(['/artistas/listar-todos']);
    }
  }

  processarFalha(fail: any) {
    this.errors = fail?.error?.errors || [];
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
