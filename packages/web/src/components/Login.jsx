import { useState, useRef, useEffect, useContext } from 'react'
import './LoginPage.css'
import { Link } from 'react-router-dom'
import 'whatwg-fetch';
import AuthContext from '../context/AuthProvider';
import { useUser } from '../context/UserContext';

function Login() {
  const { setAuth } = useContext(AuthContext);
  const { setTheUser } = useUser();
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
    }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://garageservice-api.vercel.app/logedIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user, password: pwd }),
        credentials: 'include',
      });
      if (response.ok) {
        window.localStorage.setItem("isLoggedIn", true)
        const dataUser = await response.json();
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        console.log(dataUser)
        setTheUser(dataUser);
        setAuth({ user, pwd, roles, accessToken });
        localStorage.setItem('userData', JSON.stringify(dataUser));
        setUser('');
        setPwd('');
        if(dataUser.userType === 1) window.location.replace('/user/accountsettings');
      } else if (response.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (response.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    } catch (err) {
      setErrMsg('Login Failed');
      errRef.current.focus();
    }
  }

  return (
    <>
      <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <div className='bg'>
            <div className='setForm'>
            <h2 className='txtSig'>Sign In</h2>
              <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor="email"><strong>Email</strong></label>
                  <input 
                      type="email" 
                      placeholder='Enter Email' 
                      id='email'
                      ref={userRef}
                      autoComplete='off'
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      className='form-control rounded-0'/>
                </div>
                <div className='mb-3'>
                  <label htmlFor="password"><strong>Password</strong></label>
                  <input 
                      type="password" 
                      placeholder='Enter password' 
                      id='password'
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      className='form-control rounded-0'/>
                </div>
                <button type='submit' className='btnSubmit'>Login</button>
                <p>You are agree to your terms and  policies </p>
                <Link to="/signUp" className='btnCreateAccount'>Create Account</Link>
              </form>
            </div>
          </div>
        </section>
    </>
  )
}

export default Login