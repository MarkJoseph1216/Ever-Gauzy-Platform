import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ICustomSmtp } from '@gauzy/contracts';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';

@Entity('custom_smtp')
export class CustomSmtp
	extends TenantOrganizationBaseEntity
	implements ICustomSmtp {
	@ApiProperty({ type: () => String })
	@Column()
	host: string;

	@ApiProperty({ type: () => Number })
	@Column()
	port: number;

	@ApiProperty({ type: () => Boolean })
	@Column()
	secure: boolean;

	@ApiProperty({ type: () => String })
	@Column()
	username: string;

	@ApiProperty({ type: () => String })
	@Column()
	password: string;

	@ApiProperty({ type: () => Boolean, default: false })
	@Column({ default: false })
	isValidate?: boolean;
}
