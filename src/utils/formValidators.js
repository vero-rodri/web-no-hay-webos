const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
const EMAIL_PATTERN = /^(([^<>()[\].,;:\s@“]+(\.[^<>()[\].,;:\s@“]+)*)|(“.+“))@(([^<>()[\].,;:\s@“]+\.)+[^<>()[\].,;:\s@“]{2,})$/i;


export const isEmail = email => email && EMAIL_PATTERN.test(email);

export const isPassword = password => password && PASSWORD_PATTERN.test(password);

export const checkEmail = (_, value, cb) =>
  isEmail(value) ? cb() : cb(new Error('formato de email no válido'));

export const checkPassword = (_, value, cb) =>
  isPassword(value) ? cb() : cb(new Error('formato de contraseña no válido'));

export const checkSize = (_, value, callback) => {
  if (value && value.target) {
    const files = value.target.files;
    if (files[0]) {
      callback(files[0].size > 1000000 ? 'máximo tamaño: 10MB' : undefined);
    } else {
      callback();
    }
  } else {
    callback();
  }
}
