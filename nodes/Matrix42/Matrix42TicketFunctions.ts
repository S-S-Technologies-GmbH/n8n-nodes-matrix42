import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { matrix42ApiRequest } from './GenericFunctions';

export async function closeTicket(this: IExecuteFunctions, i: number) {
	const returnData: IDataObject[] = [];

	return returnData;
}

export async function createTicket(this: IExecuteFunctions, i: number) {
	const returnData: IDataObject[] = [];

	const ticketType = this.getNodeParameter('ticketType', i) as number;
	const category = this.getNodeParameter('category', i) as string;
	const subject = this.getNodeParameter('subject', i) as string;
	const descriptionHTML = this.getNodeParameter('descriptionHTML', i) as string;
	const impact = this.getNodeParameter('impact', i) as number;
	const urgency = this.getNodeParameter('urgency', i) as number;
	const responsibleRole = this.getNodeParameter('responsibleRole', i) as string;
	const creator = this.getNodeParameter('creator', i) as string;
	const user = this.getNodeParameter('user', i) as string;
	const responsibleUser = this.getNodeParameter('responsibleUser', i) as string;

	let priority= this.getNodeParameter('priority', i) as number;
	let sla = this.getNodeParameter('sla', i) as string;

	if (priority == -1) {
		// calculate
		const calculatedPriority= await matrix42ApiRequest.call(
			this,
			'GET',
			'/data/fragments/SVMActivityPickupPriorityMapping',
			{},
			{
				where: `ImpactValue = ${impact} AND UrgencyValue = ${urgency}`,
				columns: "PriorityValue",
			}
		);

		if(calculatedPriority) {
			priority = calculatedPriority[0].PriorityValue;
		} else {
			priority = 2;
		}
	}

	// const additionalFields = this.getNodeParameter('additionalFields', i, {})

	const qs: IDataObject = {
		activityType: ticketType,
	};

	const body = {
		Category: category,
		Subject: subject,
		state: 100,
		DescriptionHTML: descriptionHTML,
		Impact: impact,
		Urgency: urgency,
		Priority: priority,
		EntryBy: 4,
		ResponsibleUser: responsibleUser,
		ResponsibleRole: responsibleRole,
		Creator: creator,
		User: user,
		Sla: sla,
	};

	const response = await matrix42ApiRequest.call(this, 'POST', '/ticket/create', body, qs);

	returnData.push({ ticketEoid: response } as IDataObject);

	return returnData;
}

export async function forwardTicket(this: IExecuteFunctions, i: number) {
	const returnData: IDataObject[] = [];

	return returnData;
}

export async function getTicketDetails(this: IExecuteFunctions, i: number) {
	const returnData: IDataObject[] = [];

	return returnData;
}

export async function transformTicket(this: IExecuteFunctions, i: number) {
	const returnData: IDataObject[] = [];

	return returnData;
}
