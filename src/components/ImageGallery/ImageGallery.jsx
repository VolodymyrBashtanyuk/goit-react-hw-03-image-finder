import { Component } from 'react';
import { ImagesApi } from 'services/ImagesApi';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export class ImageGallery extends Component {
  state = {
    imageData: null,
    page: 1,
    status: 'idle',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.onSearchName !== this.props.onSearchName) {
      ImagesApi(this.props.onSearchName, this.state.page)
        .then(img => this.setState({ imageData: img }))
        .catch(error => this.setState({ error: error }));
    }

    if (prevState.page !== this.state.page) {
      ImagesApi(this.props.onSearchName, this.state.page)
        .then(data => this.setState(this.moreImages(data)))
        .catch(error => this.setState({ error: error }));
    }
  }

  loadMoreButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  moreImages = data => {
    this.setState(prevState => {
      // const newImages = (...data);
      return {
        imageData: [...prevState.imageData, ...data],
      };
    });
  };

  render() {
    return (
      <>
        <ul>
          {this.state.imageData !== null && (
            <ImageGalleryItem items={this.state.imageData} />
          )}
        </ul>

        <Button onClick={this.loadMoreButton} />
      </>
    );
  }
}
