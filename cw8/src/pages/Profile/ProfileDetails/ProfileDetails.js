/* eslint-disable no-console */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable func-names */
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import LoadingIcon from '../../../UI/LoadingIcon';
import { validateEmail } from '../../../helpers/validations';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../axios-auth';

const ProfileDetails = function () {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState(auth.email);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    passsword: ''
  });
  const [success, setSuccess] = useState(false);
  const buttonDisabled = Object.values(errors).filter((x) => x).length;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        idToken: auth.token,
        email,
        returnSecureToken: true
      };
      if (password) {
        data.password = password;
      }

      const res = await axios.post('accounts:update', data);

      setAuth({
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.localId
      });
      setSuccess(true);
    } catch (ex) {
      console.log(ex.response);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (validateEmail(email)) {
      setErrors({ ...errors, email: '' });
    } else {
      setErrors({ ...errors, email: 'Invalid email' });
    }
  }, [email]);

  useEffect(() => {
    if (password.length >= 4 || !password) {
      setErrors({ ...errors, password: '' });
    } else {
      setErrors({ ...errors, password: 'Min. characters: 4' });
    }
  }, [password]);

  return (
    <form onSubmit={submit}>
      {success ? <div className="alert alert-success">Date save</div> : null}

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`form-control ${errors.email ? 'is-invalid' : 'is-valid'}`}
        />
        <div className="valid-feedback" /> {errors.email}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
        />
        <div className="invalid-control">{errors.password} </div>
      </div>
      {loading ? (
        <LoadingIcon />
      ) : (
        <button className="btn btn-primary" disabled={buttonDisabled}>
          Save
        </button>
      )}
    </form>
  );
};

export default ProfileDetails;
