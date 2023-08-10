
function getExtension(filename) {
	var parts = filename.split('.');
	return parts[parts.length - 1];
}

const validationRules = {
	required(value) {
		if(value && value.toString().trim()) return true;
		return false;
	},
	digits(value,max) {
		if(!isNaN(value)) return (value.toString().length === parseInt(max));
		return false;
	},
	digit_between(value,max) {
		if(!isNaN(value)) return value.toString().length <= max;
		return false;
	},
	max(value,max) {
		if(!isNaN(value)) return (value <= max);
		if(typeof value === 'string') return (value.length <= max);
		return false;
	},
	min(value,max) {
		if(!isNaN(value)) return (value >= max);
		if(typeof value === 'string') return (value.length >= max);
		return false;
	},
	email(value) {
		return String(value)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	},
	array(val) {
		return val instanceof Array;
	  },
	
	  url(url) {
		return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/i.test(url);
	  },
	
	  alpha(val) {
		return /^[a-zA-Z]+$/.test(val);
	  },
	
	  alpha_dash(val) {
		return /^[a-zA-Z0-9_\-]+$/.test(val);
	  },
	  alpha_num(val) {
		return /^[a-zA-Z0-9]+$/.test(val);
	  },
	  accepted(val) {
		if (val === 'on' || val === 'yes' || val === 1 || val === '1' || val === true) {
		  return true;
		}
	
		return false;
	  },
	  regex(val, req) {
		let reqPattern = req;
		var mod = /[g|i|m]{1,3}$/;
		var flag = req.match(mod);
		flag = flag ? flag[0] : '';
	
		req = req.replace(mod, '').slice(1, -1);
		req = new RegExp(req, flag);
		return !!req.test(val);
	  },
	  boolean(val) {
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
	  numeric(val) {
		var num;
	
		num = Number(val); // tries to convert value to a number. useful if value is coming from form element
	
		if (typeof num === 'number' && !isNaN(num) && typeof val !== 'boolean') {
		  return true;
		} else {
		  return false;
		}
	  },
	  confirmed(val, confirmation_field) {
		var confirmed_value = document.getElementsByName(confirmation_field)[0].value;
	
		if (confirmed_value === val) {
		  return true;
		}
	
		return false;
	  },
	  integer(val) {
		return String(parseInt(val, 10)) === String(val);
	  },
	  filetype(filename,valid_extention) {
		var ext = getExtension(filename);
		if(valid_extention.split(',').includes(ext)){
			return true;
		}
		return false;
	  },
	  image(filename) {
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
	  video(filename) {
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
export default  validationRules;