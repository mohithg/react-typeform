import React from 'react';

/**
 * Typeform component that renders each component of a form
 */
class typeForm extends React.Component {

  /**
   * constructor
   */
  constructor(props) {
    super(props);

    /**
     * Initial State
     */
    this.state = {
      current: 0,
    };

    /**
     * Styles
     */
    this.styles = {
      tfShow: {
        display: 'block',
      },
      tfHide: {
        display: 'none',
      },
    };

    /**
     * Binding this to methods
     */
    this.incState = this.incState.bind(this);
    this.isLastComponent = this.isLastComponent.bind(this);
  }

  /**
   * Set className for component to show/hide
   */
  setClass(element, tfStyle) {
    return React.cloneElement(element, {
      tfStyle,
    });
  }

  /**
   * Get the current component to show on screen
   */
  getCurrentView(children) {
    let allChildren;
    allChildren = React.Children.map(children, (child, index) => {
      let currentChild = this.setClass(child, this.styles.tfHide);
      if (index === this.state.current) {
        currentChild = this.setClass(child, this.styles.tfShow);
      }
      return currentChild;
    });
    /**
     * If all elements are shown then show a review screen
     */
    if (this.isLastComponent()) {
      allChildren = React.Children.map(children, (child) =>
        (this.setClass(child, this.styles.tfShow))
      );
    }
    return allChildren;
  }

  /**
   * Increment State counter
   */
  incState() {
    if (this.props.children.length > this.state.current) {
      const current = this.state.current + 1;
      this.setState({
        current,
      });
    }
    this.props.nextBtnOnClick();
  }

  /**
   * Check if last component
   */
  isLastComponent() {
    return this.props.children.length === this.state.current;
  }

  /**
   * render the typeform
   */
  render() {
    return (
      <div className="form-container">
        {this.getCurrentView(this.props.children)}
        {
          this.isLastComponent() ?
            <button
              type="submit"
              onClick={this.props.onSubmit}
              className={this.props.submitBtnClass}
            >
              {this.props.submitBtnText}
            </button> :
            <button
              onClick={this.incState}
              className={this.props.nextBtnClass}
            >
              {this.props.nextBtnText}
            </button>
        }
      </div>
    );
  }
}

/**
 * Validating propTypes
 */
typeForm.propTypes = {
  children: React.PropTypes.array.isRequired,
  onSubmit: React.PropTypes.func,
  submitBtnText: React.PropTypes.string,
  submitBtnClass: React.PropTypes.string,
  nextBtnText: React.PropTypes.string,
  nextBtnClass: React.PropTypes.string,
  nextBtnOnClick: React.PropTypes.func,
};

/**
 * Default Props
 */
typeForm.defaultProps = {
  nextBtnOnClick: () => {},
  onSubmit: () => {},
  submitBtnText: 'Save',
  nextBtnText: 'Next',
};

/**
 * export the typeform component
 */
export default typeForm;
