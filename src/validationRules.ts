type ruleFunction  = (value: any, params?: object) => boolean;

function getExtension(filename) {
	var parts = filename.split('.');
	return parts[parts.length - 1];
}

const validationRules = {
	required<ruleFunction>(value) {
		if (value && value.toString().trim()) return true;
		return false;
	},
	digits<ruleFunction>(value, max) {
		if (!isNaN(value)) return (value.toString().length === parseInt(max));
		return false;
	},
	digit_between<ruleFunction>(value, max) {
		if (!isNaN(value)) return value.toString().length <= max;
		return false;
	},
	max<ruleFunction>(value, max) {
		if (!isNaN(value)) return (value <= max);
		if (typeof value === 'string') return (value.length <= max);
		return false;
	},
	min<ruleFunction>(value, max) {
		if (!isNaN(value)) return (value >= max);
		if (typeof value === 'string') return (value.length >= max);
		return false;
	},
	email<ruleFunction>(value) {
		let is_email = String(value)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
		return is_email ? true : false;
	},
	array<ruleFunction>(val) {
		return val instanceof Array;
	},

	url<ruleFunction>(url) {
		return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/i.test(url);
	},

	alpha<ruleFunction>(val) {
		return /^[a-zA-Z]+$/.test(val);
	},

	alpha_dash<ruleFunction>(val) {
		return /^[a-zA-Z0-9_\-]+$/.test(val);
	},
	alpha_num<ruleFunction>(val) {
		return /^[a-zA-Z0-9]+$/.test(val);
	},
	accepted<ruleFunction>(val) {
		if (val === 'on' || val === 'yes' || val === 1 || val === '1' || val === true) {
			return true;
		}

		return false;
	},
	regex<ruleFunction>(val, req) {
		let reqPattern = req;
		var mod = /[g|i|m]{1,3}$/;
		var flag = req.match(mod);
		flag = flag ? flag[0] : '';

		req = req.replace(mod, '').slice(1, -1);
		req = new RegExp(req, flag);
		return !!req.test(val);
	},
	boolean<ruleFunction>(val) {
		return (
			val === true ||
			val === false ||
			val === 0 ||
			val === 1 ||
			val === '0' ||
			val === '1' ||
			val === 'true' ||
			val === 'false'
		);
	},
	numeric<ruleFunction>(val) {
		var num;

		num = Number(val); // tries to convert value to a number. useful if value is coming from form element

		if (typeof num === 'number' && !isNaN(num) && typeof val !== 'boolean') {
			return true;
		} else {
			return false;
		}
	},
	confirmed<ruleFunction>(val, confirmation_field) {
		let field = document.getElementById(confirmation_field);
		if (!field) {
			/* eslint-disable-next-line */
			console.error('Input field with id #' + confirmation_field + ' not found.');
			return false;
		}
		let confirmed_value = (field as HTMLInputElement).value;

		if (confirmed_value === val) {
			return true;
		}

		return false;
	},
	integer<ruleFunction>(val) {
		return String(parseInt(val, 10)) === String(val);
	},
	filetype<ruleFunction>(filename, valid_extention) {
		var ext = getExtension(filename);
		if (valid_extention.split(',').includes(ext)) {
			return true;
		}
		return false;
	},
	image<ruleFunction>(filename) {
		var ext = getExtension(filename);
		switch (ext.toLowerCase()) {
			case 'jpg':
			case 'gif':
			case 'bmp':
			case 'png':
				//etc
				return true;
		}
		return false;
	},
	video<ruleFunction>(filename) {
		var ext = getExtension(filename);
		switch (ext.toLowerCase()) {
			case 'm4v':
			case 'avi':
			case 'mpg':
			case 'mp4':
				// etc
				return true;
		}
		return false;
	}
};
export default validationRules;