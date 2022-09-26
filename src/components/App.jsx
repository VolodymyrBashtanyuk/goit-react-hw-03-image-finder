import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { FetchImage } from './FetchImage/FetchImage';

export class App extends Component {
  state = {
    imageName: '',
  };

  imageFormSubmit = imageSearchName => {
    this.setState({ imageName: imageSearchName });
  };

  render() {
    const { imageName } = this.state;
    const { imageFormSubmit } = this;

    return (
      <>
        <Searchbar onSubmit={imageFormSubmit} />
        {imageName !== '' && <FetchImage name={imageName} />}
      </>
    );
  }
}
