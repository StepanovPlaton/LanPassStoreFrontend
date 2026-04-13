import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      console.error('HTTP Error:', {
        url: req.url,
        method: req.method,
        status: error.status,
        statusText: error.statusText,
        error: error.error,
      });
      return throwError(() => error);
    }),
  );
};
