"use strict";

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.keys.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ar = require("./ar");

Object.keys(_ar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ar[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ar[key];
    }
  });
});
//# sourceMappingURL=index.js.map