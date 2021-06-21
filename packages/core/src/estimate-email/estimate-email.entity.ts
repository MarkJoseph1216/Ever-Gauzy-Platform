import { IEstimateEmail } from '@gauzy/contracts';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsBoolean,
	IsDate,
	IsEmail,
	IsOptional,
	IsString
} from 'class-validator';
import { Column, Entity } from 'typeorm';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';

@Entity('estimate_email')
export class EstimateEmail
	extends TenantOrganizationBaseEntity
	implements IEstimateEmail {
	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@Column()
	token?: string;

	@ApiPropertyOptional({ type: () => String })
	@IsEmail()
	@Column()
	email?: string;

	@ApiPropertyOptional({ type: () => Date })
	@IsDate()
	@Column()
	expireDate?: Date;

	@ApiPropertyOptional({ type: () => Boolean })
	@IsBoolean()
	@IsOptional()
	@Column({ nullable: true })
	convertAcceptedEstimates?: boolean;
}
