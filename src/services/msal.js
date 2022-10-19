import * as msal from "@azure/msal-browser";
const msalConfig = {
  auth: {
    clientId: '5fae6938-a192-4f07-b562-8c904881ba65',
    authority: `https://login.microsoftonline.com/common`,
   
  },
};
const msalInstance = new msal.PublicClientApplication(msalConfig);
export { msalInstance };
