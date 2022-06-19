import { useState, useEffect, useReducer, useRef, useContext } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../contextStore/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (latestStSnp, action) => {
  if (action.type === 'strInp_em') {
    return { value: action.val, isValid: action.val.includes('@')}
  }
  if (action.type === 'strInp_emOnBlur') {
    return { value: latestStSnp.value, isValid: latestStSnp.value.includes('@')}
  }
  return { value: '', isValid: false}
}
const pwReducer = (latestStSnp, action) => {
  if (action.type === 'strInp_pw') {
    return { value: action.val, isValid: action.val.trim().length > 6}
  }
  if (action.type === 'strInp_pwOnBlur') {
    return { value: latestStSnp.value, isValid: latestStSnp.value.trim().length > 6}
  }
  return { value: '', isValid: false}
}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail]       = useState('');
  // const [emailIsValid, setEmailIsValid]       = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid]         = useState(false);
  const [emailS, dispatchEm] = useReducer(emailReducer, {value: '', isValid: null})
  const [pwS, dispatchPw] = useReducer(pwReducer, {value: '', isValid: null})
  const {isValid: emailIsValid } = emailS;
  const {isValid: pwIsValid } = pwS;
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("checking form validity");
      setFormIsValid(emailIsValid && pwIsValid)
    }, 500);
    return () => {
      console.log("clean up");
      clearTimeout(timer);
    }
  }, [emailIsValid, pwIsValid])
  const conxHk_AuConxObj = useContext(AuthContext);
  const emInpRef = useRef();
  const pwInpRef = useRef();

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEm({type: 'strInp_em', val: event.target.value});
    // setFormIsValid( event.target.value.includes('@') && pwS.isValid );
  };
  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPw({type: 'strInp_pw', val: event.target.value})
    // setFormIsValid(emailS.isValid && event.target.value.trim().length > 6 );
  };
  const validateEmailHandler = () => {
    // setEmailIsValid(emailS.isValid);
    dispatchEm({type: 'strInp_emOnBlur'});
  };
  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPw({type: 'strInp_pwOnBlur'});
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      conxHk_AuConxObj.onLogin(emailS.value, pwS.value);
    }
    else if ( !emailIsValid) {
      emInpRef.current.focusInpCpn();
    }
    else {
      pwInpRef.current.focusInpCpn();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        {/* <div
          className={`${classes.control} ${
            emailS.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailS.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}
        <Input ref={emInpRef}
        id="email" label="E-mail" type="email" isValid={emailIsValid} Value={emailS.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}/>
        <Input ref={pwInpRef}
        id="password" label="Password" type="password" isValid={pwIsValid} Value={pwS.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}/>
        {/* <div
          className={`${classes.control} ${
            pwS.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={pwS.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} //disabled={!formIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
