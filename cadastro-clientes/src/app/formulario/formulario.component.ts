import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  clienteForm: FormGroup;

  @Output() clienteAdicionado = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, this.validarCPF]],
      dataNascimento: ['', Validators.required]
    });
  }

  validarCPF(control: any) {
    const cpf = control.value;
    if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
      return { cpfInvalido: true };
    }
    return null;
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      this.clienteAdicionado.emit(this.clienteForm.value);
      this.clienteForm.reset();
    }
  }
}
