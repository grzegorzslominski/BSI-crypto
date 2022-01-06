/* eslint-disable func-names */

import { useEffect, useState } from 'react';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import LoadingIcon from '../../UI/LoadingIcon';

const Home = function () {
  useWebsiteTitle('Home');

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? <LoadingIcon /> : null}
      <h5>
        Welcome to the application for the safe sending of messages using encryption while storing
        messages in the database.
      </h5>
      <div>You must create an account to send messages.</div>
    </>
  );
};

export default Home;
