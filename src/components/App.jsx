import { Component } from 'react';
// import { ImagesApi } from 'services/ImagesApi';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
// import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export class App extends Component {
  state = {
    imageName: '',
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.imageName !== this.state.imageName) {
  //     ImagesApi(this.state.imageName)
  //       .then(img => console.log(img))
  //       .catch(error => error);
  //   }
  // }

  imageFormSubmit = imageSearchName => {
    this.setState({ imageName: imageSearchName });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.imageFormSubmit} />
        <Loader />
        <ImageGallery onSearchName={this.state.imageName} />
      </>
    );
  }
}

/* 
        <ImageGalleryItem>
        <Loader>
        <Button>
        <Modal> */
