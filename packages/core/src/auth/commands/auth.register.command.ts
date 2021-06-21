import { ICommand } from '@nestjs/cqrs';
import { IUserRegistrationInput, LanguagesEnum } from '@gauzy/contracts';

export class AuthRegisterCommand implements ICommand {
	static readonly type = '[Auth] Register';

	constructor(
		public readonly input: IUserRegistrationInput,
		public readonly languageCode: LanguagesEnum
	) {}
}
