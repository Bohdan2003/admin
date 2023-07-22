import { ReactComponent as ArrowIcon } from '../../assets/login-arrow.svg';
import { useLoginMutation } from '../../api';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import "./loginPage.scss";

export const LoginPage = () => {

    const [ login, { isLoading, error = { erorr: "" } } ] = useLoginMutation();
    const navigate = useNavigate();

    return (
        <section className="login">
             <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={yup.object({
                    username: yup.string()
                            .required("Обязательое поле"),
                    password: yup.string()
                            .required("Обязательое поле")
                })}
                onSubmit={(values) => {
                    login(values)
                        .then(payload => {
                            localStorage.setItem("token", payload.data.access);
                            navigate('/');
                        })
                        .catch(err => {console.log(err)})                
                }}
            >
                <Form className='login__form'>
                    <div className="login__name">
                        <Field className="login__name-input" 
                               placeholder="Логин"
                               type="text"
                               name="username"/>
                        <ErrorMessage className="login__error error"  
                                      name="username" 
                                      component="div"/>
                    </div>

                    <div className="login__password">
                        <Field className="login__password-input" 
                               placeholder="Пароль"
                               type="text" 
                               name="password"/>
                        <ErrorMessage className="login__error error" 
                                      name="password" 
                                      component="div"/>
                    </div>

                    <div className="login__box">
                        <button className="login__btn" type="submit" disabled={isLoading}>
                            <ArrowIcon/>
                        </button>
                        <div className="login__error error">{error.error}</div>
                    </div>
                </Form>
            </Formik>    
        </section>
    )
}