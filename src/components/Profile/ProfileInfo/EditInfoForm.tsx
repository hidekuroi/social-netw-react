import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { url } from '../../utils/validators';
import { Input } from '../../common/FormControls';


const EditInfoForm: React.FC<InjectedFormProps<{}, {}, string>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
                <div>
                    <button type="submit">Save</button>
                </div>
                <div>
                    About me:
                    <Field component={Input} validate={[]} type="text" name="aboutMe"></Field>
                </div>
                <div>
                    Looking for a job:
                    <Field component="input" type="checkbox" name="lookingForAJob" />
                </div>
                    Description:
                    <Field component={Input} validate={[]} type="text" name="lookingForAJobDescription"/>
                <div>
                    Contacts:

                    <Field component={Input} validate={[url]} type="text" name="contacts.facebook"></Field>
                    <Field component={Input} validate={[url]} type="text" name="contacts.github"></Field>
                    <Field component={Input} validate={[url]} type="text" name="contacts.instagram"></Field>
                    <Field component={Input} validate={[url]} type="text" name="contacts.mainLink"></Field>
                    <Field component={Input} validate={[url]} type="text" name="contacts.twitter"></Field>
                    <Field component={Input} validate={[url]} type="text" name="contacts.vk"></Field>
                    <Field component={Input} validate={[url]} type="text" name="contacts.website"></Field>
                    <Field component={Input} validate={[url]} type="text" name="contacts.youtube"></Field>
                    
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