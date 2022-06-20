import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';

const PrivateLayout = (props) => {
  const { children } = props;

  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setAuthenticated(true);
    } else {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  if (authenticated) {
    return (
      <div>
        <Navbar />
        {children}
      </div>
    );
  }
  return <div />;
};

PrivateLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateLayout;
