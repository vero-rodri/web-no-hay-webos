const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
export const EMAIL_PATTERN = /^(([^<>()[\].,;:\s@“]+(\.[^<>()[\].,;:\s@“]+)*)|(“.+“))@(([^<>()[\].,;:\s@“]+\.)+[^<>()[\].,;:\s@“]{2,})$/i;


export const isEmail = email => email && EMAIL_PATTERN.test(email);

export const isPassword = password => password && PASSWORD_PATTERN.test(password);

export const checkEmail = (_, value, cb) =>
  isEmail(value) ? cb() : cb(new Error('formato de email no válido'));

export const checkPassword = (_, value, cb) =>
  isPassword(value) ? cb() : cb(new Error('formato de contraseña no válido'));

export const checkLength = (_, value, cb) =>
  value && value.length < 49 ? cb() : cb(new Error('máximo 50 caracteres'));

export const checkDate = (_, value, cb) => 
  value && new Date(value) > new Date() ? cb() : cb(new Error('elige una fecha futura!'));

export const checkDuration = (_, value, cb) => 
  value && value > 0 && value < 365 ? cb() : cb(new Error('la duración tiene que estar entre 1 y 365 días'));

export const checkPeriodicity = (_, value, cb) => 
  value && value > 0 && value < 30 ? cb() : cb(new Error('la periodicidad tiene que estar entre 1 y 30 días'));


export const checkSize = (_, value, callback) => {
  if (value && value.target) {
    const files = value.target.files;
    if (files[0]) {
      callback(files[0].size > 10000000 ? 'máximo tamaño: 10MB' : undefined);
    } else {
      callback();
    }
  } else {
    callback();
  }
}
