import validationMessages from '../messages/en';
let translator = null;

export function setTranslator(t) {
	translator = t;
}
export function messageFormatter(ruleName: string, msg_params: Record<string, string>, field_name = '') {
	const params = { 'attribute': field_name, ...msg_params }
	if (translator) {
		return translator(ruleName, params);
	}

	let str = validationMessages[ruleName];

	//replace sub-string enclosed in {} with params 
	str = str.replace(/{[^{}]+}/g, (match) => {
		return params[match.slice(1, -1)];
	});
	return str;
}