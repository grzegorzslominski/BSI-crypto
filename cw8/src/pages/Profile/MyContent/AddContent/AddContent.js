/* eslint-disable no-console */
/* eslint-disable func-names */
import { useState } from 'react';
import Input from '../../../../components/Input/Input';
import { validate } from '../../../../helpers/validations';
import LoadingButton from '../../../../UI/LoadingButton/LoadingButton';
import axios from '../../../../axios';
import useAuth from '../../../../hooks/useAuth';
import helpersAlgorithm from '../../../../algorithm/helpersAlgorithm';

const AddContent = function () {
  const [auth] = useAuth();
  const [form, setForm] = useState({
    name: {
      value: '',
      error: '',
      showError: false,
      rules: ['required', { rule: 'min', length: 4 }]
    },
    description: {
      value: '',
      error: '',
      showError: false,
      rules: ['required', { rule: 'min', length: 10 }]
    },
    algorithm: {
      value: 2,
      error: '',
      showError: false,
      rules: ['required']
    }
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/messages.json', {
        author: auth.email,
        name: form.name.value,
        description: helpersAlgorithm.encryptFunction(form.description.value, form.algorithm.value),
        algorithm: form.algorithm.value,
        id: `${auth.email}_${Date.now()}`
      });
      console.log(helpersAlgorithm.encryptFunction(form.description.value, form.algorithm.value));
    } catch (ex) {
      console.log(ex.response);
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

  return (
    <div className="card">
      <div className="card-header">New message</div>
      <div className="card-body">
        <p className="text-muted">Complete the message details</p>

        <form onSubmit={submit}>
          <Input
            label="User Name"
            value={form.name.value}
            onChange={(val) => changeHandler(val, 'name')}
            error={form.name.error}
            showError={form.name.showError}
          />

          <Input
            label="Message content"
            type="textarea"
            value={form.description.value}
            onChange={(val) => changeHandler(val, 'description')}
            error={form.description.error}
            showError={form.description.showError}
          />
          <Input
            label="Algorithm"
            value={form.algorithm.value}
            type="select"
            onChange={(val) => changeHandler(val, 'algorithm')}
            options={[
              { value: 1, label: 'Algorith AES' },
              { value: 2, label: 'Algorithm 3DES' },
              { value: 3, label: 'Algorithm DES' },
              { value: 4, label: 'Algorithm RSA' }
            ]}
            error={form.algorithm.error}
            showError={form.algorithm.showError}
          />

          <div className="text-right">
            <LoadingButton loading={loading} className="btn-success">
              Send
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContent;
