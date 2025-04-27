import {DataType} from './data-type.js';
import {Service} from '@e22m4u/js-service';

/**
 * Empty values service.
 */
export class EmptyValuesService extends Service {
  /**
   * Set empty values of.
   *
   * @param dataType
   * @param emptyValues
   */
  setEmptyValuesOf(dataType: DataType, emptyValues: unknown[]): this;

  /**
   * Is empty.
   *
   * @param value
   */
  isEmpty(value: unknown): boolean;

  /**
   * Is empty for type.
   *
   * @param dataType
   * @param value
   */
  isEmptyByType(dataType: DataType, value: unknown): boolean;
}
