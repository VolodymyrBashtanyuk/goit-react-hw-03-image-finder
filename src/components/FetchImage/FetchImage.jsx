import { Component } from 'react';
import { ImagesApi } from 'services/ImagesApi';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader, LoaderMoreButton } from 'components/Loader/Loader';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import { NoteTitle, Container } from './FetchImageStyle';

export class FetchImage extends Component {
  state = {
    imageData: [],
    load: false,
    loadButton: false,
    page: 1,
    notification: false,
    modalOpen: false,
    id: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { name } = this.props;
    const { fetchApi } = this;

    if (prevProps.name !== name && prevProps.name !== '') {
      this.setState({
        imageData: [],
        notification: false,
      });
    }

    if (prevProps.name !== name || page !== prevState.page) {
      this.setState({
        load: true,
        loadButton: true,
      });
      fetchApi(name, page);
    }
  }

  fetchApi = async (name, page) => {
    try {
      const api = await ImagesApi(name, page);
      const data = await api(this.moreImages(api.hits));

      return data;
    } catch (error) {
      this.setState({
        error,
      });
    } finally {
      this.setState({
        load: false,
        loadButton: false,
      });
    }
  };

  loadMoreButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  moreImages = data => {
    if (data.length === 0) {
      this.setState({
        notification: true,
      });
      return;
    }
    this.setState(prevState => {
      return {
        imageData: [...prevState.imageData, ...data],
      };
    });
  };

  openModal = ({ currentTarget, target }) => {
    if (currentTarget === target) {
      this.setState({ modalOpen: true, id: currentTarget.id });
    }
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { modalOpen, imageData, id, loadButton, load, notification } =
      this.state;
    const { closeModal, openModal, loadMoreButton } = this;
    const { name } = this.props;

    return (
      <>
        {modalOpen && (
          <Modal data={imageData} onClose={closeModal} idImage={id} />
        )}

        {imageData.length !== 0 ? (
          <>
            <ImageGallery>
              <ImageGalleryItem items={imageData} onOpen={openModal} />
            </ImageGallery>
            {loadButton ? (
              <LoaderMoreButton load={loadButton} />
            ) : (
              <Button onClick={loadMoreButton} />
            )}
          </>
        ) : (
          <Loader onLoad={load} />
        )}
        {notification && (
          <NoteTitle>
            Sorry :( no image with name <Container>{name}</Container>
          </NoteTitle>
        )}
      </>
    );
  }
}
