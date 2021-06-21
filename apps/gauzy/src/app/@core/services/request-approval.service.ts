import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	IRequestApproval,
	IRequestApprovalCreateInput,
	IRequestApprovalFindInput
} from '@gauzy/contracts';
import { first } from 'rxjs/operators';
import { API_PREFIX } from '../constants/app.constants';

@Injectable()
export class RequestApprovalService {
	REQUETS_APPROVAL_URL = `${API_PREFIX}/request-approval`;

	constructor(private http: HttpClient) {}

	getAll(
		relations?: string[],
		findInput?: IRequestApprovalFindInput
	): Promise<{ items: IRequestApproval[] }> {
		const data = JSON.stringify({ relations, findInput });

		return this.http
			.get<{ items: IRequestApproval[] }>(
				`${this.REQUETS_APPROVAL_URL}`,
				{
					params: { data }
				}
			)
			.pipe(first())
			.toPromise();
	}

	getByEmployeeId(
		id: string,
		relations?: string[],
		findInput?: IRequestApprovalFindInput
	): Promise<{ items: IRequestApproval[] }> {
		const data = JSON.stringify({ relations, findInput });

		return this.http
			.get<{ items: IRequestApproval[] }>(
				`${this.REQUETS_APPROVAL_URL}/employee/${id}`,
				{
					params: { data }
				}
			)
			.pipe(first())
			.toPromise();
	}

	delete(id: string): Promise<any> {
		return this.http
			.delete(`${this.REQUETS_APPROVAL_URL}/${id}`)
			.pipe(first())
			.toPromise();
	}

	save(
		requestApproval: IRequestApprovalCreateInput
	): Promise<IRequestApproval> {
		if (!requestApproval.id) {
			return this.http
				.post<IRequestApproval>(
					this.REQUETS_APPROVAL_URL,
					requestApproval
				)
				.pipe(first())
				.toPromise();
		} else {
			return this.http
				.put<IRequestApproval>(
					`${this.REQUETS_APPROVAL_URL}/${requestApproval.id}`,
					requestApproval
				)
				.pipe(first())
				.toPromise();
		}
	}

	approvalRequestByAdmin(id: string): Promise<IRequestApproval> {
		return this.http
			.put<IRequestApproval>(
				`${this.REQUETS_APPROVAL_URL}/approval/${id}`,
				null
			)
			.pipe(first())
			.toPromise();
	}

	refuseRequestByAdmin(id: string): Promise<IRequestApproval> {
		return this.http
			.put<IRequestApproval>(
				`${this.REQUETS_APPROVAL_URL}/refuse/${id}`,
				null
			)
			.pipe(first())
			.toPromise();
	}
}
