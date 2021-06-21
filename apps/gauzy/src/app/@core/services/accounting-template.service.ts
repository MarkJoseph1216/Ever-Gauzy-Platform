import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { API_PREFIX } from '../constants/app.constants';
import {
	IAccountingTemplateFindInput,
	IAccountingTemplate
} from '@gauzy/contracts';

@Injectable({
	providedIn: 'root'
})
export class AccountingTemplateService {
	constructor(private http: HttpClient) {}

	getAll(
		relations?: string[],
		findInput?: IAccountingTemplateFindInput
	): Promise<{ items: IAccountingTemplate[] }> {
		const data = JSON.stringify({ relations, findInput });

		return this.http
			.get<{ items: IAccountingTemplate[] }>(
				`${API_PREFIX}/accounting-template`,
				{
					params: { data }
				}
			)
			.pipe(first())
			.toPromise();
	}

	getById(id: string): Promise<IAccountingTemplate> {
		return this.http
			.get<IAccountingTemplate>(
				`${API_PREFIX}/accounting-template/template/${id}`
			)
			.pipe(first())
			.toPromise();
	}

	getTemplate(
		findInput?: IAccountingTemplateFindInput
	): Promise<IAccountingTemplate> {
		const data = JSON.stringify({ findInput });

		return this.http
			.get<IAccountingTemplate>(
				`${API_PREFIX}/accounting-template/template`,
				{
					params: { data }
				}
			)
			.pipe(first())
			.toPromise();
	}

	generateTemplatePreview(request?: any): Promise<any> {
		return this.http
			.post<any>(`${API_PREFIX}/accounting-template/template/preview`, {
				request
			})
			.pipe(first())
			.toPromise();
	}

	saveTemplate(data: any): Promise<any> {
		return this.http
			.post<any>(`${API_PREFIX}/accounting-template/template/save`, {
				data
			})
			.pipe(first())
			.toPromise();
	}

	updateTemplate(id: string, data: any): Promise<any> {
		return this.http
			.put<any>(
				`${API_PREFIX}/accounting-template/template/update/${id}`,
				data
			)
			.pipe(first())
			.toPromise();
	}
}
