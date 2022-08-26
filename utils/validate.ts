
export type InitialValueType = {
    name?:string
    email:string
    password:string
}

export const validate = (values:InitialValueType) => {
    const errors = {} as InitialValueType;

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if(values.password.length<3){
        errors.password = 'there must be at least 3 characters'
    }

    //...

    return errors;
};
