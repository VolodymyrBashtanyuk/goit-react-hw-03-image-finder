import { Component } from 'react';
import { ImagesApi } from 'services/ImagesApi';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader, LoaderMoreButton } from 'components/Loader/Loader';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';

export class FetchImage extends Component {
  state = {
    imageData: [],
    load: false,
    loadButton: false,
    page: 1,
    error: null,
    notification: '',
    modalOpen: false,
    id: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { name } = this.props;

    if (prevProps.name !== this.props.name) {
      this.setState({
        load: true,
      });
      this.fetchApi(name, page);
    } else if (this.state.page !== prevState.page) {
      this.setState({
        loadButton: true,
      });

      this.fetchMoreButton(name, page);
    }
  }

  fetchApi = async (name, page) => {
    try {
      const api = await ImagesApi(name, page);
      if (api.total === 0) {
        this.noImages(name);
        return;
      }
      const data = await api(
        this.setState({
          imageData: api.hits,
        })
      );
      return data;
    } catch (error) {
      this.setState({
        error,
      });
    } finally {
      this.setState({
        load: false,
      });
    }
  };

  fetchMoreButton = async (name, page) => {
    try {
      const apiMore = await ImagesApi(name, page);
      const data = await apiMore(this.moreImages(apiMore.hits));
      return data;
    } catch (error) {
      this.setState({
        error,
      });
    } finally {
      this.setState({
        loadButton: false,
      });
    }
  };

  loadMoreButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  noImages = name => {
    this.setState({
      notification: `Sorry no image with name ${name}`,
    });
  };

  moreImages = data => {
    this.setState(prevState => {
      return {
        imageData: [...prevState.imageData, ...data],
      };
    });
  };

  openModal = evt => {
    if (evt.currentTarget === evt.target) {
      this.setState({ modalOpen: true });
      this.setState({ id: evt.currentTarget.id });
    }
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { modalOpen, imageData, id, loadButton, load } = this.state;
    const { closeModal, openModal, loadMoreButton } = this;
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
            {this.state.loadButton ? (
              <LoaderMoreButton load={loadButton} />
            ) : (
              <Button onClick={loadMoreButton} />
            )}
          </>
        ) : (
          <Loader onLoad={load} />
        )}
        {this.state.notification !== '' && <h1>{this.state.notification}</h1>}
      </>
    );
  }
}
