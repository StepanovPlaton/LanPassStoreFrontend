import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import * as v from 'valibot';

function getApiBaseUrl(): string {
    const domain = import.meta.env.VITE_BACKEND_DOMAIN ?? '';
    const port = import.meta.env.VITE_BACKEND_PORT ?? '';
    const pattern = (import.meta.env.VITE_API_PATTERN ?? 'api').replace(/^\/|\/$/g, '');
    return `http://${domain}:${port}/${pattern}`;
}

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    private http = inject(HttpClient);
    private readonly apiBaseUrl = getApiBaseUrl();

    private readonly defaultHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    private resolveUrl(url: string): string {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        const path = url.startsWith('/') ? url : `/${url}`;
        return `${this.apiBaseUrl}${path}`;
    }

    get<T>(url: string, schema: v.BaseSchema<unknown, T, v.BaseIssue<unknown>>): Observable<T> {
        return this.http.get<unknown>(this.resolveUrl(url), { headers: this.defaultHeaders }).pipe(
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
            .post<unknown>(this.resolveUrl(url), body, { headers: this.defaultHeaders })
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
