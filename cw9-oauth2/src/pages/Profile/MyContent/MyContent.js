/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable func-names */
/* eslint-disable react/button-has-type */
import { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import axios from '../../../axios';
import Example from '../../../components/Examples/Example/Example';
import objectToArrayWithId from '../../../helpers/objects';
import useAuth from '../../../hooks/useAuth';
import LoadingIcon from '../../../UI/LoadingIcon';
import helpersAlgorithm from '../../../algorithm/helpersAlgorithm';

const MyContent = function () {
  const [auth] = useAuth();
  const { url } = useRouteMatch();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('/messages.json');
      const newMessages = objectToArrayWithId(res.data).filter((m) => m.name === auth.email);

      setMessages(newMessages);
    } catch (ex) {
      console.log(ex.response);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchMessages();
    setLoading(false);
  }, []);

  return (
    <div>
      {messages ? null : <p>You don't have any messages</p>}
      {messages.map((message, i) => {
        return (
          <Example
            name={message.name}
            author={message.author}
            content={helpersAlgorithm.decryptFunction(message.description, message.algorithm)}
            id={message.id}
          />
        );
      })}
      {loading ? <LoadingIcon /> : null}
      <Link to={`${url}/add`} className="btn btn-primary">
        Send Message
      </Link>
    </div>
  );
};

export default MyContent;
