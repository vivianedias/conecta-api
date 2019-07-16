const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProjectInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.category = !isEmpty(data.category) ? data.category : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.format = !isEmpty(data.format) ? data.format : '';
    data.specialNeeds = !isEmpty(data.specialNeeds) ? data.specialNeeds : '';
    data.location = !isEmpty(data.location) ? data.location : '';
    data.estimatedValue = !isEmpty(data.estimatedValue) ? data.estimatedValue : '';
    data.tags = !isEmpty(data.tags) ? data.tags : '';
    data.pictureUrl = !isEmpty(data.pictureUrl) ? data.pictureUrl : '';

    // handle
    if(Validator.isEmpty(data.handle)) {
        errors.handle = 'É necessário um Handle para o Projeto';
    } 
    if(!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle precisa ter entre 2 e 4 caracteres'
    }

    // name
    if(Validator.isEmpty(data.name)) {
        errors.name = 'Seu projeto precisa de um nome';
    }
    if(!Validator.isLength(data.name, { min: 2, max: 50 })) {
        errors.name = 'Nome deve ter no mínimo 2 caracteres';
    }

    // category
    if(Validator.isEmpty(data.category)) {
        errors.category = 'Classifique seu projeto em uma das categorias';
    }

    // description
    if(Validator.isEmpty(data.description)) {
        errors.description = 'Informe uma descrição para o projeto';
    }
    if(!Validator.isLength(data.description, { min: 10, max: undefined })) {
        errors.description = 'Descrição deve ter no mínimo 10 caracteres';
    }

    // format
    if(Validator.isEmpty(data.format)) {
        errors.format = 'Informe o formato do seu projeto';
    }

    // specialNeeds
    if(Validator.isEmpty(data.specialNeeds)) {
        errors.specialNeeds = 'Esse campo é obrigatório';
    }
    // location
    if(Validator.isEmpty(data.location)) {
        errors.location = 'Informe onde seu projeto está localizado';
    }

    // estimatedValue
    if(Validator.isEmpty(data.estimatedValue)) {
        errors.estimatedValue = 'Informe o valor estimado do seu projeto';
    }
    if(Validator.isNumeric(data.estimatedValue, { no_symbols: true })) {
        errors.estimatedValue = 'Esse valor precisa ser um número';
    }

    // tags
    if(Validator.isEmpty(data.tags)) {
        errors.tags = 'É obrigatório adicionar tags';
    }

    // pictureUrl
    if(Validator.isEmpty(data.pictureUrl)) {
        errors.pictureUrl = 'Esse campo é obrigatório';
    }
    if(!isEmpty(data.pictureUrl)) {
        if(!Validator.isURL(data.pictureUrl)) {
            errors.pictureUrl = 'Essa foto não é válida'
        }
    }
        
    return {
        errors, 
        isValid: isEmpty(errors)
    }
}