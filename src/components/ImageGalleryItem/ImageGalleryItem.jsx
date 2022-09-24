import PropTypes from 'prop-types';
import { Item, Img } from './ImageGalleryItemsStyle';

export const ImageGalleryItem = ({ items, onOpen }) => {
  const imageList = items.map(({ tags, id, webformatURL }) => {
    return (
      <Item key={id}>
        <Img onClick={onOpen} id={id} src={webformatURL} alt={tags} />
      </Item>
    );
  });
  return imageList;
};

ImageGalleryItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      tags: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
  onOpen: PropTypes.func.isRequired,
};
