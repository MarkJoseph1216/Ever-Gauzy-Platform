import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IJobSearchCategory, IPagination } from '@gauzy/contracts';
import { toParams } from '@gauzy/common-angular';
import { API_PREFIX } from '../constants/app.constants';

@Injectable({
	providedIn: 'root'
})
export class JobSearchCategoryService {
	constructor(private http: HttpClient) {}

	getAll(request?: any) {
		return this.http
			.get<IPagination<IJobSearchCategory>>(
				`${API_PREFIX}/job-preset/job-search-category`,
				{
					params: request ? toParams(request) : {}
				}
			)
			.toPromise();
	}

	create(request?: IJobSearchCategory) {
		console.log('createNewCategories', { request });
		return this.http
			.post<IJobSearchCategory>(
				`${API_PREFIX}/job-preset/job-search-category`,
				request
			)
			.toPromise();
	}
}
