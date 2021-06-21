import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
	NbAlertModule,
	NbButtonModule,
	NbCardModule,
	NbDialogModule,
	NbIconModule,
	NbInputModule,
	NbSpinnerModule,
	NbTooltipModule,
	NbTreeGridModule,
	NbSelectModule,
	NbRouteTabsetModule
} from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthService } from '../../@core/services/auth.service';
import { ExpensesService } from '../../@core/services/expenses.service';
import { IncomeService } from '../../@core/services/income.service';
import { ProfitHistoryModule } from '../../@shared/dashboard/profit-history/profit-history.module';
import { RecordsHistoryModule } from '../../@shared/dashboard/records-history/records-history.module';
import { SingleStatisticModule } from '../../@shared/single-statistic/single-statistic.module';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DataEntryShortcutsComponent } from './data-entry-shortcuts/data-entry-shortcuts.component';
import { HumanResourcesComponent } from './human-resources/human-resources.component';
import { AccountingComponent } from './accounting/accounting.component';
import { InfoBlockModule } from '../../@shared/dashboard/info-block/info-block.module';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { EmployeeChartsModule } from './human-resources/employee-charts/employee-charts.module';
import { TimeTrackingModule } from './time-tracking/time-tracking.module';
import { TranslateModule } from '../../@shared/translate/translate.module';
import { HeaderTitleModule } from '../../@shared/components/header-title/header-title.module';

@NgModule({
	imports: [
		DashboardRoutingModule,
		ThemeModule,
		NbCardModule,
		NgSelectModule,
		FormsModule,
		NbButtonModule,
		NbInputModule,
		RecordsHistoryModule,
		NbDialogModule.forChild(),
		NbTreeGridModule,
		NbIconModule,
		NbTooltipModule,
		NbSpinnerModule,
		NbSelectModule,
		NbAlertModule,
		ProfitHistoryModule,
		TranslateModule,
		EmployeeChartsModule,
		NbSpinnerModule,
		SingleStatisticModule,
		InfoBlockModule,
		NbRouteTabsetModule,
		TimeTrackingModule,
		HeaderTitleModule
	],
	declarations: [
		DashboardComponent,
		AccountingComponent,
		HumanResourcesComponent,
		DataEntryShortcutsComponent,
		ProjectManagementComponent
	],
	providers: [IncomeService, ExpensesService, AuthService]
})
export class DashboardModule {}
