import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import { matrix42AssetFields, matrix42AssetOperations } from './Matrix42AssetOperations';
import { matrix42ImportFields, matrix42ImportOperations } from './Matrix42ImportOperations';
import { matrix42AsqlFields, matrix42AsqlOperations } from './Matrix42AsqlOperations';
import { matrix42UserFields, matrix42UserOperations } from './Matrix42UserOperations';
import { matrix42TicketFields, matrix42TicketOperations } from './Matrix42TicketOperations';
import { matrix42ApiRequest } from './GenericFunctions';

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
		credentials: [
			{
				name: 'matrix42TokenApi',
				displayName: 'Matrix42 Webservice Token Auth',
				required: true,
				displayOptions: {
					show: {
						authentication: ['webserviceToken'],
					},
				},
			},
			{
				name: 'matrix42BasicApi',
				displayName: 'Matrix42 Basic Auth',
				required: true,
				displayOptions: {
					show: {
						authentication: ['basic'],
					},
				},
			},
		],
		usableAsTool: true,
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'Webservice Token',
						value: 'webserviceToken',
					},
					{
						name: 'Basic',
						value: 'basic',
					},
				],
				default: 'webserviceToken',
			},
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

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		const returnData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
			if (resource === 'asql') {
				if (operation === 'getFragments') {
					// ----------------------------------
					// asql:getFragments
					// ----------------------------------
					const ddname = this.getNodeParameter('dataDefinition', i) as string;
					const where = this.getNodeParameter('where', i) as string;
					const columns = this.getNodeParameter('columns', i) as string;

					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
						pageSize?: number;
						pageNumber?: number;
						sort?: string;
					};

					const qs: IDataObject = {
						where,
						columns,
					};

					if (additionalFields.pageSize !== undefined) {
						qs.pagesize = additionalFields.pageSize;
					}
					if (additionalFields.pageNumber !== undefined) {
						qs.pagenumber = additionalFields.pageNumber;
					}
					if (additionalFields.sort) {
						qs.sort = additionalFields.sort;
					}

					const response = await matrix42ApiRequest.call(
						this,
						'GET',
						`/data/fragments/${ddname}`,
						{},
						qs,
					);

					if (Array.isArray(response)) {
						returnData.push(...response);
					} else {
						returnData.push(response as IDataObject);
					}
				}
			}
		}

		const executionData = this.helpers.returnJsonArray(returnData);
		return [executionData];
	}
}
