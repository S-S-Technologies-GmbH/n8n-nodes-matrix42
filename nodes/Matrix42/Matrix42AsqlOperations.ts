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
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Get Fragments',
				value: 'getFragments',
				description: 'Receives list of fragments with defined list of columns, which match the specified search criteria',
				action: 'Get fragments',
			},
			{
				name: 'Add Fragment',
				value: 'addFragment',
				description: 'Creates a new Data Definition fragment. The operation is required for cases of multi-fragments or optional fragments.',
				action: 'Add fragment',
			},
			{
				name: 'Update Fragment',
				value: 'updateFragment',
				description: 'Updates the specified Data Definition fragment, which has been at first retrieved by the Get Fragment operation, and adjusted with the new data. The Server throws the Concurrency exception in case the updated fragment has been updated between Get Fragment operation and Update Fragment.',
				action: 'Update fragment',
			},
			{
				name: 'Delete Fragment',
				value: 'deleteFragment',
				description: 'Deletes the fragment from Database defined by the Data Definition name and the fragment ID. The operation is required for cases of multi-fragments or optional fragments.',
				action: 'Delete fragment',
			},
			{
				name: 'Add Object',
				value: 'addObject',
				description: 'Add the Object of the specified Configuration Item',
				action: 'Add object',
			},
			{
				name: 'Get Object',
				value: 'getObject',
				description: 'Reads the whole Object with the specified Configuration Item name and object ID. The Service returns exclusively the data belonged to object (e.g. attributes, N:1 relations) Virtual attributes, like N:M relations are not returned and need to be obtained with the dedicated service request.',
				action: 'Get object',
			},
			{
				name: 'Update Object',
				value: 'updateObject',
				description: 'Updates the object of the specified Configuration Item name and object ID. The method works in pair with “Get Object” method, which delivers the original Object with the current Timestamp (market of current state), which is used for concurrency tracking.',
				action: 'Update object',
			},
			{
				name: 'Delete Object',
				value: 'deleteObject',
				description: 'Deletes the object from Database defined by the Configuration Item name and the object ID',
				action: 'Delete object',
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

const addFragmentsOperation: INodeProperties[] = [
	{
		displayName: 'Data Definition',
		name: 'dataDefinition',
		type: 'string',
		default: '',
		description: 'Technical name of the Data Definition (e.g. SPSActivityClassBase)',
		displayOptions: {
			show: {
				operation: ['addFragment']
			},
		},
		required: true,
	},
	{
		displayName: 'Fragment Data',
		name: 'fragmentData',
		type: 'json',
		default: '',
		description: 'JSON with the new Fragment data',
		displayOptions: {
			show: {
				operation: ['addFragment']
			},
		},
		required: true,
	},
];

const updateFragmentsOperation: INodeProperties[] = [
	{
		displayName: 'Data Definition',
		name: 'dataDefinition',
		type: 'string',
		default: '',
		description: 'Technical name of the Data Definition (e.g. SPSActivityClassBase)',
		displayOptions: {
			show: {
				operation: ['updateFragment']
			},
		},
		required: true,
	},
	{
		displayName: 'Fragment Data',
		name: 'fragmentData',
		type: 'json',
		default: '',
		description: 'JSON with the new Fragment data',
		displayOptions: {
			show: {
				operation: ['updateFragment']
			},
		},
		required: true,
	},
];

const deleteFragmentsOperation: INodeProperties[] = [
	{
		displayName: 'Data Definition',
		name: 'dataDefinition',
		type: 'string',
		default: '',
		description: 'Technical name of the Data Definition (e.g. SPSActivityClassBase)',
		displayOptions: {
			show: {
				operation: ['deleteFragment']
			},
		},
		required: true,
	},
	{
		displayName: 'Fragment ID',
		name: 'fragmentId',
		type: 'string',
		default: '',
		description: 'Fragment ID of specified Data Definition',
		displayOptions: {
			show: {
				operation: ['deleteFragment']
			},
		},
		required: true,
	},
];

const addObjectOperation: INodeProperties[] = [
	{
		displayName: 'Configuration Item',
		name: 'configurationItem',
		type: 'string',
		default: '',
		description: 'Technical name of the Configuration Item (e.g. SPSActivityTypeIncident)',
		displayOptions: {
			show: {
				operation: ['addObject']
			},
		},
		required: true,
	},
	{
		displayName: 'Object Data',
		name: 'objectData',
		type: 'json',
		default: '',
		description: 'JSON with the all data required for Object creation, in the same structure the method “Get Object” return',
		displayOptions: {
			show: {
				operation: ['addObject']
			},
		},
		required: true,
	}
];

const getObjectOperation: INodeProperties[] = [
	{
		displayName: 'Configuration Item',
		name: 'configurationItem',
		type: 'string',
		default: '',
		description: 'Technical name of the Configuration Item (e.g. SPSActivityTypeIncident)',
		displayOptions: {
			show: {
				operation: ['getObject']
			},
		},
		required: true,
	},
	{
		displayName: 'Object ID',
		name: 'objectId',
		type: 'string',
		default: '',
		description: 'The Expression-ObjectID of the Configuration Item',
		displayOptions: {
			show: {
				operation: ['getObject']
			},
		},
		required: true,
	},
	{
		displayName: 'Full',
		name: 'full',
		type: 'boolean',
		default: true,
		description: 'Whether to load the whole Object with all related multi-fragments data, otherwise, all multi-fragments are omitted',
		displayOptions: {
			show: {
				operation: ['getObject']
			},
		},
		required: true,
	},
];

const updateObjectOperation: INodeProperties[] = [
	{
		displayName: 'Configuration Item',
		name: 'configurationItem',
		type: 'string',
		default: '',
		description: 'Technical name of the Configuration Item (e.g. SPSActivityTypeIncident)',
		displayOptions: {
			show: {
				operation: ['updateObject']
			},
		},
		required: true,
	},
	{
		displayName: 'Object Data',
		name: 'objectData',
		type: 'json',
		default: '',
		description: 'JSON which has been retried by Get Object method, and adjusted with new values',
		displayOptions: {
			show: {
				operation: ['updateObject']
			},
		},
		required: true,
	},
	{
		displayName: 'Full',
		name: 'full',
		type: 'boolean',
		default: true,
		description: 'Whether to update multi-fragments data',
		displayOptions: {
			show: {
				operation: ['updateObject']
			},
		},
		required: true,
	},
];

const deleteObjectOperation: INodeProperties[] = [
	{
		displayName: 'Configuration Item',
		name: 'configurationItem',
		type: 'string',
		default: '',
		description: 'Technical name of the Configuration Item (e.g. SPSActivityTypeIncident)',
		displayOptions: {
			show: {
				operation: ['deleteObject']
			},
		},
		required: true,
	},
	{
		displayName: 'Object ID',
		name: 'objectId',
		type: 'string',
		default: '',
		description: 'The Expression-ObjectID of the Configuration Item',
		displayOptions: {
			show: {
				operation: ['deleteObject']
			},
		},
		required: true,
	}
];

export const matrix42AsqlFields: INodeProperties[] = [
	...getFragmentsOperation,
	...addFragmentsOperation,
	...updateFragmentsOperation,
	...deleteFragmentsOperation,
	...addObjectOperation,
	...getObjectOperation,
	...updateObjectOperation,
	...deleteObjectOperation
];

