import { Component } from 'react';
import { ImSearch } from 'react-icons/im';

export class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleChange = evt => {
    this.setState({ searchName: evt.currentTarget.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <ImSearch />
            Search
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            onChange={this.handleChange}
            value={this.state.searchName}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
