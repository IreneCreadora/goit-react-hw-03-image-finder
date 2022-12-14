import { Component } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';

import '../styles.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static defaultProps = { onClose: null, children: null };

  static propTypes = {
    onClose: propTypes.func.isRequired,
    children: propTypes.node.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;
