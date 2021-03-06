import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { PlaylistService } from '../services/playlist.service';
import { PlaylistFormBaseComponent } from '../playlist-form.base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { PLAYLISTS_LISTAR_TODOS } from 'src/app/shared/routes';
import { OCORREU_UM_ERRO, OPA, PLAYLIST_EDITADA_SUCESSO, SUCESSO } from 'src/app/shared/messages';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends PlaylistFormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {
    super();

    this.playlist = this.route.snapshot.data.playlist;
  }

  ngOnInit(): void {

    this.playlistForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(120)]]
    });

    this.playlistForm.patchValue({
      nome: this.playlist.nome
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  editarPlaylist() {
    if (this.playlistForm.dirty && this.playlistForm.valid) {
      this.loader.show();

      this.playlist = Object.assign({}, this.playlist, this.playlistForm.value);

      this.playlistService.atualizarPlaylist(this.playlist)
        .subscribe(
          sucesso => { this.processarSucesso(); },
          falha => { this.processarFalha(falha); }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso() {
    this.playlistForm.reset();
    this.errors = [];

    const toast = this.toastr.success(PLAYLIST_EDITADA_SUCESSO, SUCESSO);

    this.loader.hide();

    if (toast) {
      this.router.navigate([PLAYLISTS_LISTAR_TODOS]);
    }
  }

  processarFalha(fail: any) {
    this.loader.hide();
    this.errors = fail?.error?.errors || [];
    this.toastr.error(OCORREU_UM_ERRO, OPA);
  }
}
