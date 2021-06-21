import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { ISelectedEmployee } from '@gauzy/contracts';
import { ALL_EMPLOYEES_SELECTED } from '../../../@theme/components/header/selectors/employee';
import { Store } from '../../../@core/services/store.service';

@Component({
	selector: 'ngx-employee-with-links',
	templateUrl: './employee-with-links.component.html'
})
export class EmployeeWithLinksComponent implements ViewCell {
	@Input()
	rowData: any;
	@Input()
	value: any;

	constructor(private store: Store, private readonly router: Router) {}

	selectEmployee(
		employee: ISelectedEmployee,
		firstName: string,
		lastName: string,
		imageUrl: string
	) {
		this.store.selectedEmployee = employee || ALL_EMPLOYEES_SELECTED;
		this.store.selectedEmployee.firstName = firstName;
		this.store.selectedEmployee.lastName = lastName;
		this.store.selectedEmployee.imageUrl = imageUrl;
		this.navigateToEmployeeStatistics();
	}

	navigateToEmployeeStatistics() {
		this.router.navigate(['/pages/dashboard/hr']);
	}
}
