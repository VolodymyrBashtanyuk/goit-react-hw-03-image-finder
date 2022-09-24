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

      ImagesApi(name, page)
        .then(items => {
          this.setState({
            imageData: items,
          });
        })
        .catch(error => {
          this.setState({ error });
        })
        .finally(() => {
          this.setState({
            load: false,
          });
        });
    } else if (this.state.page !== prevState.page) {
      this.setState({
        loadButton: true,
      });
      ImagesApi(name, page)
        .then(items => {
          this.moreImages(items);
        })
        .catch(error => {
          this.setState({ error });
        })
        .finally(() => {
          this.setState({
            loadButton: false,
          });
        });
    }
  }

  fetchApi = () => {};

  loadMoreButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
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
    return (
      <>
        {this.state.modalOpen && (
          <Modal
            data={this.state.imageData}
            onClose={this.closeModal}
            idImage={this.state.id}
          />
        )}
        <Loader onLoad={this.state.load} />
        {this.state.imageData.length !== 0 && (
          <>
            <ImageGallery>
              <ImageGalleryItem
                items={this.state.imageData}
                onOpen={this.openModal}
              />
            </ImageGallery>
            {this.state.loadButton ? (
              <LoaderMoreButton load={this.state.loadButton} />
            ) : (
              <Button onClick={this.loadMoreButton} />
            )}
          </>
        )}
      </>
    );
  }
}
