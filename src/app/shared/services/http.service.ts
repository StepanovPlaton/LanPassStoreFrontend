import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import * as v from 'valibot';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    private http = inject(HttpClient);

    private readonly defaultHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    get<T>(url: string, schema: v.BaseSchema<unknown, T, v.BaseIssue<unknown>>): Observable<T> {
        return this.http.get<unknown>(url, { headers: this.defaultHeaders }).pipe(
            map((response) => {
                try {
                    return v.parse(schema, response);
                } catch (error) {
                    throw new Error(
                        `Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`
                    );
                }
            })
        );
    }

    post<T>(url: string, body: unknown, schema: v.BaseSchema<unknown, T, v.BaseIssue<unknown>>): Observable<T> {
        return this.http
            .post<unknown>(url, body, { headers: this.defaultHeaders })
            .pipe(
                map((response) => {
                    try {
                        return v.parse(schema, response);
                    } catch (error) {
                        throw new Error(
                            `Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`
                        );
                    }
                })
            );
    }
}
