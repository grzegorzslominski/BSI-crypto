/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable func-names */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
    </div>
  );
};

export default Login;
