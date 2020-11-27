import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { NotaFiscalService } from '../services/nota-fiscal.service';
import { NotaFiscal } from '../models/nota-fiscal';
import { NgxSpinnerService } from 'ngx-spinner';
import { NOTAS_FISCAIS_LISTAR_TODOS } from 'src/app/shared/routes';
import { GOOD_BYE, HOUVE_ERRO_PROCESSAMENTO, OPA, NOTA_FISCAL_EXCLUIDA_SUCESSO } from 'src/app/shared/messages';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent  {

  notaFiscal: NotaFiscal;

  constructor(
    private notaFiscalService: NotaFiscalService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {

    this.notaFiscal = this.route.snapshot.data.notaFiscal;
  }

  public excluirNotaFiscal() {
    this.loader.show();

    this.notaFiscalService.excluirNotaFiscal(this.notaFiscal.notaFiscalId).subscribe(
      evento => { this.sucessoExclusao(evento); },
      error     => { this.falha(error); }
    );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success(NOTA_FISCAL_EXCLUIDA_SUCESSO, GOOD_BYE);

    this.loader.hide();

    if (toast) {
      this.router.navigate([NOTAS_FISCAIS_LISTAR_TODOS]);
    }
  }

  public falha(e) {
    this.loader.hide();
    this.toastr.error(e?.error?.errors[0] || HOUVE_ERRO_PROCESSAMENTO, OPA);
  }
}
