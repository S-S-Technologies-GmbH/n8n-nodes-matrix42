import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';
import {matrix42TicketFields, matrix42TicketOperations} from "./matrix42TicketOperations";
import {matrix42AssetFields, matrix42AssetOperations} from "./matrix42AssetOperations";
import {matrix42ImportFields, matrix42ImportOperations} from "./matrix42ImportOperations";
import {matrix42AsqlFields, matrix42AsqlOperations} from "./matrix42AsqlOperations";
import {matrix42UserFields, matrix42UserOperations} from "./matrix42UserOperations";

export class Matrix42 implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Matrix42',
		name: 'matrix42',
 		icon: { light: 'file:matrix42.svg', dark: 'file:matrix42.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Matrix42.',
		defaults: {
			name: 'Matrix42',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'ASQL',
						value: 'asql',
					},
					{
						name: 'Asset',
						value: 'asset',
					},
					{
						name: 'Import',
						value: 'import',
					},
					{
						name: 'Ticket',
						value: 'ticket',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'ticket',
			},

			// Asql
			...matrix42AsqlOperations,
			...matrix42AsqlFields,

			// Asset
			...matrix42AssetOperations,
			...matrix42AssetFields,

			// Import
			...matrix42ImportOperations,
			...matrix42ImportFields,

			// Ticket
			...matrix42TicketOperations,
			...matrix42TicketFields,

			// User
			...matrix42UserOperations,
			...matrix42UserFields,
		],
	};



	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		let item: INodeExecutionData;
		let myString: string;

		// Iterates over all input items and add the key "myString" with the
		// value the parameter "myString" resolves to.
		// (This could be a different value for each item in case it contains an expression)
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				myString = this.getNodeParameter('myString', itemIndex, '') as string;
				item = items[itemIndex];

				item.json.myString = myString;
			} catch (error) {
				// This node should never fail but we want to showcase how
				// to handle errors.
				if (this.continueOnFail()) {
					items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
				} else {
					// Adding `itemIndex` allows other workflows to handle this error
					if (error.context) {
						// If the error thrown already contains the context property,
						// only append the itemIndex
						error.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex,
					});
				}
			}
		}

		return [items];
	}
}
