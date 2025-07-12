import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { matrix42ApiRequest } from './GenericFunctions';

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

export async function closeTicket(this: IExecuteFunctions, i: number) {
	const ticketEoid = this.getNodeParameter('ticketEoid', i) as string;
	const closeRelatedIncidents = this.getNodeParameter('closeRelatedIncidents', i) as boolean;
	const reason = this.getNodeParameter('reason', i) as number;
	const errorType = this.getNodeParameter('errorType', i) as number;
	const comments = this.getNodeParameter('comments', i) as string;
	const servicesAvailability = this.getNodeParameter('servicesAvailability', i) as number;
	const assetsAvailability = this.getNodeParameter('assetsAvailability', i) as number;
	const sendMailToInitiator = this.getNodeParameter('sendMailToInitiator', i) as boolean;
	const notifyResponsible = this.getNodeParameter('notifyResponsible', i) as boolean;
	const sendMailToUsers = this.getNodeParameter('sendMailToUsers', i) as boolean;
	const sendMailToRelatedResponsibleUsers = this.getNodeParameter('sendMailToRelatedResponsibleUsers', i) as boolean;

	const qs: IDataObject = {};

	const body = {
		ObjectIds: [ticketEoid],
		CloseRelatedIncidents: closeRelatedIncidents,
		Reason: reason,
		Comments: comments,
		ServicesAvailability: servicesAvailability,
		AssetsAvailability: assetsAvailability,
		SendMailToUsers: sendMailToUsers,
		ErrorType: errorType,
		SendMailToInitiator: sendMailToInitiator,
		NotifyResponsible: notifyResponsible,
		SendMailToRelatedResponsibleUsers: sendMailToRelatedResponsibleUsers
	};

	await matrix42ApiRequest.call(this, 'POST', '/ticket/close', body, qs);

	const returnData: IDataObject[] = [{Message: "Success"}];

	return returnData;
}

export async function forwardTicket(this: IExecuteFunctions, i: number) {
	const returnData: IDataObject[] = [];

	return returnData;
}

export async function transformTicket(this: IExecuteFunctions, i: number) {
	const returnData: IDataObject[] = [];

	return returnData;
}
