import {INodeProperties} from "n8n-workflow";

export const matrix42Operations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'matrix42Operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			// show: {
			// 	resource: ['httpVerb'],
			// },
		},
		options: [
			{
				name: 'Create Ticket',
				value: 'createTicket',
				description: 'Create a Ticket',
				// action: 'Perform a GET request',
				// routing: {
				// 	request: {
				// 		method: 'GET',
				// 		url: '/get',
				// 	},
				// },
			},
			{
				name: 'Get Ticket Details',
				value: 'getTicketDetails',
				description: 'Get a Tickets Details',
				// action: 'Perform a GET request',
				// routing: {
				// 	request: {
				// 		method: 'GET',
				// 		url: '/get',
				// 	},
				// },
			},
			{
				name: 'Transform Ticket',
				value: 'transformTicket',
				description: 'Transform a Ticket',
				// action: 'Perform a GET request',
				// routing: {
				// 	request: {
				// 		method: 'GET',
				// 		url: '/get',
				// 	},
				// },
			}
		],
		default: 'createTicket',
	},
];

const getTicketDetailsOperation: INodeProperties[] = [
	{
		displayName: 'Ticket ID',
		name: 'ticketId',
		type: 'string',
		default: '',
		description: 'The SPSActivityClassBase ID of the Ticket',
		displayOptions: {
			show: {
				matrix42Operation: ['getTicketDetails']
			},
		},
		required: true,
	}
];

export const matrix42OperationFields: INodeProperties[] = [
	...getTicketDetailsOperation,
];

