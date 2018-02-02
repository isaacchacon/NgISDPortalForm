import {SharepointListsWebService} from 'ng-tax-share-point-web-services-module';
import {IsdPortalListItem} from './isd-portal-list-item';

export class IsdPortalBusiness{
	constructor(private sharepointListsWebService: SharepointListsWebService){}
	
	addOrUpdateListItem(keyValuePairs: [string, string][]):Promise<number>{
		return this.sharepointListsWebService.addOrUpdateListItem(new IsdPortalListItem() , keyValuePairs);
	}
	
}