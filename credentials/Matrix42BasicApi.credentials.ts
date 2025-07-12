import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class Matrix42BasicApi implements ICredentialType {
	name = 'matrix42BasicApi';

	extends = ['httpBasicAuth'];

	displayName = 'Matrix42 Basic Auth API';

	// todo
	documentationUrl = 'https://your-docs-url';

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
			// todo add hint or extra field for domain
			displayName: 'User',
			name: 'user',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			required: true,
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			auth: {
				username: '={{$credentials.user}}',
				password: '={{$credentials.password}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.serverUrl}}',
			url: '/m42Services/api/configuration/isdevelopermode',
			skipSslCertificateValidation: true,
		},
	};
}
