(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
var Application, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

require('lib/view_helper');

Application = (function(_super) {
  __extends(Application, _super);

  function Application() {
    this.initialize = __bind(this.initialize, this);
    _ref = Application.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Application.prototype.initialize = function() {
    var _this = this;
    this.on("initialize:after", function(options) {
      Backbone.history.start();
      return typeof Object.freeze === "function" ? Object.freeze(_this) : void 0;
    });
    this.addInitializer(function(options) {
      var AppLayout;
      AppLayout = require('views/AppLayout');
      _this.layout = new AppLayout();
      return _this.layout.render();
    });
    this.addInitializer(function(options) {
      var Router;
      Router = require('lib/router');
      return _this.router = new Router();
    });
    this.start();
    return Lungo.init({});
  };

  return Application;

})(Backbone.Marionette.Application);

module.exports = new Application();

});

;require.register("initialize", function(exports, require, module) {
var application;

application = require('application');

$(function() {
  return application.initialize();
});

});

;require.register("lib/router", function(exports, require, module) {
var HomeView, Router, application, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

application = require('application');

HomeView = require('views/HomeView');

module.exports = Router = (function(_super) {
  __extends(Router, _super);

  function Router() {
    this.home = __bind(this.home, this);
    _ref = Router.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Router.prototype.routes = {
    '': 'home'
  };

  Router.prototype.home = function() {
    var hv;
    hv = new HomeView();
    return application.layout.content.show(hv);
  };

  return Router;

})(Backbone.Router);

});

;require.register("lib/view_helper", function(exports, require, module) {


});

;require.register("models/collection", function(exports, require, module) {
var Collection, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Collection = (function(_super) {
  __extends(Collection, _super);

  function Collection() {
    _ref = Collection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return Collection;

})(Backbone.Collection);

console.log('yay');

});

;require.register("models/model", function(exports, require, module) {
var Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Model = (function(_super) {
  __extends(Model, _super);

  function Model() {
    _ref = Model.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return Model;

})(Backbone.Model);

});

;require.register("views/AppLayout", function(exports, require, module) {
var AppLayout, application, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

application = require('application');

module.exports = AppLayout = (function(_super) {
  __extends(AppLayout, _super);

  function AppLayout() {
    _ref = AppLayout.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  AppLayout.prototype.template = 'views/templates/appLayout';

  AppLayout.prototype.el = "body";

  AppLayout.prototype.regions = {
    content: "#content"
  };

  return AppLayout;

})(Backbone.Marionette.Layout);

});

;require.register("views/HomeView", function(exports, require, module) {
var HomeView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = HomeView = (function(_super) {
  __extends(HomeView, _super);

  function HomeView() {
    _ref = HomeView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HomeView.prototype.id = 'home-view';

  HomeView.prototype.template = 'views/templates/home';

  return HomeView;

})(Backbone.Marionette.ItemView);

});

;require.register("views/templates/appLayout", function(exports, require, module) {
var __templateData = function anonymous(locals) {
var buf = [];
buf.push("<div id=\"content\"></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/home", function(exports, require, module) {
var __templateData = function anonymous(locals) {
var buf = [];
buf.push("<section id=\"main\"><article id=\"main-article\">Your content</article></section>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//@ sourceMappingURL=app.js.map