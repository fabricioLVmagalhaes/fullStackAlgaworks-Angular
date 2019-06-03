import { FormControl } from '@angular/forms';
import { Pessoa, Endereco } from './../../core/model';
import { PessoaService } from 'app/pessoas/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  constructor(
    private pessoaService: PessoaService,
    private erroHandlerService: ErrorHandlerService,
    private toastyService: ToastyService
  ) {  }

  pessoa = new Pessoa();
  

  ngOnInit() {
  }

  salvar(form: FormControl) {
    this.pessoaService.adcionar(this.pessoa)
      .then(()=> {
        this.toastyService.success('Pessoa Adicionada com Sucesso!');
        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro=> this.erroHandlerService.handle(erro));
  }

}
