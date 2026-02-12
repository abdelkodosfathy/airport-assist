type AnyObject = Record<string, any>;

/**
 * تحويل أي object للفورمات الصح للـ API (FormData + bracket notation)
 */
export const buildFormData = (data: AnyObject, formData = new FormData(), parentKey?: string): FormData => {
  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    const formKey = parentKey ? `${parentKey}[${key}]` : key;

    // لو value array
    if (Array.isArray(value)) {
      value.forEach((v, idx) => {
        if (v instanceof File) {
          formData.append(`${formKey}[${idx}]`, v);
        } else if (typeof v === "object") {
          buildFormData(v, formData, `${formKey}[${idx}]`);
        } else {
          formData.append(`${formKey}[${idx}]`, v);
        }
      });
    }
    // لو File مباشر
    else if (value instanceof File) {
      formData.append(formKey, value);
    }
    // لو object nested
    else if (typeof value === "object") {
      buildFormData(value, formData, formKey);
    }
    // لو قيمة عادية (string, number, boolean)
    else {
      formData.append(formKey, String(value));
    }
  });

  return formData;
};
