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
				name: 'Execute Import Definition',
				value: 'executeImportDefinition',
				description: 'Execute an Import Definition',
				action: 'Execute import definition',
			}
		],
		default: 'executeImportDefinition',
	},
];

const executeImportDefinitionOperation: INodeProperties[] = [
	{
		displayName: 'Sequence Name or ID',
		name: 'sequenceEoid',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getImportDefinitions',
		},
		default: '',
		description: 'The Name or Expression-ObjectID of the Import Definition. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				operation: ['executeImportDefinition']
			},
		},
		required: true,
	},
]

export const matrix42ImportFields: INodeProperties[] = [
	...executeImportDefinitionOperation
];

