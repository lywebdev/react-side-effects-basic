import React, {useReducer, useEffect, useState, useContext} from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const Login = (props) => {
    const emailReducer = (prevState, action) => {
        if (action.type === 'USER_INPUT') {
            return {
                value: action.value,
                isValid: action.value.includes('@'),
            };
        }

        if (action.type === 'INPUT_BLUR') {
            return {
                value: prevState.value,
                isValid: prevState.value.includes('@'),
            };
        }

        return {
            value: '',
            isValid: false,
        };
    };

    const passwordReducer = (prevState, action) => {
        if (action.type === 'USER_INPUT') {
            return {
                value: action.value,
                isValid: action.value.trim().length > 7,
            };
        }

        if (action.type === 'INPUT_BLUR') {
            return {
                value: prevState.value,
                isValid: prevState.value.trim().length > 7,
            };
        }

        return {
            value: '',
            isValid: false,
        };
    }

    // const [inputEmail, setInputEmail] = useState("");
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [inputPassword, setInputPassword] = useState("");
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmailState] = useReducer(
        emailReducer,
        {
            value: '',
            isValid: undefined
        }
    );
    const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {
        value: '',
        isValid: undefined,
    });


    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;

    const ctx = useContext(AuthContext);

    useEffect(() => {
      const timer = setTimeout(() => {
        setFormIsValid(emailState.isValid && passwordState.isValid);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }, [emailIsValid, passwordIsValid]);

    const emailChangeHandler = (event) => {
        dispatchEmailState({
            type: 'USER_INPUT',
            value: event.target.value
        });

        setFormIsValid(event.target.value.includes('@') && passwordState.isValid);
    };

    const passwordChangeHandler = (event) => {
        dispatchPasswordState({
            type: 'USER_INPUT',
            value: event.target.value,
        });

        setFormIsValid(event.target.value.trim() > 7 && emailState.isValid);
    };

    const validateEmailHandler = () => {
        dispatchEmailState({
            type: 'INPUT_BLUR',
        });
    };

    const validatePasswordHandler = () => {
        dispatchPasswordState({
            type: 'INPUT_BLUR',
        });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        ctx.onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={styles.login}>
            <form onSubmit={submitHandler}>
                <Input
                    id='email'
                    label='Email'
                    type='email'
                    isValid={emailIsValid}
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                />
                <Input
                    id='password'
                    label='Пароль'
                    type='password'
                    isValid={passwordIsValid}
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                />
                <div className={styles.actions}>
                    <Button type="submit" className={styles.btn} disabled={!formIsValid}>
                        Вход
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
