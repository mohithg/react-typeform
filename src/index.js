import React from 'react';
import PropTypes from 'proptypes';

/**
 * Typeform component that renders each component of a form
 */
class TypeForm extends React.Component {

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
    this.decState = this.decState.bind(this);
    this.isFirstComponent = this.isFirstComponent.bind(this);
    this.isLastComponent = this.isLastComponent.bind(this);
  }

  /**
   * Set className for component to show/hide
   */
  setClass(element, tfStyle) {
    if (!element) { return; }
    const Element = element.type;
    return (<div style={tfStyle}>
        <Element
          {...element.props}  
        />
      </div>);
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
    if (this.state.current < this.props.children.length) {
      const current = this.state.current + 1;
      this.setState({
        current,
      });
    }
    this.props.nextBtnOnClick();
  }

  /**
   * Deccrement State counter
   */
  decState() {
    if (this.state.current > 0) {
      const current = this.state.current - 1;
      this.setState({
        current,
      });
    }
    this.props.nextBtnOnClick();
  }

  /**
   * Check if last component
   */
  isFirstComponent() {
    return this.state.current === 0;
  }

  /**
   * Check if last component
   */
  isLastComponent() {
    return this.state.current === this.props.children.length;
  }

  /**
   * render the typeform
   */
  render() {
    return (
      <div className="form-container">
        {this.getCurrentView(this.props.children)}
        {
          !this.isFirstComponent() &&
            <button
              onClick={this.decState}
              className={this.props.backBtnClass}
            >
              {this.props.backBtnText}
            </button>
        }
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
TypeForm.propTypes = {
  children: PropTypes.array.isRequired,
  onSubmit: PropTypes.func,
  submitBtnText: PropTypes.string,
  submitBtnClass: PropTypes.string,
  nextBtnText: PropTypes.string,
  nextBtnClass: PropTypes.string,
  nextBtnOnClick: PropTypes.func,
  backBtnText: PropTypes.string,
  backBtnClass: PropTypes.string,
  backBtnOnClick: PropTypes.func,
};

/**
 * Default Props
 */
TypeForm.defaultProps = {
  nextBtnOnClick: () => {},
  backBtnOnClick: () => {},
  onSubmit: () => {},
  submitBtnText: 'Save',
  nextBtnText: 'Next',
  backBtnText: 'Back',
};

/**
 * export the typeform component
 */
export default TypeForm;
