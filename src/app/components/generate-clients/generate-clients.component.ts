import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate-clients',
  templateUrl: './generate-clients.component.html',
  styleUrl: './generate-clients.component.css'
})
export class GenerateClientsComponent {
  title = 'generateclients';
  clientForm: FormGroup;
  clientList: any[] = [];
  selectedIndex: number = -1;
  isEditMode: boolean = false;
  isSubmitMode: boolean = true;

  get name() {
    return this.clientForm.get('Name');
  }

  get contact() {
    return this.clientForm.get('Contact');
  }

  get address() {
    return this.clientForm.get('Address');
  }

  get email() {
    return this.clientForm.get('Email');
  }


  constructor(private formBuilder: FormBuilder) {
    this.clientForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      Contact: ['', [Validators.minLength(10), Validators.pattern('^[0-9]*$')]],
      Address: ['', [Validators.minLength(5)]],
      Email: ['', [Validators.required, Validators.email, Validators.pattern('.+@.+')]],

    });
  }
  ngOnInit(): void {
    let data = localStorage.getItem('clientList');
    this.clientList = JSON.parse(data || '[]');
  }
  submit() {
    console.log(this.clientForm.value);
    if (this.clientForm.valid) {
      if (this.isEditMode) {
        this.updateData();
      } else {
        this.addNewData();
      }
      this.clear();
    } else {
      alert('Invalid data, try again.');
    }
  }
  edit(i: number) {
    this.clientForm.patchValue({
      Name: this.clientList[i].Name,
      Contact: this.clientList[i].Contact,
      Address: this.clientList[i].Address,
      Email: this.clientList[i].Email,
    });
    this.selectedIndex = i;
    this.isEditMode = true;
    this.isSubmitMode = false;
  }
  updateData() {
    if (this.selectedIndex !== -1) {
      this.clientList[this.selectedIndex].Name = this.clientForm.value.Name;
      this.clientList[this.selectedIndex].Contact = this.clientForm.value.Contact;
      this.clientList[this.selectedIndex].Address = this.clientForm.value.Address;
      this.clientList[this.selectedIndex].Email = this.clientForm.value.Email;
      localStorage.setItem('clientList', JSON.stringify(this.clientList));
    }
    this.clearEditMode();
  }
  addNewData() {
    this.clientList.push(this.clientForm.value);
    localStorage.setItem('clientList', JSON.stringify(this.clientList));
  }
  clear() {
    this.clientForm.reset();
    this.clearEditMode();
  }
  clearEditMode() {
    this.selectedIndex = -1;
    this.isEditMode = false;
    this.isSubmitMode = true;
  }
  delete(i: number) {
    this.clientList.splice(i, 1);
    localStorage.setItem('clientList', JSON.stringify(this.clientList));
  }


}
