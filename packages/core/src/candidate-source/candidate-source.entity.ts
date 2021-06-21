import { Column, Entity } from 'typeorm';
import { ICandidateSource } from '@gauzy/contracts';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';

@Entity('candidate_source')
export class CandidateSource
	extends TenantOrganizationBaseEntity
	implements ICandidateSource {
	@ApiProperty({ type: () => String })
	@Column()
	name: string;

	@ApiProperty({ type: () => String })
	@IsString()
	@IsNotEmpty()
	@Column({ nullable: true })
	candidateId?: string;
}
