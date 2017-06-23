export function validateEmail(value) {
  return value.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/);
}

export function validateTel(value) {
  return val.match(/^(0[0-9]{1,4}[-]?)?[0-9]{1,4}[-]?[0-9]{4}$/);
}
