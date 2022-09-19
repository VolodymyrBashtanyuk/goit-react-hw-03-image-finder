import PropTypes from 'prop-types';
import { Button } from './FeedbackOptionStyle';

export const FeedbackOptions = ({ options, onLeaveFeedback }) => {
  const btn = options.map((element, index) => {
    return (
      <Button
        key={index}
        name={element.toLowerCase()}
        type="button"
        onClick={onLeaveFeedback}
      >
        {element}
      </Button>
    );
  });

  return <>{btn}</>;
};

FeedbackOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  onLeaveFeedback: PropTypes.func,
};
