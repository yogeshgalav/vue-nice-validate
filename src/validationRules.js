const validationRules = {
	required: (value) =>{
		if(value) return true;
		return false;
	},
	max: (value) =>{
		if(!isNaN(value)) return (value <= max);
		if(typeof value === 'string') return (value.length <= max);
		return false;
	},
	min: (value) =>{
		if(!isNaN(value)) return (value >= max);
		if(typeof value === 'string') return (value.length >= max);
		return false;
	},
	email: (value) =>{
		return String(value)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	},
};
export default  validationRules;