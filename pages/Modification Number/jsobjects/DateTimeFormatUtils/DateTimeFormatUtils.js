export default {
	dateFormat: () => {
		return new Intl.DateTimeFormat(navigator.language).formatToParts().map(part => {
			switch (part.type) {
				case 'month':
					return 'MM';
				case 'day':
					return 'DD';
				case 'year':
					return 'YYYY';
				default:
					return part.value;
			}
		}).join('');
	},
	dateTimeFormat: () => {
		return new Intl.DateTimeFormat( navigator.language, {
			timeStyle: "medium",
			dateStyle: "short",
		}).formatToParts().map(part => {
			switch (part.type) {
				case 'month':
					return 'MM';
				case 'day':
					return 'DD';
				case 'year':
					return 'YYYY';
				case 'hour':
					return new Intl.DateTimeFormat( navigator.language, {timeStyle: "medium", dateStyle: "short"}).formatToParts().find(x => x.type === 'dayPeriod') ? 'hh' : 'HH';
				case 'minute':
					return 'mm';
				case 'second':
					return 'ss';
				case 'dayPeriod':
					return 'A'
				default:
					return part.value === ', ' ? ' ' : part.value;
			}
		}).join('');
	},
	dateTimeFormatWithoutPeriod: () => {
		return new Intl.DateTimeFormat( navigator.language, {
			year: "numeric",
			month: "numeric",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			hour12: false,
		}).formatToParts().map(part => {
			switch (part.type) {
				case 'month':
					return 'MM';
				case 'day':
					return 'DD';
				case 'year':
					return 'YYYY';
				case 'hour':
					return 'HH';
				case 'minute':
					return 'mm';
				default:
					return part.value === ', ' ? ' ' : part.value;
			}
		}).join('');
	}
}