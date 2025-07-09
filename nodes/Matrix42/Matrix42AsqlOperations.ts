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


export const matrix42AsqlFields: INodeProperties[] = [
];

