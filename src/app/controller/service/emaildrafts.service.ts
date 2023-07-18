import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from './auth.service';
import { PublicClientApplication, InteractionType, AccountInfo } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class EmaildraftsService {
  public GRAPH_API_BASE_URL = 'https://graph.microsoft.com/v1.0';
  public MS_GRAPH_SCOPE = 'https://graph.microsoft.com/.default';
  public graphApiEndpoint = 'https://graph.microsoft.com/v1.0';
  public azureToken = String();
  constructor(private http: HttpClient,private auth: AuthService,private authService: MsalService) { }
   
  authenticateAndRetrieveAccessToken(to:string[],cc:string[],sub:string,body:string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      // Configure the login request
      const loginRequest = {
        scopes: ['https://graph.microsoft.com/.default']
      };
  
      // Call the login method to authenticate the user
      this.authService.loginPopup(loginRequest)
        .subscribe((response) => {
          // Get the account from the response
          const account: AccountInfo | null = response.account;
  
          if (account) {
            // Set the active account
            this.authService.instance.setActiveAccount(account);
  
            // Authentication successful, retrieve the access token
            const tokenRequest = {
              scopes: ['https://graph.microsoft.com/.default'],
              account: account
            };            
            // Call the acquireTokenSilent method to get the access token
            this.authService.acquireTokenSilent(tokenRequest)
              .subscribe((response) => {
                const accessToken = response.accessToken;
                this.azureToken = accessToken;
                resolve(accessToken);
                this.createDraftEmail(
                  this.azureToken,
                  this.auth.User.username+'@cgi.com',
                  to,
                  cc,
                  sub,
                  body
                ).then(() => {
                  this.authService.instance.setActiveAccount(null);
                }).catch((error) => {
                });
              }, (error) => {
                reject(`Error acquiring access token: ${error}`);
              });
          } else {
            reject('No account found in the login response.');
          }
        }, (error) => {
          reject(`Error during authentication: ${error}`);
        });
    });
  }
  test(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      // Configure the login request
      const loginRequest = {
        scopes: ['https://graph.microsoft.com/.default']
      };
  
      // Call the login method to authenticate the user
      this.authService.loginPopup(loginRequest)
        .subscribe((response) => {
          // Get the account from the response
          const account: AccountInfo | null = response.account;
  
          if (account) {
            // Set the active account
            this.authService.instance.setActiveAccount(account);
  
            // Authentication successful, retrieve the access token
            const tokenRequest = {
              scopes: ['https://graph.microsoft.com/.default'],
              account: account
            };            
            // Call the acquireTokenSilent method to get the access token
            this.authService.acquireTokenSilent(tokenRequest)
              .subscribe((response) => {
                const accessToken = response.accessToken;
                this.azureToken = accessToken;
                resolve(accessToken);
                this.retrieveInboxEmails(
                  this.azureToken
                ).then(() => {
                  this.authService.instance.setActiveAccount(null);
                }).catch((error) => {
                });
              }, (error) => {
                reject(`Error acquiring access token: ${error}`);
              });
          } else {
            reject('No account found in the login response.');
          }
        }, (error) => {
          reject(`Error during authentication: ${error}`);
        });
    });
  }
  retrieveInboxEmails(accessToken: string): Promise<{ subject: string, body: string }[]> {
    return new Promise<{ subject: string, body: string }[]>((resolve, reject) => {
      const endpoint = 'https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages?$top=100';
      const emails: { subject: string, body: string }[] = [];
      function fetchEmails(url: string) {
        fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to retrieve inbox emails: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          const retrievedEmails = data.value.map((email: any) => {
            return {
              subject: email.subject,
              body: email.body.content
            };
          });
          emails.push(...retrievedEmails);
          if (data["@odata.nextLink"]) {
            fetchEmails(data["@odata.nextLink"]);
          } else {
            resolve(emails);
          }
          
        })
        .catch(error => {
          reject(`Error retrieving inbox emails: ${error}`);
        });
      }
  
      fetchEmails(endpoint);
    });
  }
  
  
  async createDraftEmail(
    accessToken: string,
    fromEmailAddress: string,
    toEmailAddress: string[],
    ccEmailAddress: string[] | undefined,
    emailSubject: string,
    emailBody: string
  ): Promise<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    });
  
    const body = {
      subject: emailSubject,
      body: {
        contentType: 'html',
        content: emailBody
      },
      from: {
        emailAddress: {
          address: fromEmailAddress
        }
      },
      toRecipients: toEmailAddress.map(email => ({
        emailAddress: {
          address: email
        }
      })),
      ccRecipients: ccEmailAddress
        ? ccEmailAddress.map(email => ({
            emailAddress: {
              address: email
            }
          }))
        : []
    };
  
    await this.http.post(
      `${this.GRAPH_API_BASE_URL}/me/messages`,
      JSON.stringify(body),
      { headers }
    ).toPromise();
  }
 
  
}
