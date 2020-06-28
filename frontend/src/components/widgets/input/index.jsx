import React, { Component } from 'react';
import './index.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  onFieldChange(event) {
    this.props.parentCallback(event.target.name, event.target.value);
  }
  render() {
    const {
      id,
      name,
      ariaDescribedby,
      placeholder
    } = this.props;
    return (
      <input
        ref={(node) => {
          this.nodeInput = node;
        }}
        type="text"
        value={this.state.category}
        onChange={this.onFieldChange.bind(this)}
        className="form-control"
        id={id}
        name={name}
        aria-describedby={ariaDescribedby}
        placeholder={placeholder}
      />
    )
  }
}

export default Input;