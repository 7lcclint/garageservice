import {Link } from 'react-router-dom';
import './SignUp.css';
import { useRef, useState, useEffect } from 'react';
import Validation from './validation/SignUpValidation';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'whatwg-fetch';

function SignUp() {
  const userRef = useRef();
  const errRef = useRef();

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setValidName(Validation(user));
  }, [user])

  useEffect(() => {
    setValidPwd(Validation(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const v1 = Validation(user);
    const v2 = Validation(pwd);
    if (!v1 || !v2) {
        setErrMsg("Invalid Entry");
        return;
    }

    try{
      const response = await fetch('http://localhost:3456/register',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: fName,
          lname: lName,
          email: user,
          password: pwd,
        }),
        credentials: 'include',
      }
      )
      if(response.ok){
        const getData = await response.json();
        console.log("get data: ",getData)
        setSuccess(true);
      }else if (response.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      /* console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);

      setUser('');
      setPwd('');
      setMatchPwd('');
      setFName('');
      setLName('') */
    } catch (err) {
      setErrMsg(err.message || 'Registration Failed');
      errRef.current.focus();
    }/* catch (err){
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed')
      }
      errRef.current.focus();
    } */
  }

  return (
    <>
      {success ? (
        alert("Register Successful", window.location.replace('/login'))
      ): (
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <div className='bg'>
            <div className='setForm'>
              <h2>Sign Up</h2>
              <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor="fname"><strong>First Name</strong></label>
                  <input 
                      type="text" 
                      placeholder='Enter First Name' 
                      id='fname'
                      onChange={(e) => setFName(e.target.value)}
                      value={fName}
                      required
                      className='form-control rounded-1'/>
                </div>
                
                <div className='mb-3'>
                  <label htmlFor="lname"><strong>Last Name</strong></label>
                  <input 
                      type="text" 
                      placeholder='Enter Last Name' 
                      id='lname'
                      onChange={(e) => setLName(e.target.value)}
                      value={lName}
                      required
                      className='form-control rounded-1'/>
                </div>

                <div className='mb-3'>
                  <label htmlFor="email"><strong>Email</strong></label>
                  <input 
                      type="email" 
                      placeholder='Enter Email' 
                      id='email'
                      onChange={(e) => setUser(e.target.value)}
                      value={user} 
                      ref={userRef}
                      required
                      aria-invalid={validName ? "false" : "true"}
                      aria-describedby='uidnote'
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                  className='form-control rounded-0'/>
                  <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </p>
                </div>

                <div className='mb-3'>
                  <label htmlFor="password"><strong>Password</strong></label>
                  <input 
                      type="password" 
                      placeholder='Enter password' 
                      id='password'
                      onChange={(e) => setPwd(e.target.value)} 
                      value={pwd}
                      required
                      aria-invalid={validPwd ? "false" : "true"}
                      aria-describedby='pwdnote'
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                  className='form-control rounded-0'/>
                  <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                  </p>
                </div>

                <div className='mb-3'>
                  <label htmlFor="conFirm_password"><strong>ConFirm Password</strong></label>
                  <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                  <input 
                      type="password" 
                      placeholder='Enter password' 
                      id='confirm_password'
                      onChange={(e) => setMatchPwd(e.target.value)}
                      value={matchPwd}
                      required
                      aria-invalid={validPwd ? "false" : "true"}
                      aria-describedby='confirmnote'
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                  className='form-control rounded-0'/>
                  <p id="confirmnote" 
                    className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                  </p>                </div> 

                <button 
                    type='submit' 
                    className='btnSubmit'
                    disabled={!validName || !validPwd || !validMatch ? true : false}
                >Sign Up</button>
                <p>You are agree to your terms and  policies </p>
                <Link to="/login" className='btnCreateAccount'>Login</Link>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
export default SignUp