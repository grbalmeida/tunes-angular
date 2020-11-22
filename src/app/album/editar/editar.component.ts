import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AlbumService } from '../services/album.service';
import { AlbumFormBaseComponent } from '../album-form.base.component';
import { Artista } from 'src/app/artista/models/artista';

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
    private toastr: ToastrService
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

    const toast = this.toastr.success('Álbum editado com sucesso!', 'Sucesso!');
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
