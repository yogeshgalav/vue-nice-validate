
export type TValidationField = {
	field_id: string;
	field_name: string;
	form_name: string;
	rules: Record<string, boolean | Record<string, string>>;
	has_error: boolean;
	error_msg: string;
	failed_rule: string;
	show_error: boolean;
}
