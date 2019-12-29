import { Component, OnInit, AfterViewChecked, NgModule } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { memberData } from './memberData';
import { OverlayService } from 'src/app/overlay.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';


declare let paypal: any;
@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {

  addScript: boolean = false;
  paypalLoad: boolean = true;
  finalAmount: number = 1;
  radioChoice: number = 0;
  checked: 'No';

  myForm: FormGroup;
  myFormA: FormGroup;
  submitted = false;
  submittedA = false;

  DSYesNO(value) {
    if (value == "1") {
      this.radioChoice = 1;
    } else
      this.radioChoice = 0;
  }

  title: FormControl;
  fName: FormControl;
  lName: FormControl;
  DOB: FormControl;
  postalAddress: FormControl;
  suburb: FormControl;
  state: FormControl;
  postcode: FormControl;

  phoneNumber: FormControl;
  email: FormControl;
  training: FormControl;
  dogName: FormControl;
  dogBreed: FormControl;
  trainingProvider: FormControl;
  dogOtherDisability: FormControl;

  workForOtherOrganisation: FormControl;
  organisation: FormControl;
  organisationPosition: FormControl;
  //Associate member
  titleA: FormControl;
  fNameA: FormControl;
  lNameA: FormControl;
  DOBA: FormControl;
  postalAddressA: FormControl;
  suburbA: FormControl;
  stateA: FormControl;
  postcodeA: FormControl;
  phoneNumberA: FormControl;
  emailA: FormControl;




  /* Paypal Connection */
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: '<your-sandbox-key-here>',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'INR' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
      })
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }


  model = new memberData("", "", "", null, "", "", "", "", "", "", "", "", "", "", "", "", "");

  // creating the list of variables used in the membership form
  public membershipTypeValue = '';
  public titleValue = '';
  public fNameValue = '';
  public lNameValue = '';
  public DOBValue = '';
  public postalAddressValue = '';
  public suburbValue = '';
  public stateValue = '';
  public postCodeValue = '';
  public phoneNumberValue = '';
  public emailValue = '';
  public trainingValue = '';
  public dogNameValue = '';
  public dogBreedValue = '';
  public trainingProviderValue = '';
  public dogOtherDisabilityValue = '';
  public workForOtherOrganisationValue = '';
  public organisationValue = '';
  public organisationPositionValue = '';

  // creats a obersable where it is later used to store the membership data from the firebase
  memberships: Observable<any[]>;

  // gets membership data from firebase and inputs it into the membership observable
  constructor(public db: AngularFireDatabase, private registerDialog: OverlayService, private formBuilder: FormBuilder) {
    this.memberships = db.list('memberships').valueChanges();

  }
  get f() { return this.myForm.controls; }
  get A() { return this.myFormA.controls; }
  // on form submission, gets and sends all form varaibles to the database using an update function
  //

  onSubmitA() {

    this.submittedA = true;
    if (this.myFormA.invalid) {

      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.myFormA.value, null, 4));

    const memberRef = this.db.list('memberships/associate');


    // categorises memberships by the membership type, then uses the inputed phone number as the unique id
    // possible issue where same number can be used with both membership types

    memberRef.push(
      {
        membershipType: 'associate',
        titleA: this.myFormA.value.titleA,
        fNameA: this.myFormA.value.fNameA,
        lNameA: this.myFormA.value.lNameA,
        DOBA: this.myFormA.value.DOBA,
        postalAddressA: this.myFormA.value.postalAddressA,
        suburbA: this.myFormA.value.suburbA,
        stateA: this.myFormA.value.stateA,
        postcodeA: this.myFormA.value.postcodeA,
        phoneNumberA: this.myFormA.value.phoneNumberA,
        emailA: this.myFormA.value.emailA,
      });

  }
  onSubmit() {

    ('onSubmitB called')
    this.submitted = true;
    if (this.myForm.invalid) {
      ('invalid')
      return;
    }

    const memberRef = this.db.list('memberships/full');
    // firebase can't accept '.' so this removes '.' and replaces it with '=' instead
    const emailNoDot = this.emailValue.replace('.', '=');

    // categorises memberships by the membership type, then uses the inputed phone number as the unique id
    // possible issue where same number can be used with both membership types

    memberRef.push(
      {
        membershipType: 'fullMember',
        title: this.myForm.value.title,
        fName: this.myForm.value.fName,
        lName: this.myForm.value.lName,
        DOB: this.myForm.value.DOB,
        postalAddress: this.myForm.value.postalAddress,
        suburb: this.myForm.value.suburb,
        state: this.myForm.value.state,
        postcode: this.myForm.value.postcode,
        phoneNumber: this.myForm.value.phoneNumber,
        email: this.myForm.value.email,
        training: this.myForm.value.training,
        dogName: this.myForm.value.dogName,
        dogBreed: this.myForm.value.dogBreed,
        trainingProvider: this.myForm.value.trainingProvider,
        dogOtherDisability: this.myForm.value.dogOtherDisability,
        workForOtherOrganisation: this.myForm.value.workForOtherOrganisation,
        organisation: this.myForm.value.organisation,
        organisationPostition: this.myForm.value.organisationPosition,

      });

  }
  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.createFormControlsA();
    this.createFormA();
  }

  createFormControlsA() {
    this.titleA = new FormControl("", Validators.required);
    this.fNameA = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z ][\sa-zA-Z ]*")]);
    this.lNameA = new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z ][\sa-zA-Z ]*")]);

    this.DOBA = new FormControl("", Validators.required);

    this.postalAddressA = new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9 ][\sa-zA-Z0-9 ]*")]);
    this.suburbA = new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z ][\sa-zA-Z ]*")]);
    this.stateA = new FormControl("", Validators.required);
    this.postcodeA = new FormControl("", [Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.pattern("[0-9]*")]);

    this.phoneNumberA = new FormControl("", [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[0-9]*")]);
    this.emailA = new FormControl('', [Validators.required, Validators.email]);

  }
  createFormA() {
    this.myFormA = this.formBuilder.group({
      titleA: this.titleA,
      fNameA: this.fNameA,
      lNameA: this.lNameA,
      DOBA: this.DOBA,
      postalAddressA: this.postalAddressA,
      suburbA: this.suburbA,
      stateA: this.stateA,
      postcodeA: this.postcodeA,
      phoneNumberA: this.phoneNumberA,
      emailA: this.emailA,
    })
  }


  createFormControls() {
    this.title = new FormControl("", Validators.required);
    this.fName = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z ][\sa-zA-Z ]*")]);
    this.lName = new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z ][\sa-zA-Z ]*")]);

    this.DOB = new FormControl("", Validators.required);

    this.postalAddress = new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9 ][\sa-zA-Z0-9 ]*")]);
    this.suburb = new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z ][\sa-zA-Z ]*")]);
    this.state = new FormControl("", Validators.required);
    this.postcode = new FormControl("", [Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.pattern("[0-9]*")]);

    this.phoneNumber = new FormControl("", [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[0-9]*")]);
    this.email = new FormControl('', [Validators.required, Validators.email]);

    this.training = new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z ][\sa-zA-Z ]*")]);
    this.dogName = new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z ][\sa-zA-Z ]*")]);
    this.dogBreed = new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z ][\sa-zA-Z ]*")]);
    this.trainingProvider = new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z ][\sa-zA-Z ]*")]);
    this.dogOtherDisability = new FormControl("", [Validators.pattern("^[a-zA-Z ][\sa-zA-Z ]*")]);

    this.workForOtherOrganisation = new FormControl("No");
    this.organisation = new FormControl("", [Validators.pattern("^[a-zA-Z][\sa-zA-Z ]*")]);
    this.organisationPosition = new FormControl("", [Validators.pattern("^[a-zA-Z ][\sa-zA-Z ]*")]);
  }
  createForm() {
    this.myForm = this.formBuilder.group({
      title: this.title,
      fName: this.fName,
      lName: this.lName,
      DOB: this.DOB,
      postalAddress: this.postalAddress,
      suburb: this.suburb,
      state: this.state,
      postcode: this.postcode,
      phoneNumber: this.phoneNumber,
      email: this.email,
      training: this.training,
      dogName: this.dogName,
      dogBreed: this.dogBreed,
      trainingProvider: this.trainingProvider,
      dogOtherDisability: this.dogOtherDisability,
      workForOtherOrganisation: this.workForOtherOrganisation,
      organisation: this.organisation,
      organisationPosition: this.organisationPosition,
    })
  }

}

