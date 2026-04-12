import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserActions } from '../../store/user.actions';
import { selectSaving, selectError } from '../../store/user.selectors';
import { UserDialogData, UserFormData, PhoneType } from '../../../../shared/models/user.model';
import { InputMaskDirective } from '../../../../shared/directives/input-mask.directive';
import { cpfValidator } from '../../../../shared/validators/cpf.validator';

type UserFormControls = {
  email: FormControl<UserFormData['email']>;
  name: FormControl<UserFormData['name']>;
  cpf: FormControl<UserFormData['cpf']>;
  phone: FormControl<UserFormData['phone']>;
  phoneType: FormControl<UserFormData['phoneType']>;
};

@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    InputMaskDirective,
  ],
  templateUrl: './user-form-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormDialogComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly dialogRef = inject(MatDialogRef<UserFormDialogComponent>);
  readonly dialogData = inject<UserDialogData>(MAT_DIALOG_DATA);

  readonly saving = toSignal(this.store.select(selectSaving), { initialValue: false });
  readonly storeError = toSignal(this.store.select(selectError), { initialValue: null });

  readonly phoneTypes: PhoneType[] = ['CELULAR', 'RESIDENCIAL', 'COMERCIAL'];

  readonly form: FormGroup<UserFormControls> = new FormGroup<UserFormControls>({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    cpf: new FormControl('', { nonNullable: true, validators: [Validators.required, cpfValidator] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
    phoneType: new FormControl('CELULAR', { nonNullable: true, validators: [Validators.required] }),
  });

  get isEditMode(): boolean {
    return this.dialogData.user !== null;
  }

  get email(): FormControl<UserFormData['email']> {
    return this.form.controls.email;
  }

  get name(): FormControl<UserFormData['name']> {
    return this.form.controls.name;
  }

  get cpf(): FormControl<UserFormData['cpf']> {
    return this.form.controls.cpf;
  }

  get phone(): FormControl<UserFormData['phone']> {
    return this.form.controls.phone;
  }

  get phoneType(): FormControl<UserFormData['phoneType']> {
    return this.form.controls.phoneType;
  }

  ngOnInit(): void {
    if (this.isEditMode && this.dialogData.user) {
      const { email, name, cpf, phone, phoneType } = this.dialogData.user;
      this.form.patchValue({ email, name, cpf, phone, phoneType });
    }
  }

  onSave(): void {
    if (this.form.invalid) return;

    const formData = this.form.getRawValue() as UserFormData;

    if (this.isEditMode && this.dialogData.user) {
      this.store.dispatch(
        UserActions.updateUser({ id: this.dialogData.user.id, data: formData })
      );
    } else {
      this.store.dispatch(UserActions.createUser({ data: formData }));
    }

    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}