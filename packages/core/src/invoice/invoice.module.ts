import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { RouterModule } from 'nest-router';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { EmailService, EmailModule } from '../email';
import { EstimateEmailService } from '../estimate-email/estimate-email.service';
import { EstimateEmailModule } from '../estimate-email/estimate-email.module';
import { EstimateEmailController } from '../estimate-email/estimate-email.controller';
import { EstimateEmail } from '../estimate-email/estimate-email.entity';
import { TenantModule } from '../tenant/tenant.module';
import { CommandHandlers } from './commands';
import { PdfmakerService } from './pdfmaker.service';
import { OrganizationModule } from './../organization';

@Module({
	imports: [
		RouterModule.forRoutes([{ path: '/invoices', module: InvoiceModule }]),
		TypeOrmModule.forFeature([User, Invoice, EstimateEmail]),
		EmailModule,
		EstimateEmailModule,
		TenantModule,
		OrganizationModule,
		CqrsModule
	],
	controllers: [InvoiceController, EstimateEmailController],
	providers: [
		InvoiceService,
		PdfmakerService,
		UserService,
		EmailService,
		EstimateEmailService,
		...CommandHandlers
	],
	exports: [
		InvoiceService,
		PdfmakerService,
		UserService,
		EstimateEmailService
	]
})
export class InvoiceModule {}
