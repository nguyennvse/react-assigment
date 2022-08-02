export const getFormValue = (form) => {
  const obj = {};
  form.forEach((control) => {
    obj[control.name] = control.value;
  });
  return obj;
};
