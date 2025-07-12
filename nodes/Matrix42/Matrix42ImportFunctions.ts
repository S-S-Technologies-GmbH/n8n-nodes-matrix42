import type {IDataObject, IExecuteFunctions} from "n8n-workflow";
import {matrix42ApiRequest, uuidv4} from "./GenericFunctions";

export async function executeImportDefinition(this: IExecuteFunctions, i: number) {
	const returnData: IDataObject[] = [];

	const sequenceEoid = this.getNodeParameter('sequenceEoid', i) as string;

	const qs: IDataObject = {};

	let body = {
		Parameters: [],
		SequenceId: sequenceEoid,
		ActionType: 3, // full execution
		Token: uuidv4()
	};

	const response = await matrix42ApiRequest.call(this, 'POST', '/importdata/executeimportdefinition', body, qs);

	returnData.push(response as IDataObject);

	return returnData;
}
