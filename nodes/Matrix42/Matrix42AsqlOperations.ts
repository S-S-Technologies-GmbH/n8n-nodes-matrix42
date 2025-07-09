import {INodeProperties} from "n8n-workflow";

export const matrix42AsqlOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['asql'],
			},
		},
		options: [
			{
				name: 'Get Fragments',
				value: 'getFragments',
				description: 'Get fragments with ASQL filters',
				action: 'Get fragments',
			},
			{
				name: 'Get Object',
				value: 'getObject',
				description: 'Get object data',
				action: 'Get object',
			},
		],
		default: 'getFragments',
	},
];

const getFragmentsOperation: INodeProperties[] = [
	{
		displayName: 'Data Definition',
		name: 'dataDefinition',
		type: 'string',
		default: '',
		description: 'Technical name of the Data Definition (e.g. SPSActivityClassBase)',
		displayOptions: {
			show: {
				operation: ['getFragments']
			},
		},
		required: true,
	},
	{
		displayName: 'Where',
		name: 'where',
		type: 'string',
		default: '',
		description: 'A-SQL Where Expression',
		displayOptions: {
			show: {
				operation: ['getFragments']
			},
		},
	},
	{
		displayName: 'Columns',
		name: 'columns',
		type: 'string',
		default: '',
		description: 'A-SQL Column Expression, defines the Columns of the Result set separated by Comma. If no Columns defined, then the Operation returns only Fragment IDs.',
		displayOptions: {
			show: {
				operation: ['getFragments']
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: ['getFragments'],
			},
		},
		options: [
			{
				displayName: 'Page Size',
				name: 'pageSize',
				type: 'number',
				default: 100,
				description: 'Sets the amount of records (Fragments) returned by Operation. If the parameter not set, then all present Fragments which match the Filtering criteria are returned.',
			},
			{
				displayName: 'Page Number',
				name: 'pageNumber',
				type: 'number',
				default: 0,
				description: 'Sets the Number of the page. Uses in combination with PageSize property.',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'string',
				default: '',
				description: 'Defines the sorting in the result set. Example: "Name ASC, CreatedDate DESC".',
			},
		],
	},
];


export const matrix42AsqlFields: INodeProperties[] = [
	...getFragmentsOperation
];

