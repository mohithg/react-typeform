'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _proptypes = require('proptypes');

var _proptypes2 = _interopRequireDefault(_proptypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Typeform component that renders each component of a form
 */
var TypeForm = function (_React$Component) {
  _inherits(TypeForm, _React$Component);

  /**
   * constructor
   */
  function TypeForm(props) {
    _classCallCheck(this, TypeForm);

    /**
     * Initial State
     */
    var _this = _possibleConstructorReturn(this, (TypeForm.__proto__ || Object.getPrototypeOf(TypeForm)).call(this, props));

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
    _this.decState = _this.decState.bind(_this);
    _this.isFirstComponent = _this.isFirstComponent.bind(_this);
    _this.isLastComponent = _this.isLastComponent.bind(_this);
    return _this;
  }

  /**
   * Set className for component to show/hide
   */


  _createClass(TypeForm, [{
    key: 'setClass',
    value: function setClass(element, tfStyle) {
      if (!element) {
        return;
      }
      var Element = element.type;
      return _react2.default.createElement(
        'div',
        { style: tfStyle },
        _react2.default.createElement(Element, element.props)
      );
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
      if (this.state.current < this.props.children.length) {
        var current = this.state.current + 1;
        this.setState({
          current: current
        });
      }
      this.props.nextBtnOnClick();
    }

    /**
     * Deccrement State counter
     */

  }, {
    key: 'decState',
    value: function decState() {
      if (this.state.current > 0) {
        var current = this.state.current - 1;
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
    key: 'isFirstComponent',
    value: function isFirstComponent() {
      return this.state.current === 0;
    }

    /**
     * Check if last component
     */

  }, {
    key: 'isLastComponent',
    value: function isLastComponent() {
      return this.state.current === this.props.children.length;
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
        !this.isFirstComponent() && _react2.default.createElement(
          'button',
          {
            onClick: this.decState,
            className: this.props.backBtnClass
          },
          this.props.backBtnText
        ),
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

  return TypeForm;
}(_react2.default.Component);

/**
 * Validating propTypes
 */


TypeForm.propTypes = {
  children: _proptypes2.default.array.isRequired,
  onSubmit: _proptypes2.default.func,
  submitBtnText: _proptypes2.default.string,
  submitBtnClass: _proptypes2.default.string,
  nextBtnText: _proptypes2.default.string,
  nextBtnClass: _proptypes2.default.string,
  nextBtnOnClick: _proptypes2.default.func,
  backBtnText: _proptypes2.default.string,
  backBtnClass: _proptypes2.default.string,
  backBtnOnClick: _proptypes2.default.func
};

/**
 * Default Props
 */
TypeForm.defaultProps = {
  nextBtnOnClick: function nextBtnOnClick() {},
  backBtnOnClick: function backBtnOnClick() {},
  onSubmit: function onSubmit() {},
  submitBtnText: 'Save',
  nextBtnText: 'Next',
  backBtnText: 'Back'
};

/**
 * export the typeform component
 */
exports.default = TypeForm;