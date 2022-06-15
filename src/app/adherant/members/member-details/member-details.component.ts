import { Component, OnInit } from '@angular/core';
import {MemberFormService} from "../member-form.service";
import {Member} from "../../../model/member";
import {Table} from "primeng/table";
import {MessageService} from "primeng/api";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {CommonModel} from "../../../model/CommonModel";

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
  providers: [MessageService]
})
export class MemberDetailsComponent implements OnInit {

  public member: Member;
  private mandatoryFields: string[];

  formErrors: boolean = false;
  errorField: string;
  errorFields: string[] = [];
  errorMessages: ErrorMessage[] = [];
  entityData: InsertData | any;

  prenoms: string;
  prenomsValue: string;
  nom: string;
  nomValue: string;
  situationFamiliale: string;
  commentaires: any;
  profession: any;
  city: any;
  address: any;
  category: any;
  email: any;
  phone: any;
  quartier: any;
  formula: any;
  secteur: any;
  existJuridiq: any;
  refIdentite: any;
  selectedDocs: any;
  categories: CommonModel[];
  formulas: CommonModel[];
  secteurs: CommonModel[];

  constructor(private route: ActivatedRoute,
              private messageService: MessageService,
              private formBuilder: FormBuilder,
              private memberFormService: MemberFormService) {
    console.log("<<<<<<<<< B");
  }

  ngOnInit(): void {
    console.log("<<<<<<<<< A");
    this.mandatoryFields = ["nom", "prenoms", "situationFamiliale"];

    // First get the application id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const memberid = Number(routeParams.get('id'));
    this.getApplication(memberid);
    this.loadCategories();
    this.loadSecteurs();
    this.loadFormulas();
  }

  getApplication(applicationId: number) {
    // Find the product that correspond with the id provided in route.
    this.memberFormService.getMemberDetail(applicationId).subscribe({
      next: value => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        console.log(value);
        this.member = value;
        //this.changeDetectorRef.markForCheck()
      }
    })
  }


  private loadCategories() {
    console.log("<<<<<<<<< C");
    this.memberFormService.getAllCategories().subscribe({
      next: value => {
        console.log(value);
        this.categories = value;
        //this.dt.reset();
      }
    });
  }

  private loadFormulas() {
    console.log("<<<<<<<<< D");
    this.memberFormService.getAllFormulas().subscribe({
      next: value => {
        console.log(value);
        this.formulas = value;
        //this.dt.reset();
      }
    });
  }

  private loadSecteurs() {
    console.log("<<<<<<<<< E");
    this.memberFormService.getAllSecteurs().subscribe({
      next: value => {
        console.log(value);
        this.secteurs = value;
        //this.dt.reset();
      }
    });
  }

  // Données du formulaire
  formMember = this.formBuilder.group({
    nom: '',
    prenoms: '',
    situationFamiliale: '',
    commentaires: '',
    profession: '',
    city: '',
    address: '',
    category: '',
    email: '',
    phone: '',
    quartier: '',
    formula: '',
    existJuridiq: '',
    refIdentite: '',
    selectedDocs: '',
    secteur: ''
  });


  onSubmit(): void {
    // Process search form values
    //this.items = this.cartService.clearCart();

    for (const field of this.mandatoryFields) {
      if ((this.formMember.value[field] == undefined) || (this.formMember.value[field] == '')) {
        this.formErrors = true;
        this.errorFields.push(field);
        this.errorField = this.formMember.value[field];
        this.errorMessages.push({severity: 'error', summary: 'Service Message', detail: field + ' ne peut être vide.'})
        console.log("--- formMember " + this.formMember.value[field] + " ** " + field);
      }
    }

    console.log("BOURSE nom " + this.formMember.value.nom);
    console.log("BOURSE prenoms " + this.formMember.value.prenoms);
    console.log("BOURSE situationFamiliale " + this.formMember.value.situationFamiliale);

    if (this.formErrors) {
      console.log(" HERE ARE ERRORS FIELDS -- " + this.errorMessages);
      this.addMultiple(this.errorMessages);
      this.errorMessages = [];
    } else {

      this.entityData = {};
      console.log("BOURSE CREATE " + this.formMember.value.nom);

      // Set value from search from
      this.entityData.nom = this.formMember.value.nom;
      this.entityData.prenoms = this.formMember.value.prenoms;
      this.entityData.situationFamiliale = this.formMember.value.situationFamiliale;
      this.entityData.profession = this.formMember.value.profession;
      this.entityData.phone = this.formMember.value.phone;
      this.entityData.quartier = this.formMember.value.quartier;
      this.entityData.email = this.formMember.value.email;
      this.entityData.category = this.formMember.value.category;
      this.entityData.address = this.formMember.value.address;
      this.entityData.city = this.formMember.value.city;
      this.entityData.commentaires = this.formMember.value.commentaires;
      this.entityData.formula = this.formMember.value.formula;
      this.entityData.secteur = this.formMember.value.secteur;
      this.entityData.refIdentite = this.formMember.value.refIdentite;
      this.entityData.existJuridiq = this.formMember.value.existJuridiq;
      this.entityData.selectedDocs = this.formMember.value.selectedDocs;

      this.formMember.reset();
      console.warn('Your data has been submitted', this.entityData);
      //Run search and Get results
      this.memberFormService.addMember(this.entityData).subscribe({
        next: value => {
          console.log("Bourse created :: " + value.nom);
          this.addMultiple([{severity: 'success', summary: 'Succès', detail: value.nom + ' a été créée.'}]);
          //this.getHeroes();
        },
        error: err => {
          this.addMultiple([{severity: 'error', summary: 'Echec', detail: err.error.message}])
        }
      });
    }

  }

  addMultiple(errors: ErrorMessage[]) {
    this.messageService.addAll(errors);
  }

  clear() {
    this.messageService.clear();
  }

  clearTable(table: Table) {
    table.clear();
  }

}

interface InsertData {
  nom: string,
  prenoms: string,
  situationFamiliale: string,
}

interface  TypeSelectBox {
  name: string,
  code: any
}

interface  CampagneSelectBox {
  name: string,
  code: any,
  inactive: boolean
}

interface ErrorMessage {
  severity: string,
  summary: string,
  detail: string
}
