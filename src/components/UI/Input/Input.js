import {useRef, forwardRef, useImperativeHandle } from 'react';
import classes from './Input.module.css'

const Input = forwardRef((props, ref) => {
    const inputRef = useRef();
    // useEffect(()=> {
    //     inputRef.current.focus();
    // }, [])
    const activate = () => {
        inputRef.current.focus();
    }
    useImperativeHandle(ref, () => {
        return {
            focusInpCpn: activate
        }
    })
    return (
        <div className={`${classes.control} ${props.isValid === false ? classes.invalid : '' }`} >
            <label htmlFor={props.id}>{props.label}</label>
            <input
                ref={inputRef}
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    )
})

export default Input