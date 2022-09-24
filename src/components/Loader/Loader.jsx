import { Circles, ThreeDots } from 'react-loader-spinner';

export const Loader = ({ onLoad }) => {
  return (
    <Circles
      height="50vh"
      width="50vw"
      color="#0f66a0"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={onLoad}
    />
  );
};

export const LoaderMoreButton = ({ load }) => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#0f66a0"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={load}
    />
  );
};
