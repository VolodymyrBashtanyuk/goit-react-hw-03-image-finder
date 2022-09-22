export const ImageGalleryItem = ({ items }) => {
  console.log(items);
  const imageList = items.map(({ tags, id, webformatURL }) => {
    return (
      <li key={id}>
        <img src={webformatURL} alt={tags} />
      </li>
    );
  });
  return imageList;
};
