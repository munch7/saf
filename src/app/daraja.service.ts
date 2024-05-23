import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarajaService {
  private consumerKey = 'YOUR_CONSUMER_KEY';
  private consumerSecret = 'YOUR_CONSUMER_SECRET';
  private shortCode = 'YOUR_SHORTCODE';
  private lipaNaMpesaOnlineUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

  constructor(private http: HttpClient) {}

  private getAccessToken(): Observable<string> {
    const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
    const headers = new HttpHeaders().set('Authorization', `Basic ${btoa(`${this.consumerKey}:${this.consumerSecret}`)}`);

    return this.http.get<string>(url, { headers });
  }

  initiateStkPush(phoneNumber: string, amount: number): Observable<any> {
    return new Observable(observer => {
      this.getAccessToken().subscribe(accessToken => {
        const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '');
        const password = btoa(`${this.shortCode}${this.consumerKey}${timestamp}`);

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${accessToken}`
        });

        const requestBody = {
          BusinessShortCode: this.shortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: amount,
          PartyA: phoneNumber,
          PartyB: this.shortCode,
          PhoneNumber: phoneNumber,
          CallBackURL: 'https://example.com/callback',
          AccountReference: 'Test123',
          TransactionDesc: 'Payment for testing'
        };

        this.http.post(this.lipaNaMpesaOnlineUrl, requestBody, { headers }).subscribe(
          response => observer.next(response),
          error => observer.error(error)
        );
      });
    });
  }
}
