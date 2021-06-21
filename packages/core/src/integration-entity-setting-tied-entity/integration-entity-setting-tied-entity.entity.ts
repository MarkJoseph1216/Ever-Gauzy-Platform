import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, RelationId, ManyToOne } from 'typeorm';
import {
	IIntegrationEntitySetting,
	IIntegrationEntitySettingTied
} from '@gauzy/contracts';
import {
	IntegrationEntitySetting,
	TenantOrganizationBaseEntity
} from '../core/entities/internal';

@Entity('integration_entity_setting_tied_entity')
export class IntegrationEntitySettingTiedEntity
	extends TenantOrganizationBaseEntity
	implements IIntegrationEntitySettingTied {
	@ApiProperty({ type: () => IntegrationEntitySetting })
	@ManyToOne(
		() => IntegrationEntitySetting,
		(integrationEntitySetting) => integrationEntitySetting.tiedEntities
	)
	@JoinColumn()
	integrationEntitySetting?: IIntegrationEntitySetting;

	@ApiProperty({ type: () => String, readOnly: true })
	@RelationId(
		(integrationEntityTiedSetting: IntegrationEntitySettingTiedEntity) =>
			integrationEntityTiedSetting.integrationEntitySetting
	)
	readonly integrationEntitySettingId?: string;

	@ApiProperty({ type: () => String })
	@Column({ nullable: false })
	entity: string;

	@ApiProperty({ type: () => Boolean })
	@Column({ nullable: false })
	sync: boolean;
}
