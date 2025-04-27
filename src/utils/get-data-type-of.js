import {DataType} from '../data-type.js';

/**
 * Get data type of.
 *
 * @param {*} value
 * @returns {string}
 */
export function getDataTypeOf(value) {
  if (typeof value === 'string') {
    return DataType.STRING;
  } else if (typeof value === 'number') {
    return DataType.NUMBER;
  } else if (typeof value === 'boolean') {
    return DataType.BOOLEAN;
  } else if (Array.isArray(value)) {
    return DataType.ARRAY;
  } else if (typeof value === 'object' && value !== null) {
    return DataType.OBJECT;
  }
  return DataType.ANY;
}
