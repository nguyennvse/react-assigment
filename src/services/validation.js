export const required = value => value ? '' : 'This field is required'

export const isEmail = value => value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) ? '': 'This is not a valid email'

export const isInteger = value => Number.isInteger(+value) ? '': 'This is not a interger'

export const isNumber = value => !Number.isNaN(+value) ? '' : 'This is not a number'



