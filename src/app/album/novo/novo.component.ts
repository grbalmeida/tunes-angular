import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AlbumService } from '../services/album.service';
import { AlbumFormBaseComponent } from '../album-form.base.component';
import { Artista } from 'src/app/artista/models/artista';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends AlbumFormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  artistas: Artista[] = [];

  constructor(
    private fb: FormBuilder,
    private albumService: AlbumService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit(): void {

    this.albumForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(160)]],
      artistaId: ['', [Validators.required]]
    });

    this.artistas = this.route.snapshot.data.artistas;
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarAlbum() {
    if (this.albumForm.dirty && this.albumForm.valid) {
      const artistaId = Number(this.albumForm.get('artistaId').value);
      this.album = { ...this.album, artista: this.artistas.find(a => a.artistaId === artistaId) };
      this.album = Object.assign({}, this.album, this.albumForm.value);

      this.albumService.novoAlbum(this.album)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso); },
          falha => { this.processarFalha(falha); }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.albumForm.reset();
    this.errors = [];

    const toast = this.toastr.success('Álbum cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/albuns/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail?.error?.errors || [];
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
