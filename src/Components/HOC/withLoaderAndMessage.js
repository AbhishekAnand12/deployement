import Progress from '../Progress/Progress';

const withLoaderAndMessage = (Component) => (props) => {
  const { isLoading, data } = props;
  if (isLoading) {
    Progress();
  }
  if (data.length === 0) {
    return Progress();
  }
  return Component(props);
};
export default withLoaderAndMessage;
