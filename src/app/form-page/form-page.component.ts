import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClaimService } from '../services/claim.service';
import { ClaimInterface } from '../interfaces/claimInterface';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent {
  num_reclamo: number = 1;
  menor: boolean = false;
  c_type: boolean = false;

  constructor(private fb: FormBuilder, private claimService: ClaimService) { }

  ngOnInit() {
    // this.claimService.getClaims().subscribe(
    //   res => {
    //     this.claim = res;
    //   },
    //   err => console.error(err)
    // )
  }

  public myForm: FormGroup = this.fb.group({
    tipo_doc: ['DNI', [Validators.required]],
    num_doc: ['70555248', [Validators.required, Validators.minLength(8), Validators.pattern('[0-9]+')]],
    nombres: ['Noé Martín', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
    apellidos: ['Rojas Soplín', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
    celular: ['938360044', [Validators.required, Validators.minLength(9), Validators.pattern('[0-9]+')]],
    email: ['rosonoem@gmail.com', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    direccion: ['Av. Marginal 145, Salamanca Ate, Lima', [Validators.required, Validators.minLength(30)]],
    apoderado: ['Filonila Mayela Soplín Valdivia', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
    tipo_bien: ['Producto', [Validators.required]],
    monto: ['200', [Validators.required]],
    descripcion: ['Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', [Validators.required, Validators.minLength(150)]],
    tipo_reclamo: ['Queja', [Validators.required]],
    detalles: ['Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', [Validators.required, Validators.minLength(150)]],
    pedido: ['Contrary to popular belief, Lorem Ipsum is not simply random text.', [Validators.required, Validators.minLength(50)]],
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

    console.log(this.myForm.value);
    this.myForm.reset({ tipo_doc: 'DNI', tipo_bien: 'Producto', tipo_reclamo: 'Queja' });
    this.num_reclamo++;

    // console.log(this.myForm.get('tipo_reclamo')?.value,)

    const claim: ClaimInterface = {
      id_tipo_reclamo: this.myForm.get('tipo_reclamo')?.value,
      id_detalle: this.myForm.get('tipo_reclamo')?.value,
      id_usuario: this.myForm.get('tipo_reclamo')?.value,
      id_tipo_bien: this.myForm.get('tipo_reclamo')?.value,
      estado: this.myForm.get('tipo_reclamo')?.value,
    }
    // this.claimService.postClaim(this.claim).subscribe(
    //   res => {
    //     console.log(res);
    //   },
    //   err => console.error(err)
    // )
    // // console.log(this.claim);
  }

}
