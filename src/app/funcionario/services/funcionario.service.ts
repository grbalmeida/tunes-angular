import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { Funcionario } from '../models/funcionario';
import { FuncionarioFiltro } from '../models/funcionario-filtro';

@Injectable()
export class FuncionarioService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  obterTodos(): Observable<Funcionario[]> {
    return this.filtro({
      cep: '',
      cidade: '',
      dataAdmissao: null,
      dataNascimento: null,
      email: '',
      endereco: '',
      estado: '',
      fax: '',
      fone: '',
      gerenteId: 0,
      pais: '',
      primeiroNome: '',
      sobrenome: '',
      titulo: ''
    });
  }

  filtro(filtro: FuncionarioFiltro): Observable<Funcionario[]> {
    const params = new HttpParams({
      fromObject: {
        primeiroNome: filtro.primeiroNome ?? '',
        sobrenome: filtro.sobrenome ?? '',
        titulo: filtro.titulo ?? '',
        dataNascimento: filtro.dataNascimento ? filtro.dataNascimento.toString() : '',
        dataAdmissao: filtro.dataAdmissao ? filtro.dataAdmissao.toString() : '',
        endereco: filtro.endereco ?? '',
        cidade: filtro.cidade ?? '',
        estado: filtro.estado ?? '',
        pais: filtro.pais ?? '',
        cep: filtro.cep ?? '',
        fone: filtro.fone ?? '',
        fax: filtro.fax ?? '',
        email: filtro.email ?? '',
        gerenteId: filtro.gerenteId ? filtro.gerenteId.toString() : ''
      }
    });

    return this.http
      .get<Funcionario[]>(this.UrlServiceV2 + 'funcionarios',
      {
        ...super.ObterAuthHeaderJson(),
        params
      })
      .pipe(catchError(super.serviceError)) as Observable<Funcionario[]>;
  }

  excel(filtro: FuncionarioFiltro): Observable<Blob> {
    const params = new HttpParams({
      fromObject: {
        primeiroNome: filtro.primeiroNome ?? '',
        sobrenome: filtro.sobrenome ?? '',
        titulo: filtro.titulo ?? '',
        dataNascimento: filtro.dataNascimento ? filtro.dataNascimento.toString() : '',
        dataAdmissao: filtro.dataAdmissao ? filtro.dataAdmissao.toString() : '',
        endereco: filtro.endereco ?? '',
        cidade: filtro.cidade ?? '',
        estado: filtro.estado ?? '',
        pais: filtro.pais ?? '',
        cep: filtro.cep ?? '',
        fone: filtro.fone ?? '',
        fax: filtro.fax ?? '',
        email: filtro.email ?? '',
        gerenteId: filtro.gerenteId ? filtro.gerenteId.toString() : ''
      }
    });

    return this.http
      .get<Blob>(this.UrlServiceV2 + 'funcionarios/excel',
      {
        ...super.ObterAuthHeaderJson(),
        responseType: 'blob' as 'json',
        params
      })
      .pipe(catchError(super.serviceError)) as Observable<Blob>;
  }

  obterPorId(id: number): Observable<Funcionario> {
    return this.http
      .get<Funcionario>(this.UrlServiceV1 + 'funcionarios/' + id, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  novoFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http
      .post(this.UrlServiceV1 + 'funcionarios', funcionario, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  atualizarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http
      .put(this.UrlServiceV1 + 'funcionarios/' + funcionario.funcionarioId, funcionario, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  excluirFuncionario(id: number): Observable<Funcionario> {
    return this.http
      .delete(this.UrlServiceV1 + 'funcionarios/' + id, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }
}
