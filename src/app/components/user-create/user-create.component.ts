import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ){
    this.buildForm();
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      age: [null, [Validators.required]],
      birth: [null, [Validators.required]],
    });
  }

  createUser(){
    if(this.form.valid){
      const dto = {...this.form.value, birth: this.userService.birthDto(this.form.get('birth')?.value)};
      this.userService.addUser(dto);
    } else{
      this.form.markAllAsTouched();
    }
  }

  get nameForm(){
    return this.form.get('name');
  }
  get lastNameForm(){
    return this.form.get('lastname');
  }
  get ageForm(){
    return this.form.get('age');
  }
  get birthForm(){
    return this.form.get('birth');
  }
}
