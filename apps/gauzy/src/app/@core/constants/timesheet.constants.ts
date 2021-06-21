import { TimeLogType } from '@gauzy/contracts';

export const TimeLogsLabel = {
	[TimeLogType.TRACKED]: {
		status: 'success',
		text: TimeLogType.TRACKED
	},
	[TimeLogType.MANUAL]: {
		status: 'warning',
		text: TimeLogType.MANUAL
	},
	[TimeLogType.RESUMED]: {
		status: 'info',
		text: TimeLogType.RESUMED
	},
	[TimeLogType.IDEAL]: {
		status: 'primary',
		text: TimeLogType.IDEAL
	}
};
