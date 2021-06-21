import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NbDialogRef } from '@nebular/theme';
import { TranslationBaseComponent } from '../language-base/translation-base.component';
import { IImageAsset, IOrganization } from '@gauzy/contracts';
import { Subject } from 'rxjs';
import { Store } from '../../@core/services/store.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ImageAssetService } from '../../@core/services/image-asset.service';

export interface SelectAssetSettings {
	uploadImageEnabled?: boolean;
	deleteImageEnabled?: boolean;
	selectMultiple?: boolean;
}

@UntilDestroy()
@Component({
	selector: 'ngx-select-asset',
	templateUrl: './select-asset.component.html',
	styleUrls: ['./select-asset.component.scss']
})
export class SelectAssetComponent
	extends TranslationBaseComponent
	implements OnInit {
	activeImage: IImageAsset;
	selectedImages: IImageAsset[] = [];
	loading = true;

	gallery: IImageAsset[] = [];

	@Input() settings: SelectAssetSettings = {
		uploadImageEnabled: true,
		deleteImageEnabled: true,
		selectMultiple: false
	};
	@Input() galleryInput: IImageAsset[];
	@Input() newImageUploadedEvent: Subject<any>;
	@Input() newImageStoredEvent: Subject<IImageAsset>;

	organization: IOrganization;

	constructor(
		public dialogRef: NbDialogRef<any>,
		readonly translationService: TranslateService,
		private imageAssetService: ImageAssetService,
		private store: Store
	) {
		super(translationService);
	}

	ngOnInit(): void {
		this.store.selectedOrganization$
			.pipe(untilDestroyed(this))
			.subscribe((organization: IOrganization) => {
				if (organization) {
					this.organization = organization;
					this.getAvailableImages();
				}
			});

		this.setImageStoredEvent();
	}

	async getAvailableImages() {
		if (this.galleryInput) {
			this.gallery = this.galleryInput;
			this.loading = false;
			return;
		}

		const { tenantId } = this.store.user;

		let searchInput: any = {
			tenantId,
			organizationId: this.organization.id
		};

		this.gallery = (await this.imageAssetService.getAll(searchInput)).items;
		this.loading = false;
	}

	onSelectImage(selectedImage: IImageAsset) {
		this.activeImage = selectedImage;

		switch (this.settings.selectMultiple) {
			case true:
				let find = this.selectedImages.find(
					(el) => el.id === selectedImage.id
				);

				if (find) {
					this.selectedImages = this.selectedImages.filter(
						(image) => image.id !== selectedImage.id
					);
				} else {
					this.selectedImages.push(selectedImage);
				}
				break;
			case false:
				this.selectedImages[0] = selectedImage;
				break;
		}
	}

	onSelectImageClick() {
		if (this.settings.selectMultiple) {
			this.dialogRef.close(this.selectedImages);
		} else {
			this.dialogRef.close(this.selectedImages[0]);
		}
	}

	onImageUploaded(image: IImageAsset) {
		this.newImageUploadedEvent.next(image);
	}

	onImageAssetDeleted(imageDeleted: IImageAsset) {
		this.gallery = this.gallery.filter(
			(image) => image.id != imageDeleted.id
		);
	}

	setImageStoredEvent() {
		if (!this.newImageStoredEvent) return;

		this.newImageStoredEvent
			.pipe(untilDestroyed(this))
			.subscribe((image: IImageAsset) => {
				this.gallery.push(image);
			});
	}
}
