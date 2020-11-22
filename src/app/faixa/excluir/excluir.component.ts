import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { FaixaService } from '../services/faixa.service';
import { Faixa } from '../models/faixa';
import { NgxSpinnerService } from 'ngx-spinner';

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
      ()     => { this.falha(); }
    );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Faixa excluída com Sucesso!', 'Good bye :D');

    this.loader.hide();

    if (toast) {
      this.router.navigate(['/faixas/listar-todos']);
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
