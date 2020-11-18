import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class AccessProviders {
    server: string = 'https://werecyclepage.000webhostapp.com/api/';
    constructor(
        public http: HttpClient
    ) { }

    postData(body, file){
        var headers = new HttpHeaders();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        let options = {
            headers: headers
        }

        return this.http.post(this.server + file, JSON.stringify(body), options)
        .map(res => res);
    }
    postEmail(body, file) {
        var headers = new HttpHeaders();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        let options = {
            headers: headers
        }

        return this.http.post(this.server + file, JSON.stringify(body), options)
        .map(res => res);
    }
}