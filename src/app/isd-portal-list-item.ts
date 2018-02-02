import {SharepointListItem} from 'ng-tax-share-point-web-services-module';

export class IsdPortalListItem extends SharepointListItem{
	constructor(rawResponse?:any){
		super(rawResponse);
		//if(rawResponse){				
			///specific transformation for specific fields:
			// super.toInteger("Vehicle1Year");
			// super.toInteger("Vehicle2Year");
			// super.toInteger("Vehicle3Year");			
			// super.toBoolean("HasHandicapPermit");			
		//}
	}

	
	getItemProperties():string[]{	
		return ["ID", "Administrator" ,"DateNeeded", "Division" ,"Location" , "SelectedService",
	"Status", "Supervisor"];
	}
	///user profile service always run on root web .
	getSiteUrl():string{
		return '/forms/ISDPortal/';
	}
	getListName():string{
		return 'ISD2';
	}
	getFieldToUpdate():string{
		return 'Not implemented';
	}
	
	
}