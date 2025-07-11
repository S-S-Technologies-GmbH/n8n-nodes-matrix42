import {type IDataObject, type IExecuteFunctions} from "n8n-workflow";
import {matrix42ApiRequest} from "./GenericFunctions";

export async function getFragments(this: IExecuteFunctions, i: number) {
	const returnData: IDataObject[] = [];

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

	return returnData;
}

export async function addFragment(this: IExecuteFunctions, i: number) {
	const returnData: IDataObject[] = [];
	return returnData;
}

export async function updateFragment(this: IExecuteFunctions, i: number) {
	const returnData: IDataObject[] = [];
	return returnData;
}

export async function deleteFragment(this: IExecuteFunctions, i: number) {
	const returnData: IDataObject[] = [];
	return returnData;
}

export async function addObject(this: IExecuteFunctions, i: number) {
	const returnData: IDataObject[] = [];
	return returnData;
}

export async function getObject(this: IExecuteFunctions, i: number) {
	const returnData: IDataObject[] = [];
	return returnData;
}

export async function updateObject(this: IExecuteFunctions, i: number) {
	const returnData: IDataObject[] = [];
	return returnData;
}

export async function deleteObject(this: IExecuteFunctions, i: number) {
	const returnData: IDataObject[] = [];
	return returnData;
}
