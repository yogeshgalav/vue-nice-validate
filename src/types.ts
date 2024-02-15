
export type TValidationField = {
  field_id: string;
  field_name: string;
  form_name: string;
  rules: Record<string, boolean | Record<string, string>>;
  has_error: boolean;
  error_msg: string;
  failed_rule: string;
}

export type TValidationRules = Record<string, (...args: any[]) => boolean>;
export type TRuleParam = boolean|Record<string, string>;
