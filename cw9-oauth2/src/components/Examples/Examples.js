/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable func-names */
import Example from './Example/Example';
import styles from './Examples.module.css';

const Examples = function (props) {
  return (
    <div className={styles.containers}>
      <h2 className={styles.title}>All my message:</h2>
      {props.examples.map((example) => (
        <Example key={example.id} {...example} />
      ))}
    </div>
  );
};

export default Examples;
