const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateUpdateProject (data) {
  const errors = {}

  data.category = !isEmpty(data.category) ? data.category : ''
  data.description = !isEmpty(data.description) ? data.description : ''
  data.objective = !isEmpty(data.objective) ? data.objective : ''
  data.format = !isEmpty(data.format) ? data.format : ''
  data.location = !isEmpty(data.location) ? data.location : ''
  data.estimatedValue = !isEmpty(data.estimatedValue) ? data.estimatedValue : ''
  data.tags = !isEmpty(data.tags) ? data.tags : ''
  // data.pictureUrl = !isEmpty(data.pictureUrl) ? data.pictureUrl : '';

  // category
  if (Validator.isEmpty(data.category)) {
    errors.category = 'Classifique seu projeto em uma das categorias'
  }

  // description
  if (Validator.isEmpty(data.description)) {
    errors.description = 'Informe uma descrição para o projeto'
  }
  if (!Validator.isLength(data.description, { min: 10, max: undefined })) {
    errors.description = 'Descrição deve ter no mínimo 10 caracteres'
  }

  // format
  if (Validator.isEmpty(data.format)) {
    errors.format = 'Informe o formato do seu projeto'
  }

  // objective
  if (Validator.isEmpty(data.objective)) {
    errors.objective = 'Informe um objetivo para o projeto'
  }
  if (!Validator.isLength(data.objective, { min: 10, max: undefined })) {
    errors.objective = 'Objetivo deve ter no mínimo 10 caracteres'
  }

  // location
  if (Validator.isEmpty(data.location)) {
    errors.location = 'Informe onde seu projeto está localizado'
  }

  // estimatedValue
  if (Validator.isEmpty(data.estimatedValue)) {
    errors.estimatedValue = 'Informe o valor estimado do seu projeto'
  }
  if (Validator.isNumeric(data.estimatedValue, { no_symbols: true })) {
    errors.estimatedValue = 'Esse valor precisa ser um número'
  }

  // tags
  if (isEmpty(data.tags)) {
    errors.tags = 'Insira pelo menos uma tag'
  }

  // pictureUrl
  // if(Validator.isEmpty(data.pictureUrl)) {
  //     errors.pictureUrl = 'Esse campo é obrigatório';
  // }
  // if(!isEmpty(data.pictureUrl)) {
  //     if(!Validator.isURL(data.pictureUrl)) {
  //         errors.pictureUrl = 'Essa foto não é válida'
  //     }
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
