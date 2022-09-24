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
    return (
      <>
        <Searchbar onSubmit={this.imageFormSubmit} />
        <FetchImage name={this.state.imageName} />
      </>
    );
  }
}
