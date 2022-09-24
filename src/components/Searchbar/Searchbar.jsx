import { Component } from 'react';
import { ImSearch } from 'react-icons/im';

export class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleChange = evt => {
    const { value } = evt.currentTarget;
    this.setState({
      searchName: value,
    });
  };

  handleSubmit = evt => {
    const { searchName } = this.state;
    const { onSubmit } = this.props;
    const { reset } = this;

    evt.preventDefault();
    onSubmit(searchName);
    reset();
  };

  reset = () => {
    this.setState({
      searchName: '',
    });
  };

  render() {
    const { handleSubmit, handleChange } = this;
    const { searchName } = this.state;

    return (
      <header className="searchbar">
        <form className="form" onSubmit={handleSubmit}>
          <button type="submit" className="button">
            <ImSearch />
            Search
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            onChange={handleChange}
            value={searchName}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
