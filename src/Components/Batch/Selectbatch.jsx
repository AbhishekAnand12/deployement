import React from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { SELECTBATCHDATA } from '../../ApolloClient/query';
import Batch from './Batch';

const Selectbatch = ({ handleonBatchChange }) => {
  const { data: allData, loading } = useQuery(SELECTBATCHDATA);
  const data = allData?.getBatchData;
  if (loading) return <h4>Loading ... </h4>;
  return <Batch handleonBatchChange={handleonBatchChange} batchname={data} />;
};

Selectbatch.propTypes = {
  handleonBatchChange: PropTypes.func.isRequired,
};

export default Selectbatch;
