import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AlbumService } from '../services/album.service';
import { AlbumFormBaseComponent } from '../album-form.base.component';
import { Artista } from 'src/app/artista/models/artista';
import { NgxSpinnerService } from 'ngx-spinner';
import { ALBUNS_LISTAR_TODOS } from 'src/app/shared/routes';
import { ALBUM_EDITADO_SUCESSO, OCORREU_UM_ERRO, OPA, SUCESSO } from 'src/app/shared/messages';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends AlbumFormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  artistas: Artista[] = [];

  constructor(
    private fb: FormBuilder,
    private albumService: AlbumService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {
    super();

    this.album = this.route.snapshot.data.album;
  }

  ngOnInit(): void {

    this.albumForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(160)]],
      artistaId: ['', Validators.required]
    });

    this.artistas = this.route.snapshot.data.artistas;

    this.albumForm.patchValue({
      titulo: this.album.titulo,
      artistaId: this.album.artista.artistaId
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  editarAlbum() {
    if (this.albumForm.dirty && this.albumForm.valid) {
      this.loader.show();

      const artistaId = Number(this.albumForm.get('artistaId').value);
      this.album = { ...this.album, artista: this.artistas.find(a => a.artistaId === artistaId) };
      this.album = Object.assign({}, this.album, this.albumForm.value);

      this.albumService.atualizarAlbum(this.album)
        .subscribe(
          sucesso => { this.processarSucesso(); },
          falha => { this.processarFalha(falha); }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso() {
    this.albumForm.reset();
    this.errors = [];

    this.loader.hide();

    const toast = this.toastr.success(ALBUM_EDITADO_SUCESSO, SUCESSO);
    if (toast) {
      this.router.navigate([ALBUNS_LISTAR_TODOS]);
    }
  }

  processarFalha(fail: any) {
    this.loader.hide();
    this.errors = fail?.error?.errors || [];
    this.toastr.error(OCORREU_UM_ERRO, OPA);
  }
}
