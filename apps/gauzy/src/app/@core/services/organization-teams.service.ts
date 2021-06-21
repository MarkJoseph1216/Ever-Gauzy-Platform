import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	IOrganizationTeam,
	IOrganizationTeamFindInput,
	IOrganizationTeamCreateInput
} from '@gauzy/contracts';
import { first } from 'rxjs/operators';
import { API_PREFIX } from '../constants/app.constants';

@Injectable({
	providedIn: 'root'
})
export class OrganizationTeamsService {
	constructor(private http: HttpClient) {}

	// TODO: Implement logic to proceed the fowolling requests:
	// 1) Get all employees of selected Organization and put in in the select as options;
	// 2) Create a team with name and members (employees involved);
	// 3) Edit team- simillar with create;
	// 4) Delete a team
	// 5) Display all teams: show team name and members - avatar + full name for each member;

	create(
		createInput: IOrganizationTeamCreateInput
	): Promise<IOrganizationTeam> {
		return this.http
			.post<IOrganizationTeam>(
				`${API_PREFIX}/organization-team/create`,
				createInput
			)
			.pipe(first())
			.toPromise();
	}

	getAll(
		relations?: string[],
		findInput?: IOrganizationTeamFindInput
	): Promise<{ items: any[]; total: number }> {
		const data = JSON.stringify({ relations, findInput });

		return this.http
			.get<{ items: IOrganizationTeam[]; total: number }>(
				`${API_PREFIX}/organization-team`,
				{
					params: { data }
				}
			)
			.pipe(first())
			.toPromise();
	}

	update(
		id: string,
		updateInput: IOrganizationTeamCreateInput
	): Promise<any> {
		return this.http
			.put(`${API_PREFIX}/organization-team/${id}`, updateInput)
			.pipe(first())
			.toPromise();
	}

	delete(id: string): Promise<any> {
		return this.http
			.delete(`${API_PREFIX}/organization-team/${id}`)
			.pipe(first())
			.toPromise();
	}

	getMyTeams(
		relations?: string[],
		findInput?: IOrganizationTeamFindInput,
		employeeId: string = ''
	): Promise<{ items: any[]; total: number }> {
		const data = JSON.stringify({ relations, findInput, employeeId });

		return this.http
			.get<{ items: IOrganizationTeam[]; total: number }>(
				`${API_PREFIX}/organization-team/me`,
				{
					params: { data }
				}
			)
			.pipe(first())
			.toPromise();
	}
}
