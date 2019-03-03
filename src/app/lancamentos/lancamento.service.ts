import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
}

@Injectable()
export class LancamentoService {

  lancamentoUrl = 'http://localhost:8080/lancamentos';

  constructor(
    private http: Http
  ) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new Headers();
    const params = new URLSearchParams();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params.set('dataVencimentoDe',
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD')
      );
    }

    if (filtro.dataVencimentoFim) {
      params.set('dataVencimentoAte',
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD')
      );
    }

    return this.http.get(`${this.lancamentoUrl}?resumo`, { headers, search: params })
      .toPromise()
      .then(response => response.json().content)
  }

}
