import { Component } from 'react';
import { ImagesApi } from 'services/ImagesApi';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader, LoaderMoreButton } from 'components/Loader/Loader';
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

  componentDidMount() {
    const { page } = this.state;
    const { name } = this.props;
    const { fetchApi } = this;

    this.setState({
      load: true,
    });

    fetchApi(name, page);
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { name } = this.props;
    const { nextPageApi } = this;

    // for  new search update
    if (prevProps.name !== name) {
      this.setState({
        imageData: [],
        page: 1,
        load: true,
        notification: false,
      });
    }

    if (page !== prevState.page) {
      this.setState({
        loadButton: true,
        notification: false,
      });
      nextPageApi(name, page);
    }
  }

  fetchApi = async (name, page) => {
    try {
      const api = await ImagesApi(name, page);
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

  nextPageApi = async (name, page) => {
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
        page: 2,
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
            <ImageGallery items={imageData} onOpen={openModal} />
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
