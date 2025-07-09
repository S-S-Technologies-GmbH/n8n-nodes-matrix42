import {INodeProperties} from "n8n-workflow";

export const matrix42ImportOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['import'],
			},
		},
		options: [
			{
				name: 'Run Importsequence',
				value: 'runImport',
				description: 'Run an Importsequence',
				action: 'Run import sequence',
			}
		],
		default: 'runImport',
	},
];


export const matrix42ImportFields: INodeProperties[] = [
];

