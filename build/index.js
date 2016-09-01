'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Typeform component that renders each component of a form
 */
var typeForm = function (_React$Component) {
  _inherits(typeForm, _React$Component);

  /**
   * constructor
   */
  function typeForm(props) {
    _classCallCheck(this, typeForm);

    /**
     * Initial State
     */
    var _this = _possibleConstructorReturn(this, (typeForm.__proto__ || Object.getPrototypeOf(typeForm)).call(this, props));

    _this.state = {
      current: 0
    };

    /**
     * Styles
     */
    _this.styles = {
      tfShow: {
        display: 'block'
      },
      tfHide: {
        display: 'none'
      }
    };

    /**
     * Binding this to methods
     */
    _this.incState = _this.incState.bind(_this);
    _this.isLastComponent = _this.isLastComponent.bind(_this);
    return _this;
  }

  /**
   * Set className for component to show/hide
   */


  _createClass(typeForm, [{
    key: 'setClass',
    value: function setClass(element, tfStyle) {
      return _react2.default.cloneElement(element, {
        tfStyle: tfStyle
      });
    }

    /**
     * Get the current component to show on screen
     */

  }, {
    key: 'getCurrentView',
    value: function getCurrentView(children) {
      var _this2 = this;

      var allChildren = void 0;
      allChildren = _react2.default.Children.map(children, function (child, index) {
        var currentChild = _this2.setClass(child, _this2.styles.tfHide);
        if (index === _this2.state.current) {
          currentChild = _this2.setClass(child, _this2.styles.tfShow);
        }
        return currentChild;
      });
      /**
       * If all elements are shown then show a review screen
       */
      if (this.isLastComponent()) {
        allChildren = _react2.default.Children.map(children, function (child) {
          return _this2.setClass(child, _this2.styles.tfShow);
        });
      }
      return allChildren;
    }

    /**
     * Increment State counter
     */

  }, {
    key: 'incState',
    value: function incState() {
      if (this.props.children.length > this.state.current) {
        var current = this.state.current + 1;
        this.setState({
          current: current
        });
      }
      this.props.nextBtnOnClick();
    }

    /**
     * Check if last component
     */

  }, {
    key: 'isLastComponent',
    value: function isLastComponent() {
      return this.props.children.length === this.state.current;
    }

    /**
     * render the typeform
     */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'form-container' },
        this.getCurrentView(this.props.children),
        this.isLastComponent() ? _react2.default.createElement(
          'button',
          {
            type: 'submit',
            onClick: this.props.onSubmit,
            className: this.props.submitBtnClass
          },
          this.props.submitBtnText
        ) : _react2.default.createElement(
          'button',
          {
            onClick: this.incState,
            className: this.props.nextBtnClass
          },
          this.props.nextBtnText
        )
      );
    }
  }]);

  return typeForm;
}(_react2.default.Component);

/**
 * Validating propTypes
 */


typeForm.propTypes = {
  children: _react2.default.PropTypes.element.isRequired,
  onSubmit: _react2.default.PropTypes.func,
  submitBtnText: _react2.default.PropTypes.string,
  submitBtnClass: _react2.default.PropTypes.string,
  nextBtnText: _react2.default.PropTypes.string,
  nextBtnClass: _react2.default.PropTypes.string,
  nextBtnOnClick: _react2.default.PropTypes.func
};

/**
 * Default Props
 */
typeForm.defaultProps = {
  nextBtnOnClick: function nextBtnOnClick() {},
  onSubmit: function onSubmit() {},
  submitBtnText: 'Save',
  nextBtnText: 'Next'
};

/**
 * export the typeform component
 */
exports.default = typeForm;