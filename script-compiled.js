'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var destination = document.querySelector('#root');

var ENCIRCLEMENT_TIME_DISPLAY_INTERVAL = 300;

var Counter = function (_React$Component) {
    _inherits(Counter, _React$Component);

    function Counter() {
        _classCallCheck(this, Counter);

        return _possibleConstructorReturn(this, (Counter.__proto__ || Object.getPrototypeOf(Counter)).apply(this, arguments));
    }

    _createClass(Counter, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { id: 'stopwatch' },
                this.props.value
            );
        }
    }]);

    return Counter;
}(React.Component);

var Button = function (_React$Component2) {
    _inherits(Button, _React$Component2);

    function Button() {
        _classCallCheck(this, Button);

        return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
    }

    _createClass(Button, [{
        key: 'render',
        value: function render() {
            var _React$createElement;

            return React.createElement(
                'a',
                (_React$createElement = { href: '#', id: 'button' }, _defineProperty(_React$createElement, 'id', this.props.id), _defineProperty(_React$createElement, 'onMouseDown', this.props.onClick), _React$createElement),
                this.props.name
            );
        }
    }]);

    return Button;
}(React.Component);

var ResultList = function (_React$Component3) {
    _inherits(ResultList, _React$Component3);

    function ResultList() {
        _classCallCheck(this, ResultList);

        return _possibleConstructorReturn(this, (ResultList.__proto__ || Object.getPrototypeOf(ResultList)).apply(this, arguments));
    }

    _createClass(ResultList, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { id: 'resultList' },
                React.createElement(
                    'ol',
                    { reversed: 'reversed', id: 'results' },
                    this.props.value
                ),
                React.createElement(Button, { id: 'clear', onClick: this.props.onButtonClick, name: 'Clear list' })
            );
        }
    }]);

    return ResultList;
}(React.Component);
// klasa Stopwatch


var Stopwatch = function (_React$Component4) {
    _inherits(Stopwatch, _React$Component4);

    function Stopwatch() {
        _classCallCheck(this, Stopwatch);

        var _this4 = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

        _this4.reset = function () {
            var timesTemp = _this4.state.times;
            timesTemp.minutes = timesTemp.seconds = timesTemp.miliseconds = 0;
            _this4.setState({ times: timesTemp });
        };

        _this4.printEncirclementTimes = function () {
            var items = _this4.state.encirclementTimes.map(function (item, id) {

                return React.createElement(
                    'li',
                    { key: id },
                    item
                );
            });
            return items;
        };

        _this4.print = function () {
            var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this4.state.times;

            _this4.printTime = _this4.format(times);
        };

        _this4.format = function (times) {
            return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
        };

        _this4.start = function () {
            if (!_this4.state.running) {
                _this4.setState({ running: true });
                _this4.watch = setInterval(function () {
                    _this4.step();
                }, 10);
                _this4.displayTime = setInterval(function () {
                    return _this4.print();
                }, 10);
                _this4.buttonStopName = 'Stop';
            }
        };

        _this4.step = function () {
            if (!_this4.state.running) return;
            _this4.calculate();
        };

        _this4.calculate = function () {
            var timesTemp = _this4.state.times;

            timesTemp.miliseconds += 1;
            if (timesTemp.miliseconds >= 100) {
                timesTemp.seconds += 1;
                timesTemp.miliseconds = 0;
            }
            if (timesTemp.seconds >= 60) {
                timesTemp.minutes += 1;
                timesTemp.seconds = 0;
            }
            _this4.setState({ times: timesTemp });
        };

        _this4.stop = function () {
            //stop stopwatch
            if (_this4.state.running) {
                _this4.setState({ running: false });
                clearInterval(_this4.watch);
                clearInterval(_this4.displayTime);
                _this4.buttonStopName = 'Reset';

                // zatrzymanie stopera i kliknięcie resetuje stoper	  
            } else {
                _this4.reset();
                _this4.print();
                _this4.buttonStopName = 'Stop';
            }
        };

        _this4.encirclement = function () {
            if (_this4.state.running) {
                var currentEncirclementTime = _this4.state.times;

                _this4.setState({
                    encirclementTimes: [_this4.format(currentEncirclementTime)].concat(_toConsumableArray(_this4.state.encirclementTimes))
                });
                clearInterval(_this4.displayTime);
                clearTimeout(_this4.timeoutEncirclementTime);

                // wyświetlenie czasu okrążenia 
                _this4.print(currentEncirclementTime);
                _this4.timeoutEncirclementTime = setTimeout(function () {
                    _this4.displayTime = setInterval(function () {
                        return _this4.print();
                    }, 10);
                }, ENCIRCLEMENT_TIME_DISPLAY_INTERVAL);
            }
            //        else return;
        };

        _this4.clear = function () {
            _this4.setState({
                encirclementTimes: []
            });
        };

        _this4.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            encirclementTimes: []
        };
        _this4.printTime = _this4.format(_this4.state.times);
        _this4.buttonStopName = 'Stop';
        return _this4;
    }

    _createClass(Stopwatch, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { id: 'app' },
                    React.createElement(Counter, { value: this.printTime }),
                    React.createElement(
                        'nav',
                        { id: 'controls' },
                        React.createElement(Button, { id: 'start', onClick: this.start, name: 'Start' }),
                        React.createElement(Button, { id: 'encirclement', onClick: this.encirclement, name: 'Encirclement' }),
                        React.createElement(Button, { id: 'stop', onClick: this.stop, name: this.buttonStopName })
                    )
                ),
                React.createElement(ResultList, { value: this.printEncirclementTimes(), onButtonClick: this.clear })
            );
        }

        // metoda reset 


        // metoda print    


        // metoda format - przygotowywuje tekst do wyświetlenia 


        // implementacja funkcji start


        // metoda step - sprawdza czy timer jest uruchomiony


        // metoda calculate - przelicza min, sek i milisek


        // metoda stop - zatrzymanie timera


        // dodanie czasu okrążenia


        // czyszczenie listy wyników

    }]);

    return Stopwatch;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), destination);

// implementacja funkcji pad0 - dodającej zero do liczbjednocyfrowych
function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        return '0' + result;
    }
    return result;
}
