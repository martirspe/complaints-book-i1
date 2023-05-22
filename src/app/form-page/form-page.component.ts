import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services & interfaces
import { ClaimsService } from '../services/claims.service';
import { ClaimInterface } from '../interfaces/claimInterface';
import { UsersService } from '../services/users.service';
import { UserInterface } from '../interfaces/userInterface';
import { ClaimDetailsInterface } from '../interfaces/claimDetailsInterface';
import { ClaimsDetailsService } from '../services/claimDetails.service';
import { SendEmailService } from '../services/email/email.service';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent {
  num_reclamo: number = 1;
  menor: boolean = false;
  c_type: boolean = false;
  fSend: boolean = false;

  constructor(
    private fb: FormBuilder,
    private claimsService: ClaimsService,
    private claimDetailsService: ClaimsDetailsService,
    private usersService: UsersService,
    private sendEmailService: SendEmailService
  ) { }

  public myForm: FormGroup = this.fb.group({
    tipo_doc: ['DNI', [Validators.required]],
    num_doc: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]+')]],
    nombres: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
    apellidos: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
    celular: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]+')]],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    direccion: ['', [Validators.required, Validators.minLength(25)]],
    apoderado: ['', [Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
    tipo_bien: [1, [Validators.required]],
    monto: ['', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(100)]],
    tipo_reclamo: [1, [Validators.required]],
    detalles: ['', [Validators.required, Validators.minLength(50)]],
    pedido: ['', [Validators.required, Validators.minLength(100)]],
    adjunto: [''],
    terminos: ['', Validators.requiredTrue],
  });

  menor_edad(): void {
    this.menor = !this.menor;
    // console.log(this.menor);
  }

  claim_type(): void {
    this.c_type = !this.c_type;
    // console.log(this.c_type);
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }
  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es obligatorio.'
        case 'minlength':
          return `Se requiere ${errors['minlength'].requiredLength} carácteres como mínimo.`
        case 'maxlength':
          return `Se requiere ${errors['maxlength'].requiredLength} carácteres como máximo.`
        case 'pattern':
          return 'Este campo contiene carácteres no permitidos.'
        case 'email':
          return 'No cumple con la estructura de un correo válido.'
      }
      // console.log(key);
    }
    return 'Fuera de validación'
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    // Almacenando datos de usuarios.
    const users: UserInterface = {
      tipo_documento: this.myForm.get('tipo_doc')?.value,
      num_documento: this.myForm.get('num_doc')?.value,
      nombres: this.myForm.get('nombres')?.value,
      apellidos: this.myForm.get('apellidos')?.value,
      email: this.myForm.get('email')?.value,
      celular: this.myForm.get('celular')?.value,
      direccion: this.myForm.get('direccion')?.value,
      menor_edad: this.menor,
      apoderado: this.myForm.get('apoderado')?.value,
      id_tipo_usuario: 2,
    }

    // Almacenando Ids para los reclamos.
    const claims: ClaimInterface = {
      id_tipo_reclamo: this.myForm.get('tipo_reclamo')?.value,
      id_detalle: this.num_reclamo,
      id_usuario: this.num_reclamo,
      id_tipo_bien: this.myForm.get('tipo_bien')?.value,
    }

    // Almacenando detalles de los reclamos.
    const claimDetails: ClaimDetailsInterface = {
      monto_reclamado: this.myForm.get('monto')?.value,
      descripcion: this.myForm.get('descripcion')?.value,
      detalles_reclamo: this.myForm.get('detalles')?.value,
      pedido: this.myForm.get('pedido')?.value,
      documento_adjunto: this.myForm.get('adjunto')?.value,
      id_reclamo: this.num_reclamo
    }

    //Insertar usuario
    const user = this.usersService.postUser(users).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    )

    // Guardar reclamo
    this.claimsService.postClaim(claims).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    )

    // Guardar detalle del reclamo
    this.claimDetailsService.postClaimDetails(claimDetails).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    )

    console.log(this.myForm.value);
    this.myForm.reset({ tipo_doc: 'DNI', tipo_bien: 1, tipo_reclamo: 1 });
    this.fSend = true;
    this.num_reclamo++;

    setTimeout(() => {
      this.fSend = false;
    }, 3000);

    // Enviar correo
    this.sendEmailService.postSendMail(this.myForm.value).subscribe(res => {
      console.log(res);
    },
      err => console.error(err))
  }

}
