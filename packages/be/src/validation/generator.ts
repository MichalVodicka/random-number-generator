const validator = require('validator');
const isEmpty = require('./is-empty');

interface generatorErrorMsg{
  max?:string;
  min?:string;
}

export default function validateGeneratorInput(data) {
  let errors:generatorErrorMsg = {};
  data.min = !isEmpty(data.min) ? data.min : "";
  data.max = !isEmpty(data.max) ? data.max : "";

  const { min, max } = data;

  if(Number.MAX_SAFE_INTEGER < max){
    errors.max = 'Maximum must be lower than ' + (Number.MAX_SAFE_INTEGER+1) + '.';
  }

  if(Number.MAX_SAFE_INTEGER < min){
    errors.min = 'Minimum must be lower than ' + (Number.MAX_SAFE_INTEGER+1) + '.';
  }

  if (validator.isEmpty(''+min)) {
    errors.min = 'Minimum of the range is required.';
  }

  if (validator.isEmpty(''+max)) {
    errors.max = 'Maximum of the range is required.';
  }

  if (!validator.isEmpty(''+min) && !validator.isInt(''+min) ) {
    errors.min = 'Minimum must be an Integer.';
  }

  if (!validator.isEmpty(''+max) && !validator.isInt(''+max)) {
    errors.max = 'Maximum must be an Integer.';
  }

  if (!validator.isEmpty(''+max) && validator.isInt(''+max) && !validator.isEmpty(''+min) && validator.isInt(''+min) && max <= min) {
    errors.min = 'Minimum must be less than maximum.';
    errors.max = 'Maximum must be greater than minimum.';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
