import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class Matrix42TokenApi implements ICredentialType {
	name = 'matrix42TokenApi';

	displayName = 'Matrix42 Webservice Token Auth API';

	documentationUrl = 'https://help.matrix42.com/030_ESMP/030_INT/Business_Processes_and_API_Integrations/Web_Services%3A_Authentication_types';

	properties: INodeProperties[] = [
		{
			displayName: 'Server URL',
			name: 'serverUrl',
			type: 'string',
			default: '',
			hint: 'The URL of the Matrix42 server. (https://www.example-matrix42.com)',
			required: true,
		},
		{
			displayName: 'Webservice Token',
			name: 'webserviceToken',
			type: 'string',
			typeOptions: {
				password: true
			},
			default: '',
			hint: 'The Webservice token of the Matrix42 server.',
			required: true,
		},
		// {
		// 	displayName: 'Access Token',
		// 	name: 'accessToken',
		// 	type: 'hidden',
		// 	typeOptions: {
		// 		expirable: true,
		// 	},
		// 	default: '',
		// },
	];

	// async preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) {
	// 	const { RawToken } = (await this.helpers.httpRequest({
	// 		method: 'POST',
	// 		url: `${credentials.serverUrl}/m42Services/api/ApiToken/GenerateAccessTokenFromApiToken`,
	// 		skipSslCertificateValidation: false,
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			'Authorization': `Bearer ${credentials.webserviceToken}`,
	// 		},
	// 	})) as { RawToken: string };
	// 	return { accessToken: RawToken };
	// }

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.webserviceToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.serverUrl}}',
			url: '/m42Services/api/data/fragments/SPSGlobalConfigurationClassBase',
			skipSslCertificateValidation: false,
		},
	};
}
