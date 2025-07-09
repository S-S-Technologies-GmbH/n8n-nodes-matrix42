import {INodeProperties} from "n8n-workflow";

export const matrix42AssetOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['asset'],
			},
		},
		options: [
			{
				name: 'Create Asset',
				value: 'createAsset',
				description: 'Create an asset',
				action: 'Create an asset',
			}
		],
		default: 'createAsset',
	},
];


export const matrix42AssetFields: INodeProperties[] = [
];

