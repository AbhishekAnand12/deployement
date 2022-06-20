import PropTypes from 'prop-types';
import React from 'react';
import AddFeedback from './AddFeedback';

const AddFeedbackFullpage = (props) => {
  const { role } = props;
  return <AddFeedback data={role} />;
};

AddFeedbackFullpage.propTypes = {
  role: PropTypes.string,
};

AddFeedbackFullpage.defaultProps = {
  role: '',
};

export default AddFeedbackFullpage;
