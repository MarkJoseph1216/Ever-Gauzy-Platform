import { CurrenciesEnum, IEmployeeRecurringExpense } from '@gauzy/contracts';
import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsString,
	Max,
	Min,
	IsDate,
	IsOptional
} from 'class-validator';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import {
	Employee,
	TenantOrganizationBaseEntity
} from '../core/entities/internal';

@Entity('employee_recurring_expense')
export class EmployeeRecurringExpense
	extends TenantOrganizationBaseEntity
	implements IEmployeeRecurringExpense {
	@ApiProperty({ type: () => String })
	@IsString()
	@IsNotEmpty()
	@Index()
	@Column()
	employeeId: string;

	@ApiProperty({ type: () => Number, minimum: 1, maximum: 31 })
	@IsNumber()
	@IsNotEmpty()
	@Min(1)
	@Max(31)
	@Column()
	startDay: number;

	@ApiProperty({ type: () => Number, minimum: 1, maximum: 12 })
	@IsNumber()
	@IsNotEmpty()
	@Min(1)
	@Max(12)
	@Column()
	startMonth: number;

	@ApiProperty({ type: () => Number, minimum: 1 })
	@IsNumber()
	@IsNotEmpty()
	@Min(0)
	@Column()
	startYear: number;

	@ApiProperty({ type: () => Date })
	@IsDate()
	@Column()
	startDate: Date;

	@ApiProperty({ type: () => Number, minimum: 1, maximum: 31 })
	@IsNumber()
	@Optional()
	@Min(1)
	@Max(31)
	@Column({ nullable: true })
	endDay: number;

	@ApiProperty({ type: () => Number, minimum: 1, maximum: 12 })
	@IsNumber()
	@Optional()
	@Min(1)
	@Max(12)
	@Column({ nullable: true })
	endMonth: number;

	@ApiProperty({ type: () => Number, minimum: 1 })
	@IsNumber()
	@Optional()
	@Min(0)
	@Column({ nullable: true })
	endYear: number;

	@ApiProperty({ type: () => Date })
	@IsDate()
	@IsOptional()
	@Column({ nullable: true })
	endDate?: Date;

	@ApiProperty({ type: () => String })
	@IsString()
	@IsNotEmpty()
	@Index()
	@Column()
	categoryName: string;

	@ApiProperty({ type: () => Number })
	@IsNumber()
	@IsNotEmpty()
	@Column({ type: 'numeric' })
	value: number;

	@ApiProperty({ type: () => String, enum: CurrenciesEnum })
	@IsEnum(CurrenciesEnum)
	@IsNotEmpty()
	@Index()
	@Column()
	currency: string;

	@ApiProperty({ type: () => String })
	@IsString()
	@Index()
	@Column({ nullable: true })
	parentRecurringExpenseId?: string;

	@ManyToOne(() => Employee, (employee) => employee.id)
	employee: Employee;
}
