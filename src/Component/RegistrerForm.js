import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./global.css"



export default function RegistrerForm() {
    const USER_REGEX = /^(?=.{4,20})(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    const PWD_REGEX = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");;

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        const match = pwd === matchPwd;
        console.log(result);
        console.log(pwd);
        console.log(match)
        console.log(matchPwd);
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        console.log(user, pwd);
        setSuccess(true);

    };

    return (
        <>
        {success ? (
            <section>
                <h1> Success !</h1>
                <p>
                    <a href="#">Sign In</a>
                </p>
            </section>
        ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1> Register </h1>

            <form onSubmit={handleSubmit}>
                {/* Username Input */}
                <label htmlFor='username'>
                    Username :
                    <FontAwesomeIcon
                        icon={faCheck}
                        className={validName ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                        icon={faTimes}
                        className={
                            validName || !user ? "hide" : "invalid"
                        }
                    />
                </label>

                <input
                    type="text"
                    id='username'
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />

                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 à 24 caractères.<br />
                    Le pseudo doit commencer par une lettre.<br />
                    Les chiffres, les underscores et les tirets sont autorisés.<br />
                </p>

                {/* Password Input */}
                <label htmlFor='password'>
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>

                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="password"
                    id='password'
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    8 à 24 caractères.<br />
                    Le mot de passe doit contenir une minuscule et une majuscule, un chiffre et un caractère spécial.<br />
                    Caractères spécial accepté : <span aria-label="point d'exclamation"> ! </span> <span aria-label='arobase'> @ </span> <span aria-label='hashtag'> # </span>
                    <span aria-label='dollars'> $ </span> <span aria-label='pourcentage'> % </span>
                </p>

                {/* Confirmation password input */}
                <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <FontAwesomeIcon
                        icon={faCheck}
                        className={
                            validMatch && matchPwd ? "valid" : "hide"
                        }
                    />
                    <FontAwesomeIcon
                        icon={faTimes}
                        className={
                            validMatch || !matchPwd ? "hide" : "invalid"
                        }
                    />
                </label>
                <input
                    type="password"
                    id='confirm_pwd'
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Les deux mots de passe doit correspondre.
                </p>

                <button disabled={!validName || !validPwd || !validMatch ? true : false}> S'inscrire </button>
            </form>
            <p>
                Déjà un compte ? <br />
                <span className='line'>
                    {/* router link here */}
                    <a href="#" > Se Connecter </a>
                </span>
            </p>
        </section>
        )}

        </>

    )
}
