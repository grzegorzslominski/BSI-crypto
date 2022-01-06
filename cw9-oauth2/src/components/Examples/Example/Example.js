/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable func-names */
import { Link } from 'react-router-dom';
import styles from './Example.module.css';

const Example = function (props) {
  return (
    <div className={styles.example}>
      <h5>Message from: {props.author}</h5>
      <h6>Message content:</h6>
      <p>{props.content}</p>
      {
        // <Link to={`/examples/${props.id}`}> Show </Link>
      }
    </div>
  );
};

export default Example;
