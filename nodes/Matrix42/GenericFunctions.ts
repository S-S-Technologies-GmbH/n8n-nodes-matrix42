import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
} from 'n8n-workflow';

export async function matrix42ApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: `/${string}`,
	body: object,
	query?: IDataObject,
	uri?: string,
): Promise<any> {

	const authenticationMethod = this.getNodeParameter('authentication', 0) as string;
	const credentialType = authenticationMethod === 'basic' ? 'matrix42BasicApi' : 'matrix42TokenApi';
	const { serverUrl } = await this.getCredentials<{ serverUrl: string }>(credentialType);

	const options: IHttpRequestOptions = {
		headers: {},
		method,
		body: method === 'GET' || method === 'HEAD' || method === 'DELETE' ? null : { data: body },
		qs: query,
		url: uri || `http://${serverUrl}/m42Services/api/${endpoint}`,
		json: true,
	};

	if (options.body === null) {
		delete options.body;
	}

  return await this.helpers.requestWithAuthentication.call(this, credentialType, options);
}
