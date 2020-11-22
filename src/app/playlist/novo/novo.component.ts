import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { PlaylistService } from '../services/playlist.service';
import { PlaylistFormBaseComponent } from '../playlist-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends PlaylistFormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService,
    private router: Router,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit(): void {

    this.playlistForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(120)]]
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarPlaylist() {
    if (this.playlistForm.dirty && this.playlistForm.valid) {
      this.playlist = Object.assign({}, this.playlist, this.playlistForm.value);

      this.playlistService.novaPlaylist(this.playlist)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso); },
          falha => { this.processarFalha(falha); }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.playlistForm.reset();
    this.errors = [];

    const toast = this.toastr.success('Playlist cadastrada com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/playlists/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail?.error?.errors || [];
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
