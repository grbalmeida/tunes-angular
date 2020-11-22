import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { FaixaService } from '../services/faixa.service';
import { Faixa } from '../models/faixa';
import { NgxSpinnerService } from 'ngx-spinner';
import { FAIXAS_LISTAR_TODOS } from 'src/app/shared/routes';
import { FAIXA_EXCLUIDA_SUCESSO, GOOD_BYE, HOUVE_ERRO_PROCESSAMENTO, OPA } from 'src/app/shared/messages';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent  {

  faixa: Faixa;

  constructor(
    private faixaService: FaixaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {

    this.faixa = this.route.snapshot.data.faixa;
  }

  public excluirFaixa() {
    this.loader.show();

    this.faixaService.excluirFaixa(this.faixa.faixaId).subscribe(
      evento => { this.sucessoExclusao(evento); },
      error    => { this.falha(error); }
    );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success(FAIXA_EXCLUIDA_SUCESSO, GOOD_BYE);

    this.loader.hide();

    if (toast) {
      this.router.navigate([FAIXAS_LISTAR_TODOS]);
    }
  }

  public falha(e) {
    this.loader.hide();
    this.toastr.error(e?.error?.errors[0] || HOUVE_ERRO_PROCESSAMENTO, OPA);
  }
}
