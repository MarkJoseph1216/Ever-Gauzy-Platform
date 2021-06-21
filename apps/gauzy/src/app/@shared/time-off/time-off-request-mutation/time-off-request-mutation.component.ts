import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import * as Holidays from 'date-holidays';
import {
	IEmployee,
	ITimeOffPolicy,
	ITimeOff,
	IOrganization
} from '@gauzy/contracts';
import { EmployeeSelectorComponent } from '../../../@theme/components/header/selectors/employee/employee.component';
import { Store } from '../../../@core/services/store.service';
import { TimeOffService } from '../../../@core/services/time-off.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { EmployeesService } from '../../../@core/services';
import { OrganizationDocumentsService } from '../../../@core/services/organization-documents.service';
import * as moment from 'moment';
import { ToastrService } from '../../../@core/services/toastr.service';
import { OrganizationsService } from '../../../@core/services/organizations.service';
import { environment as ENV } from 'apps/gauzy/src/environments/environment';
@Component({
	selector: 'ngx-time-off-request-mutation',
	templateUrl: './time-off-request-mutation.component.html',
	styleUrls: ['../time-off-mutation.components.scss']
})
export class TimeOffRequestMutationComponent implements OnInit {
	constructor(
		protected dialogRef: NbDialogRef<TimeOffRequestMutationComponent>,
		private fb: FormBuilder,
		private toastrService: ToastrService,
		private timeOffService: TimeOffService,
		private employeesService: EmployeesService,
		private documentsService: OrganizationDocumentsService,
		private store: Store,
		private organizationService: OrganizationsService
	) {}

	@ViewChild('employeeSelector')
	employeeSelector: EmployeeSelectorComponent;

	@Input() type: ITimeOff | string;

	form: FormGroup;
	policies: ITimeOffPolicy[] = [];
	orgEmployees: IEmployee[];
	employeesArr: IEmployee[] = [];
	holidays = [];
	selectedEmployee: any;
	documentUrl: any;
	description = '';
	downloadDocUrl = '';
	uploadDocUrl = '';
	status: string;
	holidayName: string;
	organizationId: string;
	tenantId: string;
	policy: ITimeOffPolicy;
	startDate: Date = null;
	endDate: Date = null;
	requestDate: Date;
	invalidInterval: boolean;
	isHoliday = false;
	isEditMode = false;
	minDate = new Date(moment().format('YYYY-MM-DD'));
	organization: IOrganization;
	organizationCountryCode: string;
	currentUserCountryCode: string;
	employeeIds: string[];

	ngOnInit() {
		this._initializeForm();
	}

	private async _getAllHolidays() {
		const holidays = new Holidays();
		const currentMoment = new Date();
		const countryCode = this.currentUserCountryCode || this.organizationCountryCode || ENV.DEFAULT_COUNTRY;

		if (countryCode) {
			holidays.init(countryCode);
			this.holidays = holidays
				.getHolidays(currentMoment.getFullYear())
				.filter((holiday) => holiday.type === 'public');
		} else {
			this.toastrService.danger('TOASTR.MESSAGE.HOLIDAY_ERROR');
		}
	}

	private async _initializeForm() {
		await this._getFormData();

		this.setForm();
	}

	setForm() {
		this.form = this.fb.group({
			description: [this.description],
			start: [this.startDate, Validators.required],
			end: [this.endDate, Validators.required],
			policy: [this.policy, Validators.required],
			requestDate: [new Date()],
			documentUrl: [this.uploadDocUrl],
			status: ['']
		});

		this.documentUrl = this.form.get('documentUrl');
	}

	addRequest() {
		this.selectedEmployee = this.employeeSelector.selectedEmployee;

		this._checkFormData();

		if (this.selectedEmployee.id) {
			this.employeesArr.push(this.selectedEmployee);
			this._createNewRecord();
		}
	}

	getRequestForm(reqType: string) {
		this.documentsService
			.getAll({ organizationId: this.organizationId })
			.pipe(first())
			.subscribe((docs) => {
				if (reqType === 'paid') {
					this.downloadDocUrl = docs.items[0].documentUrl;
				} else {
					this.downloadDocUrl = docs.items[1].documentUrl;
				}

				window.open(`${this.downloadDocUrl}`);
			});
	}

	addHolidays() {
		this._checkFormData();
		this.employeeIds.forEach((element) => {
			const employee = this.orgEmployees.find((e) => e.id === element);
			this.employeesArr.push(employee);
		});
		this._createNewRecord();
	}

	private _createNewRecord() {
		if (this.form.valid && !this.invalidInterval) {
			this.dialogRef.close(
				Object.assign(
					{
						employees: this.employeesArr,
						organizationId: this.organizationId,
						tenantId: this.tenantId,
						isHoliday: this.isHoliday
					},
					this.form.value
				)
			);
		}

		this.invalidInterval = false;
	}

	private _checkFormData() {
		const { start, end, requestDate } = this.form.value;

		if (start > end || requestDate > start) {
			this.invalidInterval = true;
			this.toastrService.danger('TOASTR.MESSAGE.INTERVAL_ERROR');
		}

		if (this.policy.requiresApproval) {
			this.form.value.status = 'Requested';
		} else {
			this.form.value.status = 'Approved';
		}
	}

	private async _getFormData() {
		this.organizationId = this.store.selectedOrganization.id;
		this.tenantId = this.store.selectedOrganization.tenantId;

		const { items } = await this.organizationService.getAll(['contact'], {
			id: this.organizationId,
			tenantId: this.tenantId
		});
		this.organization = items[0];

		if (this.organization.contact) {
			this.organizationCountryCode = this.organization.contact.country;
		}

		if (this.store.user.employeeId) {
			this.employeesService
				.getEmployeeById(this.store.user.employeeId, ['contact'])
				.then((data) => {
					if (data.contact) {
						this.currentUserCountryCode = data.contact.country;
					}
				});
		}

		if (this.type === 'holiday') {
			this.isHoliday = true;
			this._getAllHolidays();
		} else if (this.type.hasOwnProperty('id')) {
			this.isEditMode = true;
			this.selectedEmployee = this.type['employees'][0];
			this.policy = this.type['policy'];
			this.startDate = this.type['start'];
			this.endDate = this.type['end'];
			this.description = this.type['description'];
			this.employeesArr = this.type['employees'];
		}

		this._getPolicies();
		this._getOrganizationEmployees();
	}

	private _getPolicies() {
		if (this.organizationId) {
			const findObj: {} = {
				organization: {
					id: this.organizationId
				},
				tenantId: this.tenantId
			};

			this.timeOffService
				.getAllPolicies(['employees'], findObj)
				.pipe(first())
				.subscribe((res) => {
					this.policies = res.items;
					this.policy = this.policies[0];
				});
		}
	}

	private _getOrganizationEmployees() {
		if (!this.organizationId) {
			return;
		}

		this.employeesService
			.getAll(['user', 'tags'], {
				organization: { id: this.organizationId },
				tenantId: this.tenantId
			})
			.pipe(first())
			.subscribe((res) => (this.orgEmployees = res.items));
	}

	onPolicySelected(policy: ITimeOffPolicy) {
		this.policy = policy;
	}

	onEmployeesSelected(employees: string[]) {
		this.employeeIds = employees;
	}

	onHolidaySelected(holiday) {
		this.startDate = holiday.start;
		this.endDate = holiday.end || null;
		this.description = holiday.name;

		this.setForm();
	}

	close() {
		this.dialogRef.close();
	}
}
