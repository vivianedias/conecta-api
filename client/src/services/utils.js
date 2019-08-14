class UtilsService {

	static validateEmail(email) {
		if (!email) return 'Campo obrigatório';
		return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email) ? undefined : 'E-mail inválido';
	}

	static required(value, name) {
		if(name === ('day' || 'month' || 'year')) { 
			return value 
			? undefined 
			: 'Selecione sua data de nascimento';
		}

		if(name === 'state') return value 
			? undefined 
			: 'Informe seu Estado';

		if(name === 'city') return value 
			? undefined 
			: 'Informe sua Cidade';

		if(name === 'currentField') return value 
			? undefined 
			: 'Informe sua Área de Atuação';

		if(name === 'name' && value.length < 2) 
		return 'Nome deve ter no mínimo 2 caracteres';

		if(name === 'category') return value 
			? undefined 
			: 'Classifique seu projeto em uma das categorias';

		if(name === 'description' && value.length < 10) 
		return 'Descrição deve ter no mínimo 10 caracteres';

		if(name === 'objective' && value.length < 10) 
		return 'Objetivo deve ter no mínimo 10 caracteres';

		if(name === 'estimatedValue') return value 
			? undefined 
			: 'Informe o valor estimado do seu projeto';

		if(name === 'location') return value 
			? undefined 
			: 'Informe onde seu projeto está localizado';

		if(name === 'tags') return value.length === 0
			? 'Insira pelo menos uma tag' 
			: undefined;

		if(name === 'img') return value 
			? undefined 
			: 'Insira uma imagem de capa para o seu projeto';

		return value ? undefined : 'Campo obrigatório';
	}

	static validatePassword(password) {
		if (!password) return 'Digite uma senha';
		return password.length >= 6 ? undefined : 'Senha precisa conter no mínimo 6 caracteres';
	}

	static validateConfirmedPassword(password, confirmedPassword){
		if (!confirmedPassword) return 'Confirme sua senha';
		return password === confirmedPassword ? undefined : 'Essas senhas não coincidem'
	}

	static validateOnlyNumbers(numbers) {
		if (!numbers) return 'Campo obrigatório';
		if(numbers && numbers !== 'não') {
				return /^\d+$/.test(numbers) ? undefined : 'Insira apenas números';
		} 
		return undefined;
	}

	static isEmpty(value) {  
		return value === undefined ||
		value === null ||
		(typeof value === 'object' && Object.keys(value).length === 0) ||
		(typeof value === 'string' && value.trim().length === 0)
	}

	static specialCharacters(handle) {
		if(!handle) return 'Campo obrigatório';
		return (/[^\x00-\x7F]/g).test(handle) || (/[^a-zA-Z 0-9]+/g).test(handle)
			? 'Não utilize caracteres especiais (isso inclui letras com acento)'
			: undefined
	}

	// Validator function
	static validate = (value, name) => {
		switch(name) {
			case 'estimatedValue':
				return this.validateOnlyNumbers(value);
			case 'handle':
				return this.specialCharacters(value);
			default:
				return this.required(value, name);
		}
	}
}

export default UtilsService;
