/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable func-names */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import axios from '../../../axios-auth';
import useAuth from '../../../hooks/useAuth';
import LoadingIcon from '../../../UI/LoadingIcon';

const Login = function () {
  const [auth, setAuth] = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(null);
  const [errorFirebase, setErrorFirebase] = useState('');

  /// /////////// google login state

  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData')) : null
  );

  /// ////////////////////

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('accounts:signInWithPassword', {
        email,
        password,
        returnSecureToken: true
      });
      setAuth({
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.localId
      });
      history.push('/');
    } catch (ex) {
      setErrorFirebase(ex.response.data.error.message);
      setLoading(false);
    }
  };

  if (auth) {
    history.push('/');
  }

  /// //////////////
  const handleFailure = () => {
    alert('Login failed');
  };

  const handleLogin = async (googleData) => {
    const res = await fetch('/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    setLoginData(data);
    setAuth({
      email: data.email,
      token: googleData.tokenId,
      userId: googleData.userId
    });

    history.push('/');
    localStorage.setItem('loginData', JSON.stringify(data));
  };

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };
  /// /////////////

  return (
    <div>
      <h2>Login</h2>

      {valid === false ? <div className="alert alert-danger">Incorrect login details</div> : null}
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        {errorFirebase ? <div className="alert alert-danger">{errorFirebase}</div> : null}
        {loading ? <LoadingIcon /> : <button className="btn btn-primary">Login</button>}
      </form>

      <h5>or log in with google account</h5>
      <div>
        {auth ? (
          <div>
            <h5>You logged in as {loginData.email}</h5>
          </div>
        ) : (
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy="single_host_origin"
          />
        )}
      </div>
    </div>
  );
};

export default Login;
