import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { GeneroService } from '../services/genero.service';
import { Genero } from '../models/genero';
import { NgxSpinnerService } from 'ngx-spinner';
import { GENEROS_LISTAR_TODOS } from 'src/app/shared/routes';
import { GENERO_EXCLUIDO_SUCESSO, GOOD_BYE, HOUVE_ERRO_PROCESSAMENTO, OPA } from 'src/app/shared/messages';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent  {

  genero: Genero;

  constructor(
    private generoService: GeneroService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {

    this.genero = this.route.snapshot.data.genero;
  }

  public excluirGenero() {
    this.loader.show();

    this.generoService.excluirGenero(this.genero.generoId).subscribe(
      evento => { this.sucessoExclusao(evento); },
      error     => { this.falha(error); }
    );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success(GENERO_EXCLUIDO_SUCESSO, GOOD_BYE);

    this.loader.hide();

    if (toast) {
      this.router.navigate([GENEROS_LISTAR_TODOS]);
    }
  }

  public falha(e) {
    this.loader.hide();
    this.toastr.error(e?.error?.errors[0] || HOUVE_ERRO_PROCESSAMENTO, OPA);
  }
}
