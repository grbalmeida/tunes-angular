import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../models/funcionario';
import { FuncionarioService } from '../services/funcionario.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public funcionarios: Funcionario[];
  errorMessage: string;

  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.funcionarioService.obterTodos()
      .subscribe(
        funcionarios => this.funcionarios = funcionarios,
        error => this.errorMessage
      );
  }
}
