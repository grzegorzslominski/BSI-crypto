/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import LoadingIcon from '../../UI/LoadingIcon';

const Example = function () {
  const { id } = useParams();
  const [example, setExample] = useState(null);
  const [loading, setLoading] = useState(true);

  const setTitle = useWebsiteTitle();

  const fetchExample = () => {
    setExample({
      id: 2,
      name: 'Example #2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat id lorem vitae accumsan.'
    });
    setLoading(false);
    setTitle('Example');
  };

  useEffect(() => {
    // pobieranie danych
    setTimeout(() => {
      fetchExample();
    }, 500);
  }, []);
  return loading ? <LoadingIcon /> : <h1>Example: {example.name}</h1>;
};
export default Example;
