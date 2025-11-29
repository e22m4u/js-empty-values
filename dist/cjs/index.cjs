var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  EmptyValuesService: () => EmptyValuesService
});
module.exports = __toCommonJS(index_exports);

// src/data-type.js
var DataType = {
  ANY: "any",
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
  ARRAY: "array",
  OBJECT: "object"
};

// src/empty-values-service.js
var import_js_format = require("@e22m4u/js-format");
var import_js_service = require("@e22m4u/js-service");

// src/utils/is-deep-equal.js
function isDeepEqual(firstValue, secondValue) {
  const cached = /* @__PURE__ */ new WeakMap();
  const compare = /* @__PURE__ */ __name((a, b) => {
    if (a === null || b === null) return a === b;
    if (typeof a !== "object" || typeof b !== "object") return a === b;
    if (a.constructor !== b.constructor) return false;
    const dataTypeA = Array.isArray(a) ? "array" : "object";
    const dataTypeB = Array.isArray(b) ? "array" : "object";
    if (dataTypeA !== dataTypeB) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    const symbolsA = Object.getOwnPropertySymbols(a);
    const symbolsB = Object.getOwnPropertySymbols(b);
    if (symbolsA.length !== symbolsB.length) return false;
    let setForA = cached.get(a);
    if (setForA == null) {
      setForA = /* @__PURE__ */ new Set();
      cached.set(a, setForA);
    } else if (setForA.has(b)) {
      return true;
    }
    setForA.add(b);
    let setForB = cached.get(b);
    if (setForB == null) {
      setForB = /* @__PURE__ */ new Set();
      cached.set(b, setForB);
    } else if (setForB.has(a)) {
      return true;
    }
    setForB.add(a);
    const propertyNamesA = [...keysA, ...symbolsA];
    for (const propertyNameA of propertyNamesA) {
      if (!Object.prototype.hasOwnProperty.call(b, propertyNameA)) return false;
      const propertyValueA = a[propertyNameA];
      const propertyValueB = b[propertyNameA];
      if (!compare(propertyValueA, propertyValueB)) return false;
    }
    return true;
  }, "compare");
  return compare(firstValue, secondValue);
}
__name(isDeepEqual, "isDeepEqual");

// src/utils/get-data-type-of.js
function getDataTypeOf(value) {
  if (typeof value === "string") {
    return DataType.STRING;
  } else if (typeof value === "number") {
    return DataType.NUMBER;
  } else if (typeof value === "boolean") {
    return DataType.BOOLEAN;
  } else if (Array.isArray(value)) {
    return DataType.ARRAY;
  } else if (typeof value === "object" && value !== null) {
    return DataType.OBJECT;
  }
  return DataType.ANY;
}
__name(getDataTypeOf, "getDataTypeOf");

// src/empty-values-service.js
var _EmptyValuesService = class _EmptyValuesService extends import_js_service.Service {
  /**
   * Empty values map.
   *
   * @type {Map<string, *[]>}
   */
  _emptyValuesMap = /* @__PURE__ */ new Map([
    [DataType.ANY, [void 0, null]],
    [DataType.STRING, [void 0, null, ""]],
    [DataType.NUMBER, [void 0, null, 0]],
    [DataType.BOOLEAN, [void 0, null]],
    [DataType.ARRAY, [void 0, null, []]],
    [DataType.OBJECT, [void 0, null, {}]]
  ]);
  /**
   * Set empty values of data type.
   *
   * @param {DataType} dataType
   * @param {*[]} emptyValues
   * @returns {EmptyValuesService}
   */
  setEmptyValuesOf(dataType, emptyValues) {
    if (!Object.values(DataType).includes(dataType))
      throw new import_js_format.Errorf(
        'The argument "dataType" of the EmptyValuesService.setEmptyValuesOf must be one of data types: %l, but %v given.',
        Object.values(DataType),
        dataType
      );
    if (!Array.isArray(emptyValues))
      throw new import_js_format.Errorf(
        'The argument "emptyValues" of the EmptyValuesService.setEmptyValuesOf must be an Array, but %v given.',
        emptyValues
      );
    this._emptyValuesMap.set(dataType, emptyValues);
    return this;
  }
  /**
   * Is empty.
   *
   * @param {*} value
   * @returns {boolean}
   */
  isEmpty(value) {
    const dataType = getDataTypeOf(value);
    return this._emptyValuesMap.get(dataType).some((v) => isDeepEqual(v, value));
  }
  /**
   * Is empty for type.
   *
   * @param {DataType} dataType
   * @param {*} value
   * @returns {boolean}
   */
  isEmptyByType(dataType, value) {
    if (!Object.values(DataType).includes(dataType))
      throw new import_js_format.Errorf(
        'The argument "dataType" of EmptyValuesService.isEmptyByType must be one of data types: %l, but %v given.',
        Object.values(DataType),
        dataType
      );
    return this._emptyValuesMap.get(dataType).some((v) => isDeepEqual(v, value));
  }
};
__name(_EmptyValuesService, "EmptyValuesService");
var EmptyValuesService = _EmptyValuesService;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmptyValuesService
});
