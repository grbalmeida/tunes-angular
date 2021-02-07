import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DownloadService } from 'src/app/services/download.service';
import { Funcionario } from '../models/funcionario';
import { FuncionarioFiltro } from '../models/funcionario-filtro';
import { FuncionarioService } from '../services/funcionario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public funcionarios: Funcionario[];
  gerentes: Funcionario[] = [];
  funcionarioFiltro: FormGroup;
  errorMessage: string;

  constructor(
    private funcionarioService: FuncionarioService,
    private downloadService: DownloadService,
    private loader: NgxSpinnerService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loader.show();

    this.obterTodos();
    this.preencherCombos();

    this.funcionarioFiltro = this.fb.group({
      primeiroNome: [''],
      sobrenome: [''],
      titulo: [''],
      dataNascimento: [''],
      dataAdmissao: [''],
      endereco: [''],
      cidade: [''],
      estado: [''],
      pais: [''],
      cep: [''],
      fone: [''],
      fax: [''],
      email: [''],
      gerenteId: ['']
    })
  }

  filtrar(): void {
    const funcionarioFiltro = this.funcionarioFiltro.value as FuncionarioFiltro;

    this.funcionarioService.filtro(funcionarioFiltro)
      .subscribe(
        funcionarios => this.funcionarios = funcionarios,
        error => this.errorMessage,
        () => this.loader.hide()
      )
  }

  obterTodos(): void {
    this.funcionarioService.obterTodos()
      .subscribe(
        funcionarios => this.funcionarios = funcionarios,
        error => this.errorMessage,
        () => this.loader.hide()
      );
  }

  preencherCombos(): void {
    this.funcionarioService.obterTodos()
      .subscribe(
        gerentes => this.gerentes = gerentes,
        error => this.errorMessage,
        () => this.loader.hide()
      );
  }

  excel(): void {
    const funcionarioFiltro = this.funcionarioFiltro.value as FuncionarioFiltro;

    this.loader.show();

    this.funcionarioService.excel(funcionarioFiltro)
      .subscribe(
        excel => this.downloadService.download(excel, 'funcionarios.xlsx'),
        error => this.errorMessage,
        () => this.loader.hide()
      )
  }

  limparFiltro(): void {
    this.funcionarioFiltro.reset();
    this.obterTodos();
  }
}
