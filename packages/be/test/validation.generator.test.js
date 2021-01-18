const validateGeneratorInput = require('../src/validation/generator');

describe('generator test', () => {
    it("Should go without problem",()=>{
        expect(validateGeneratorInput({min: 2, max: 3})).toStrictEqual({
            isValid: true,
            errors: {}
        });
    })

    it('Should return error - string instead of numeric as inputs', () => {
        expect(validateGeneratorInput({min: "string", max: "string"})).toStrictEqual({
            isValid: false,
            errors: {min: "Minimum must be an Integer.", max: "Maximum must be an Integer."}
        });
    });

    it("Should return error - minimum greater than maximum",()=>{
        expect(validateGeneratorInput({min: "5", max: "1"})).toStrictEqual({
            isValid: false,
            errors: {min: "Minimum must be less than maximum.", max: "Maximum must be greater than minimum."}
        });
    })


    it("Should return error - no input",()=>{
        expect(validateGeneratorInput({any:12,other:15})).toStrictEqual({
            isValid: false,
            errors: {min: "Minimum of the range is required.", max: "Maximum of the range is required."}
        });
    })
})

