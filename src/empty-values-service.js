import {DataType} from './data-type.js';
import {Errorf} from '@e22m4u/js-format';
import {Service} from '@e22m4u/js-service';
import {isDeepEqual} from './utils/index.js';
import {getDataTypeOf} from './utils/index.js';

/**
 * Empty values service.
 */
export class EmptyValuesService extends Service {
  /**
   * Empty values map.
   *
   * @type {Map<string, *[]>}
   */
  _emptyValuesMap = new Map([
    [DataType.ANY, [undefined, null]],
    [DataType.STRING, [undefined, null, '']],
    [DataType.NUMBER, [undefined, null, 0]],
    [DataType.BOOLEAN, [undefined, null]],
    [DataType.ARRAY, [undefined, null, []]],
    [DataType.OBJECT, [undefined, null, {}]],
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
      throw new Errorf(
        'The argument "dataType" of the EmptyValuesService.setEmptyValuesOf ' +
          'must be one of data types: %l, but %v given.',
        Object.values(DataType),
        dataType,
      );
    if (!Array.isArray(emptyValues))
      throw new Errorf(
        'The argument "emptyValues" of the EmptyValuesService.setEmptyValuesOf ' +
          'must be an Array, but %v given.',
        emptyValues,
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
    return this._emptyValuesMap.get(dataType).some(v => isDeepEqual(v, value));
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
      throw new Errorf(
        'The argument "dataType" of EmptyValuesService.isEmptyByType ' +
          'must be one of data types: %l, but %v given.',
        Object.values(DataType),
        dataType,
      );
    return this._emptyValuesMap.get(dataType).some(v => isDeepEqual(v, value));
  }
}
