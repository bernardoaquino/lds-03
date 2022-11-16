import { Field } from "../../hooks/useForm";

const enableWhenFieldValueIsNotNull = (fieldName: string, fieldNameToBeEnabled: string) => (fields: Field[]) => {
    const fieldToBeEnabled = fields?.find(({ name }) => name === fieldNameToBeEnabled);
    
    const afterChange = (value: any) => {
        if (fieldToBeEnabled) {
            fieldToBeEnabled.show = value !== null && value !== '';
        }
    };
    
    const field = fields?.find(({ name }) => name === fieldName)
    
    if (fieldToBeEnabled) {
        console.log('field > >>  ', field)
        fieldToBeEnabled.show = field?.value !== null && field?.value !== '';
    }

    if (field && fieldToBeEnabled) {
        const oldAfterChange = field?.afterChange
        
        field.afterChange = (value: any) => {
            oldAfterChange?.(value);
            afterChange?.(value);
        }
    }
}

export default enableWhenFieldValueIsNotNull;
