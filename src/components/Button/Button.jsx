import { FiMoreHorizontal } from 'react-icons/fi';

export const Button = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      Load more
      <FiMoreHorizontal />
    </button>
  );
};
