const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput (data) {
  const errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.confirmedPassword = !isEmpty(data.confirmedPassword) ? data.confirmedPassword : ''
  data.birthday = !isEmpty(data.birthday) ? data.birthday : ''
  data.gender = !isEmpty(data.gender) ? data.gender : ''
  data.color = !isEmpty(data.color) ? data.color : ''
  data.state = !isEmpty(data.state) ? data.state : ''
  data.city = !isEmpty(data.city) ? data.city : ''
  data.currentField = !isEmpty(data.currentField) ? data.currentField : ''
  data.socialNumber = !isEmpty(data.socialNumber) ? data.socialNumber : ''

  // Name
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Nome deve ter entre 2 e 30 caracteres'
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Digite o seu nome'
  }

  // Email
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Digite seu e-mail'
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'E-mail inválido'
  }

  // Password
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Digite uma senha'
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Senha precisa conter no mínimo 6 caracteres'
  }
  if (Validator.isEmpty(data.confirmedPassword)) {
    errors.confirmedPassword = 'Confirme sua senha'
  }
  if (!Validator.equals(data.password, data.confirmedPassword)) {
    errors.confirmedPassword = 'Essas senhas não coincidem'
  }

  // Birthday
  if (Validator.isEmpty(data.birthday)) {
    errors.birthday = 'Selecione sua data de nascimento'
  }
  // Gender
  if (Validator.isEmpty(data.gender)) {
    errors.gender = 'Campo obrigatório'
  }
  // Color
  if (Validator.isEmpty(data.color)) {
    errors.color = 'Campo obrigatório'
  }
  // State
  if (Validator.isEmpty(data.state)) {
    errors.state = 'Informe seu Estado'
  }
  // City
  if (Validator.isEmpty(data.city)) {
    errors.city = 'Informe sua Cidade'
  }
  // Current Field
  if (Validator.isEmpty(data.currentField)) {
    errors.currentField = 'Informe sua Área de Atuação'
  }
  // Social Number
  if (Validator.isEmpty(data.socialNumber)) {
    errors.socialNumber = 'Campo obrigatório'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
