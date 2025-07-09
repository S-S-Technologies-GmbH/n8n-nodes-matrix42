import {INodeProperties} from "n8n-workflow";

export const matrix42TicketOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['ticket'],
			},
		},
		options: [
			{
				name: 'Close Ticket',
				value: 'closeTicket',
				description: 'Close a ticket',
				action: 'Close ticket',
			},
			{
				name: 'Create Ticket',
				value: 'createTicket',
				description: 'Create a ticket',
				action: 'Create a ticket',
			},
			{
				name: 'Forward Ticket',
				value: 'forwardTicket',
				description: 'Forward a ticket',
				action: 'Forward ticket',
			},
			{
				name: 'Get Ticket Details',
				value: 'getTicketDetails',
				description: 'Get a tickets details',
				action: 'Get ticket details',
			},
			{
				name: 'Transform Ticket',
				value: 'transformTicket',
				description: 'Transform a ticket',
				action: 'Transform a ticket',
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
				operation: ['getTicketDetails']
			},
		},
		required: true,
	}
];

const transformTicketOperation: INodeProperties[] = [
	{
		displayName: 'Ticket Type',
		name: 'ticketType',
		type: 'options',
		// noDataExpression: true,
		displayOptions: {
			show: {
				operation: ['transformTicket'],
			},
		},
		options: [
			{
				name: 'Service Request',
				value: 'serviceRequest',
				description: 'Perform operation on SPSActivityClassBase with type Service Request',
			},
			{
				name: 'Incident',
				value: 'incident',
				description: 'Perform operation on SPSActivityClassBase with type Incident',
			}
		],
		default: 'serviceRequest',
		required: true,
	}
];

export const matrix42TicketFields: INodeProperties[] = [
	...getTicketDetailsOperation,
	...transformTicketOperation,
];

