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

  return loading ? <LoadingIcon /> : null;
};

export default Home;
