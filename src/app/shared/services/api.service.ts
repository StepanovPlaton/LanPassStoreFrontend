import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import * as v from 'valibot';
import { HttpService } from '@/shared/services/http.service';

export class ApiService<TList, TItem> {
  protected httpService = inject(HttpService);

  constructor(
    protected readonly entityName: string,
    protected readonly listSchema: v.BaseSchema<
      unknown,
      TList,
      v.BaseIssue<unknown>
    >,
    protected readonly itemSchema: v.BaseSchema<
      unknown,
      TItem,
      v.BaseIssue<unknown>
    >,
  ) {}

  getAll(): Observable<TList> {
    return this.httpService.get<TList>(`/${this.entityName}`, this.listSchema);
  }

  getById(id: number | string): Observable<TItem> {
    return this.httpService.get<TItem>(
      `/${this.entityName}/${id}`,
      this.itemSchema,
    );
  }
}
