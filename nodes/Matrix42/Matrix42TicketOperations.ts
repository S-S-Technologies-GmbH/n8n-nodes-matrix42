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

const closeTicketOperation: INodeProperties[] = [
	// {
	// 	displayName: 'Ticket ID',
	// 	name: 'ticketId',
	// 	type: 'string',
	// 	default: '',
	// 	description: 'The SPSActivityClassBase ID of the Ticket',
	// 	displayOptions: {
	// 		show: {
	// 			operation: ['getTicketDetails']
	// 		},
	// 	},
	// 	required: true,
	// }
];

const createTicketOperation: INodeProperties[] = [
	{
		displayName: 'Ticket Type',
		name: 'ticketType',
		type: 'options',
		options: [
			{
				name: 'Ticket',
				value: 5,
			},
			{
				name: 'Service Request',
				value: 6,
			},
			{
				name: 'Incident',
				value: 0,
			}
		],
		default: 5,
		description: 'The type of the Ticket',
		displayOptions: {
			show: {
				operation: ['createTicket']
			},
		},
		required: true,
	},
	{
		displayName: 'Category Name or ID',
		name: 'category',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTicketCategories',
		},
		default: '',
		description: 'The Category of the Ticket. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				operation: ['createTicket']
			},
		},
		required: true,
	},
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		default: '',
		description: 'The Subject of the Ticket',
		displayOptions: {
			show: {
				operation: ['createTicket']
			},
		},
		required: true,
	},
	{
		displayName: 'Description',
		name: 'descriptionHTML',
		type: 'string',
		typeOptions: {
			editor: 'htmlEditor',
		},
		default: '',
		description: 'The Description of the Ticket (HTML)',
		displayOptions: {
			show: {
				operation: ['createTicket']
			},
		},
		required: true,
	},
	{
		displayName: 'Impact Name or ID',
		name: 'impact',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTicketImpacts',
		},
		default: '',
		description: 'The Impact of the Ticket. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				operation: ['createTicket']
			},
		},
		required: true,
	},
	{
		displayName: 'Urgency Name or ID',
		name: 'urgency',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTicketUrgencies',
		},
		default: '',
		description: 'The Urgency of the Ticket. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				operation: ['createTicket']
			},
		},
		required: true,
	},
	{
		displayName: 'Priority',
		name: 'priority',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Auto',
				value: -1,
				description: 'Calculate Priority'
			},
			{
				name: 'Without',
				value: 0,
				description: 'Without Priority'
			},
			{
				name: 'Low',
				value: 1,
				description: 'Low Priority'
			},
			{
				name: 'Medium',
				value: 2,
				description: 'Medium Priority'
			},
			{
				name: 'High',
				value: 3,
				description: 'High Priority'
			},
		],
		default: 2,
		description: 'The Priority of the Ticket. It can be automatically calculated based on the urgency and impact.',
		displayOptions: {
			show: {
				operation: ['createTicket']
			},
		},
		required: true,
	},
	{
		displayName: 'Responsible Role Name or ID',
		name: 'responsibleRole',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTicketRoles',
			loadOptionsDependsOn: ['category'],
		},
		default: '',
		description: 'The Responsible Role of the Ticket. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				operation: ['createTicket']
			},
		},
		required: true,
	},
	{
		displayName: 'Creator Name or ID',
		name: 'creator',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getUsers',
		},
		default: '',
		description: 'The Creator of the Ticket. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				operation: ['createTicket']
			},
		},
		required: true,
	},
	{
		displayName: 'Initiator Name or ID',
		name: 'user',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getUsers',
		},
		default: '',
		description: 'The Initiator of the Ticket. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				operation: ['createTicket']
			},
		},
		required: true,
	},
	{
		displayName: 'Responsible User Name or ID',
		name: 'responsibleUser',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getUsers',
		},
		default: '',
		description: 'The Responsible User of the Ticket. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				operation: ['createTicket']
			},
		},
		required: true,
	},
	{
		displayName: 'SLA Name or ID',
		name: 'sla',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTicketSlas',
		},
		default: '',
		description: 'The SLA of the Ticket. It can be automatically calculated. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				operation: ['createTicket']
			},
		},
		required: true,
	},
	// {
	// 	displayName: 'Additional Fields',
	// 	name: 'additionalFields',
	// 	type: 'collection',
	// 	placeholder: 'Add Field',
	// 	default: {},
	// 	displayOptions: {
	// 		show: {
	// 			operation: ['createTicket'],
	// 		},
	// 	},
	// 	options: [
	// 		{
	// 			displayName: 'Custom Parameters',
	// 			name: 'customParameters',
	// 			type: 'fixedCollection',
	// 			typeOptions: {
	// 				multipleValues: true,
	// 			},
	// 			placeholder: 'Add Parameter',
	// 			default: { parameter: [] },
	// 			options: [
	// 				{
	// 					displayName: 'Parameter',
	// 					name: 'parameter',
	// 					values: [
	// 						{
	// 							displayName: 'Key',
	// 							name: 'key',
	// 							type: 'string',
	// 							default: '',
	// 							description: 'The parameter name',
	// 						},
	// 						{
	// 							displayName: 'Value',
	// 							name: 'value',
	// 							type: 'string',
	// 							default: '',
	// 							description: 'The parameter value',
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 	],
	// },
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
	...closeTicketOperation,
	...createTicketOperation,
	...getTicketDetailsOperation,
	...transformTicketOperation,
];

