import {INodeProperties} from "n8n-workflow";

export const matrix42UserOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Get Users',
				value: 'getUsers',
				description: 'Get users (SPSUserClassBase)',
				action: 'Get users',
			}
		],
		default: 'getUsers',
	},
];


export const matrix42UserFields: INodeProperties[] = [
];

