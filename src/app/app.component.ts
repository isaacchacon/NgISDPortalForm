import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {TaxPeoplePickerComponent} from 'reactive-people-picker-angular-material';
import {IsdPortalBusiness} from './isd-portal-business';
import {SharepointListsWebService} from 'ng-tax-share-point-web-services-module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	thinking = false;
	isdPortalBusiness:IsdPortalBusiness;
	isdPortalData: FormGroup;
	FormTitle = "ISD Portal"
	divisionsArray= ["Audit","Budget and Fiscal","Business Tax","Chief Counsel","Chief Counsel - Bankruptcy",
	"Chief Counsel - Final Determinations","Commercial Activity Tax (CAT)","Compliance","Criminal Investigations Division",
	"Employment Tax","Estate Tax","Excise & Energy","Facilities Management","Human Resources","Income Tax",
	"Information Services","Internal Audit","Legislation","Organizational Development","Revenue Accounting",
	"Safety and Security","Sales and Use Tax","Tax Analysis","Tax Discovery","Tax Equalization",
	"Tax Processing and Data Capture","Tax Technical Training","Taxpayer Services"];
	locationsArray = ["Audit - In State","Audit - OOS","Enforcement","Northland Lower Level","SOCC","SOT 21",
	"Northland Level 1","Northland Level 2","Northland Level 3","SOT 22","Telecommuter"];
	serviceTypes: [string,string][]=
	[["Data, Query or Report","Data, Query or Report"],
	["Local Printer","Local Printer (Desktop) - Additional  Approval"],
	["Minor Change To Existing System","Minor Change To Existing System"],
	["Move Equipment","Move Equipment"],
	["Equipment","New Equipment"],
	["Security - Outlook","Outlook"],
	["Return Equipment","Return Equipment"],
	["Security - Access to Systems","Security - Access"],
	["Software","Software"],
	["Tax Alert","Tax Alert"],
	["Wireless Telecommunication","Wireless Telecommunication"],
	["Miscellaneous","Miscellaneous Only - NOT for Access to Systems or Websites"]
	];
	
	
	
	constructor(private fb:FormBuilder, private sharepointListsWebService:SharepointListsWebService){
		this.createForm();
		this.isdPortalBusiness = new IsdPortalBusiness(sharepointListsWebService);
	}
	
	createForm(){
		this.isdPortalData = this.fb.group({
			Administrator: TaxPeoplePickerComponent.buildItem(true),
			ID:{value: '', disabled:true },
			DateNeeded: [new Date(), Validators.required],
			Division:['', Validators.required],
			Location:['', Validators.required],
			SelectedService: ["", Validators.required],
			Status: "Requestor",
			Supervisor: TaxPeoplePickerComponent.buildItem(true),
			Requestor: "Gutierrez, Jorge",
			Requestor_SOUID: "ID\\10148122",	
		}
		);
	}
	
	onSubmit(){
		//implemented from : 
		//https://angular.io/guide/reactive-forms#save
		let formDictionary : [string, string][] = [];
		let dateNeeded:Date;
		this.thinking  = true;
		Object.keys(this.isdPortalData.controls).forEach(key => {
		//there is a chance to 'preprocess' items here, or skip them if need to.
			if(key.indexOf('Requestor')<0){
				if(key!="DateNeeded"){
					formDictionary.push([key,
					this.isdPortalData.get((key == "Administrator"|| key =="Supervisor")?key+".insideTextbox":key).value]);
				}else{
					dateNeeded = this.isdPortalData.get("DateNeeded").value;
					formDictionary.push([key,
					dateNeeded.getFullYear()+'-'+(dateNeeded.getMonth()+1)+'-'+dateNeeded.getDate()]);
				}
				
			}
			
		});
			
		this.isdPortalBusiness.addOrUpdateListItem(formDictionary).then(
		(id)=>{ 
			this.thinking = false;
			this.isdPortalData.patchValue({ID:id});
			//this.idSubmitted = id+"";			
		});	
	}
	
	show(what:string){
		return this.isdPortalData.get(what).value;
	}
	
	exit(){
	
	}
}
