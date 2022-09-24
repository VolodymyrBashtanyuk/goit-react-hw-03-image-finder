export const ImageGalleryItem = ({ items, onOpen }) => {
  const imageList = items.map(({ tags, id, webformatURL }) => {
    return (
      <li key={id}>
        <img onClick={onOpen} id={id} src={webformatURL} alt={tags} />
      </li>
    );
  });
  return imageList;
};
