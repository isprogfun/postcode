/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Tabs = __webpack_require__(1),
	    Search = __webpack_require__(2),
	    Saved = __webpack_require__(7);

	var Main = React.createClass({displayName: "Main",
	    getInitialState: function() {
	        return { currentId: 'search' };
	    },
	    changeTab: function(id) {
	        this.setState({ currentId: id });
	    },
	    render: function() {
	        var currentTab,
	            tabs = [
	                { name: '?', id: 'search' },
	                { name: '♡', id: 'saved' }
	            ];

	        if (this.state.currentId === 'search') {
	            currentTab = React.createElement(Search, null)
	        } else if (this.state.currentId === 'saved') {
	            currentTab = React.createElement(Saved, null)
	        }

	        return (
	            React.createElement("main", {className: "main"}, 
	                React.createElement(Tabs, {tabs:  tabs, onChangeTab:  this.changeTab, currentId:  this.state.currentId}), 
	                 currentTab 
	            )
	        );
	    }
	});

	React.render(React.createElement(Main, null), document.getElementById('container'));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React.createClass({displayName: "module.exports",
	    handleClick: function(e) {
	        this.props.onChangeTab(e.target.dataset.id);
	    },
	    render: function() {
	        return (
	            React.createElement("nav", {className: "tabs"}, 
	                React.createElement("ul", {className: "tabs__list"}, 
	                     this.props.tabs.map(this.renderTab) 
	                )
	            )
	        )
	    },
	    renderTab: function(tab) {
	        var className = 'tabs__item';

	        if (tab.id === this.props.currentId) {
	            className += ' tabs__item_active';
	        }

	        return React.createElement("li", {onClick:  this.handleClick, className:  className, key:  tab.id, "data-id":  tab.id},  tab.name);
	    }
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Finder = __webpack_require__(3),
	    PostcodeList = __webpack_require__(5);

	module.exports = React.createClass({displayName: "module.exports",
	    getInitialState: function() {
	        return { data: [] };
	    },
	    handleNewData: function(data) {
	        var saved = window.localStorage.getItem('saved');

	        saved = saved ? JSON.parse(saved) : [];

	        // Проверить пришедший список на наличие в избранном
	        data = data.data.map(function(item) {
	            saved.some(function(savedItem) {
	                if (savedItem.id === item.id) {
	                    item.saved = true;

	                    return true;
	                }
	            })

	            return item;
	        })

	        this.setState({ data: data });
	    },
	    render: function() {
	        return (
	            React.createElement("div", {className: "search"}, 
	                React.createElement("h2", null, "Поиск"), 
	                React.createElement(Finder, {onGetData:  this.handleNewData}), 
	                React.createElement(PostcodeList, {data:  this.state.data})
	            )
	        );
	    }
	});


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(4);

	module.exports = React.createClass({displayName: "module.exports",
	    componentWillMount: function() {
	        this.getData = Utils.debounce(this.getData, 200, true);
	    },
	    getData: function(text) {
	        var url = '//kladr-api.ru/api.php';

	        $.ajax({
	            url: url,
	            data: {
	                query: text,
	                oneString: 1,
	                limit: 10,
	                token: '552180d47c5239e6538b4590'
	            },
	            dataType: 'jsonp',
	            success: function(data) {
	                if (data.result && data.result.length) {
	                    this.props.onGetData({ data: data.result });
	                }
	            }.bind(this),
	            error: function(xhr, status, error) {
	                console.error(url, status, error.toString());
	            }.bind(this)
	        });
	    },
	    handleChange: function() {
	        var text = React.findDOMNode(this.refs.text).value.trim();

	        if (!text) {
	            this.props.onGetData({ data: [] });
	        } else {
	            this.getData(text);
	        }
	    },
	    render: function() {
	        return (
	            React.createElement("div", {className: "finder"}, 
	                React.createElement("input", {onChange:  this.handleChange, className: "finder__text", type: "text", placeholder: "Введите адрес", ref: "text"})
	            )
	        );
	    }
	});


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React.createClass({displayName: "module.exports",
	    statics: {
	        // Returns a function, that, as long as it continues to be invoked, will not
	        // be triggered. The function will be called after it stops being called for
	        // N milliseconds. If `immediate` is passed, trigger the function on the
	        // leading edge, instead of the trailing.
	        debounce: function(func, wait, immediate) {
	            var timeout;

	            return function() {
	                var context = this, args = arguments;
	                var later = function() {
	                    timeout = null;
	                    if (!immediate) func.apply(context, args);
	                };
	                var callNow = immediate && !timeout;
	                clearTimeout(timeout);
	                timeout = setTimeout(later, wait);
	                if (callNow) func.apply(context, args);
	            };
	        }
	    },
	    render: function() {

	    }
	});


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var PostcodeItem = __webpack_require__(6);

	module.exports = React.createClass({displayName: "module.exports",
	    render: function() {
	        // Выводим только те результаты, где есть индекс
	        var postcodeItems = this.props.data.filter(function(item) {
	            return item.zip;
	        });

	        return (
	            React.createElement("div", {className: "postcodeList"}, 
	                React.createElement("h2", null,  this.props.title), 
	                React.createElement("ul", {className: "postcodeList__list"}, 
	                     postcodeItems.map(function(item) {
	                        return (
	                            React.createElement(PostcodeItem, {item:  item, key:  item.id})
	                        )
	                    }) 
	                )
	            )
	        )
	    }
	});


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React.createClass({displayName: "module.exports",
	    getInitialState: function() {
	        return { saved: this.props.item.saved };
	    },
	    handleSaveClick: function() {
	        var that = this,
	            saved = window.localStorage.getItem('saved');

	        saved = saved ? JSON.parse(saved) : [];

	        if (this.state.saved) {
	            saved = saved.filter(function(item) {
	                return item.id !== that.props.item.id;
	            });
	        } else {
	            saved.push(this.props.item);
	        }

	        this.setState({ saved: !this.state.saved })
	        saved = JSON.stringify(saved);
	        window.localStorage.setItem('saved', saved);
	    },
	    render: function() {
	        var className = "postcodeList__save";

	        if (this.state.saved) {
	            className += " postcodeList__save_saved"
	        }

	        return (
	            React.createElement("li", {className: "postcodeList__item"}, 
	                React.createElement("span", {className:  className, onClick:  this.handleSaveClick}, "♡"), 
	                React.createElement("span", null,  this.props.item.zip, ": ",  this.props.item.fullName)
	            )
	        )
	    }
	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var PostcodeList = __webpack_require__(5);

	module.exports = React.createClass({displayName: "module.exports",
	    getInitialState: function() {
	        var saved = window.localStorage.getItem('saved');

	        saved = saved ? JSON.parse(saved) : [];
	        saved = saved.map(function(item) {
	            item.saved = true;

	            return item;
	        });

	        return { data: saved };
	    },
	    render: function() {
	        return (
	            React.createElement(PostcodeList, {data:  this.state.data, title: "Избранное"})
	        )
	    }
	});


/***/ }
/******/ ]);