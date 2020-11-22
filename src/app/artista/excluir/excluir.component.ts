import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ArtistaService } from '../services/artista.service';
import { Artista } from '../models/artista';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent  {

  artista: Artista;

  constructor(
    private artistaService: ArtistaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {

    this.artista = this.route.snapshot.data.artista;
  }

  public excluirArtista() {
    this.artistaService.excluirArtista(this.artista.artistaId).subscribe(
      evento => { this.sucessoExclusao(evento); },
      ()     => { this.falha(); }
    );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Artista excluído com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/artistas/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
