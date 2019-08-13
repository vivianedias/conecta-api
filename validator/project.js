const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProjectInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.category = !isEmpty(data.category) ? data.category : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.objective = !isEmpty(data.objective) ? data.objective : '';
    data.format = !isEmpty(data.format) ? data.format : '';
    data.location = !isEmpty(data.location) ? data.location : '';
    data.estimatedValue = !isEmpty(data.estimatedValue) ? data.estimatedValue : '';
    data.tags = !isEmpty(data.tags) ? data.tags : '';
    data.img = !isEmpty(data.img) ? data.img : '';

    // handle
    if(Validator.isEmpty(data.handle)) {
        errors.handle = 'É necessário uma url para o Projeto';
    } 
    if(!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Url precisa ter entre 2 e 40 caracteres'
    }

    // name
    if(Validator.isEmpty(data.name)) {
        errors.name = 'Seu projeto precisa de um nome';
    }
    if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
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

    // objective
    if(Validator.isEmpty(data.objective)) {
        errors.objective = 'Informe um objetivo para o projeto';
    }
    if(!Validator.isLength(data.objective, { min: 10, max: undefined })) {
        errors.objective = 'Objetivo deve ter no mínimo 10 caracteres';
    }

    // format
    if(Validator.isEmpty(data.format)) {
        errors.format = 'Informe o formato do seu projeto';
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
    if(isEmpty(data.tags)) {
        errors.tags = 'Insira pelo menos uma tag';
    }

    // img
    if(Validator.isEmpty(data.img)) {
        errors.img = 'Esse campo é obrigatório';
    }

    return {
        errors, 
        isValid: isEmpty(errors)
    }
}