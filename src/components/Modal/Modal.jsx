import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  state = {
    modalImage: {},
  };
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    console.log('ypaaa');
    document.removeEventListener('keydown', this.closeModal);
    this.serchImage();
  }

  componentDidUpdate(prevState, prevProps) {
    const { idImage } = this.props;
    if (prevProps.idImage !== idImage) {
    }
  }

  serchImage = () => {
    const { data, idImage } = this.props;

    const search = data.find(({ id }) => {
      return id === Number(idImage);
    });
    return this.setState({
      modalImage: search,
    });
  };

  closeModal = ({ currentTarget, target, code }) => {
    if (currentTarget === target || code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.state.modalImage;

    return createPortal(
      <div onClick={this.closeModal} className="overlay">
        <div className="modal">
          <img onClick={this.closeModal} src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

// = ({ data, onClose, idImage }) => {
//   const serch = data.find(({ id }) => {
//     return id === Number(idImage);
//   });

//   return createPortal(
//     <div className="overlay">
//       <div onClick={onClose} className="modal">
//         <img src={serch.largeImageURL} alt={serch.tags} />
//       </div>
//     </div>,
//     modalRoot
//   );
// };
