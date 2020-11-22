import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { TipoMidiaService } from '../services/tipo-midia.service';
import { TipoMidia } from '../models/tipo-midia';
import { NgxSpinnerService } from 'ngx-spinner';
import { TIPOS_DE_MIDIA_LISTAR_TODOS } from 'src/app/shared/routes';
import { GOOD_BYE, HOUVE_ERRO_PROCESSAMENTO, OPA, TIPO_MIDIA_EXCLUIDO_SUCESSO } from 'src/app/shared/messages';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent  {

  tipoMidia: TipoMidia;

  constructor(
    private tipoMidiaService: TipoMidiaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {

    this.tipoMidia = this.route.snapshot.data.tipoMidia;
  }

  public excluirTipoMidia() {
    this.loader.show();

    this.tipoMidiaService.excluirTipoMidia(this.tipoMidia.tipoMidiaId).subscribe(
      evento => { this.sucessoExclusao(evento); },
      error     => { this.falha(error); }
    );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success(TIPO_MIDIA_EXCLUIDO_SUCESSO, GOOD_BYE);

    this.loader.hide();

    if (toast) {
      this.router.navigate([TIPOS_DE_MIDIA_LISTAR_TODOS]);
    }
  }

  public falha(e) {
    this.loader.hide();
    this.toastr.error(e?.error?.errors[0] || HOUVE_ERRO_PROCESSAMENTO, OPA);
  }
}
