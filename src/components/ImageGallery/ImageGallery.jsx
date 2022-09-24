import PropTypes from 'prop-types';
import { List } from './ImageGalleryStyle';

export const ImageGallery = ({ children }) => {
  return <List>{children}</List>;
};

ImageGallery.propTypes = {
  children: PropTypes.element.isRequired,
};
