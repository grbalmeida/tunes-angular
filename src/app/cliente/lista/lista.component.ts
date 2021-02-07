import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DownloadService } from 'src/app/services/download.service';
import { Cliente } from '../models/cliente';
import { ClienteFiltro } from '../models/cliente-filtro';
import { ClienteService } from '../services/cliente.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public clientes: Cliente[];
  clienteFiltro: FormGroup;
  errorMessage: string;

  constructor(
    private clienteService: ClienteService,
    private downloadService: DownloadService,
    private loader: NgxSpinnerService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loader.show();

    this.obterTodos();
    this.clienteFiltro = this.fb.group({
      primeiroNome: [''],
      sobrenome: [''],
      empresa: [''],
      endereco: [''],
      cidade: [''],
      estado: [''],
      pais: [''],
      cep: [''],
      fone: [''],
      fax: [''],
      email: ['']
    })
  }

  filtrar(): void {
    const clienteFiltro = this.clienteFiltro.value as ClienteFiltro;

    this.clienteService.filtro(clienteFiltro)
      .subscribe(
        clientes => this.clientes = clientes,
        error => this.errorMessage,
        () => this.loader.hide()
      )
  }

  obterTodos(): void {
    this.clienteService.obterTodos()
      .subscribe(
        clientes => this.clientes = clientes,
        error => this.errorMessage,
        () => this.loader.hide()
      );
  }

  excel(): void {
    const clienteFiltro = this.clienteFiltro.value as ClienteFiltro;

    this.loader.show();

    this.clienteService.excel(clienteFiltro)
      .subscribe(
        excel => this.downloadService.download(excel, 'clientes.xlsx'),
        error => this.errorMessage,
        () => this.loader.hide()
      )
  }

  limparFiltro(): void {
    this.clienteFiltro.reset();
    this.obterTodos();
  }
}
