
export type TValidationField = {
  field_id: string;
  field_name: string;
  form_name: string;
  rules: Record<string, boolean | Record<string, string>>;
  has_error: boolean;
  errors: Record<string, string>;
  validate_all_rules: boolean;
}

export type TValidationRules = Record<string, (...args: any[]) => boolean>;
export type TRuleParam = boolean|Record<string, string>;
export type TFormErrors = Record<string, null|string|Array<string>>;
