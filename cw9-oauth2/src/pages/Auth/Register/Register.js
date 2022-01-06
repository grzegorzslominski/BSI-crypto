/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import LoadingButton from '../../../UI/LoadingButton/LoadingButton';
import { validate } from '../../../helpers/validations';
import Input from '../../../components/Input/Input';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../axios-auth';

const Register = function () {
  const history = useHistory();
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: {
      value: '',
      error: '',
      showError: false,
      rules: ['required', 'email']
    },
    password: {
      value: '',
      error: '',
      showError: false,
      rules: ['required']
    }
  });
  const [errorFirebase, setErrorFirebase] = useState('');
  const valid = !Object.values(form)
    .map((input) => input.error)
    .filter((error) => error).length;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('accounts:signUp', {
        email: form.email.value,
        password: form.password.value,
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
    }
    setLoading(false);
  };

  const changeHandler = (value, fieldName) => {
    const error = validate(form[fieldName].rules, value);

    setForm({
      ...form,
      [fieldName]: {
        ...form[fieldName],
        value,
        showError: true,
        error
      }
    });
  };

  if (auth) {
    history.push('/');
  }

  return (
    <div className="card">
      <div className="card-header">Register</div>
      <div className="card-body">
        <p className="text-muted">Complete the registration details</p>

        <form onSubmit={submit}>
          <Input
            label="Email"
            type="email"
            value={form.email.value}
            onChange={(val) => changeHandler(val, 'email')}
            error={form.email.error}
            showError={form.email.showError}
          />

          <Input
            label="Password"
            type="password"
            value={form.password.value}
            onChange={(val) => changeHandler(val, 'password')}
            error={form.password.error}
            showError={form.password.showError}
          />

          {errorFirebase ? <div className="alert alert-danger">{errorFirebase}</div> : null}

          <div className="text-right">
            <LoadingButton loading={loading} disabled={!valid} className="btn-success">
              Sign up
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
