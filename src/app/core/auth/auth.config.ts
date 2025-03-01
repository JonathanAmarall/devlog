import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    issuer: 'http://localhost:4200',
    clientId: 'Ov23liMqYIA5VGL6M2cl',
    redirectUri: window.location.origin + '/auth/callback',
    responseType: 'code',
    scope: 'read:user user:email',
    strictDiscoveryDocumentValidation: false,
    showDebugInformation: true,
    loginUrl: 'https://github.com/login/oauth/authorize',
    requireHttps: false
};
