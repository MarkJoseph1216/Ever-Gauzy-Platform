import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '@gauzy/core';
import { HelpCenterArticle } from './help-center-article.entity';

@Injectable()
export class HelpCenterArticleService extends CrudService<HelpCenterArticle> {
	constructor(
		@InjectRepository(HelpCenterArticle)
		private readonly helpCenterArticle: Repository<HelpCenterArticle>
	) {
		super(helpCenterArticle);
	}

	async getArticlesByCategoryId(
		categoryId: string
	): Promise<HelpCenterArticle[]> {
		return await this.repository
			.createQueryBuilder('knowledge_base_article')
			.where('knowledge_base_article.categoryId = :categoryId', {
				categoryId
			})
			.getMany();
	}

	async deleteBulkByCategoryId(ids: string[]) {
		return await this.repository.delete(ids);
	}
}
