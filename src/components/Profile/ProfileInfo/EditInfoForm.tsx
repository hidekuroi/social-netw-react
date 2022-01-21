import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { url } from '../../utils/validators';
import { CheckboxInput, Input } from '../../common/FormControls';
import Button from '@mui/material/Button';


const EditInfoForm: React.FC<InjectedFormProps<{}, {}, string>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
                <div>
                    <Button variant="contained" color="success" type="submit">Save</Button>
                </div>
                <div>
                    About me:
                    <Field component={Input} validate={[]} type="text" name="aboutMe"></Field>
                </div>
                <div>
                    <Field component={CheckboxInput} type="checkbox" label="Looking for a job" name="lookingForAJob" />
                </div>
                    Description:
                    <Field component={Input} validate={[]} type="text" name="lookingForAJobDescription"/>
                <div>
                    Contacts:

                    <Field component={Input} validate={[url]} label="Facebook" type="text" name="contacts.facebook"></Field>
                    <Field component={Input} validate={[url]} label="Github" type="text" name="contacts.github"></Field>
                    <Field component={Input} validate={[url]} label="Instagram" type="text" name="contacts.instagram"></Field>
                    <Field component={Input} validate={[url]} label="Main Link" type="text" name="contacts.mainLink"></Field>
                    <Field component={Input} validate={[url]} label="Twitter" type="text" name="contacts.twitter"></Field>
                    <Field component={Input} validate={[url]} label="VK" type="text" name="contacts.vk"></Field>
                    <Field component={Input} validate={[url]} label="Website" type="text" name="contacts.website"></Field>
                    <Field component={Input} validate={[url]} label="Youtube" type="text" name="contacts.youtube"></Field>
                    
                </div>
                { props.error && <div >
                        {props.error}
                  </div>
                }
                
        </form>
    );
}

const EditInfoFormRedux = reduxForm<{}, {}>({
    form: 'edit-info'
})(EditInfoForm);


export default EditInfoFormRedux;