import validationMessages from '../messages/en';
type TCustomMessageList = Record<string, Record<string, string>>;
type TranslatorFunction = (rule_name:string, params:Record<string, string>)=> string;
let translator: TranslatorFunction = messageFormatter;
let customMsgs:TCustomMessageList = {};

function messageFormatter(rule_name:string, params:Record<string, string>): string {
	let str = validationMessages[rule_name];

	//replace sub-string enclosed in {} with params 
	str = str.replace(/{[^{}]+}/g, (match) => {
		return params[match.slice(1, -1)];
	});
	return str;
}
export function setTranslator(t:TranslatorFunction) {
	translator = t;
}
export function getValidationMessage(rule_name: string, msg_params: Record<string, string>, field_name:string, field_id:string) {
	const params:Record<string, string> = { 'attribute': field_name, ...msg_params }
	let message_rule_name = rule_name;
	if(customMsgs && customMsgs[field_id] && customMsgs[field_id][rule_name]){
		message_rule_name = customMsgs[field_id][rule_name];
	}

	return translator(message_rule_name, params);
}

export function addValidationMessages(messageList:TCustomMessageList){
	customMsgs = Object.assign({}, messageList);
}