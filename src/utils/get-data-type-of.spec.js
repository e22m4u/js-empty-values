import {expect} from 'chai';
import {DataType} from '../data-type.js';
import {getDataTypeOf} from './get-data-type-of.js';

describe('getDataTypeOf', function () {
  it('returns DataType.ANY for undefined and null values', function () {
    const res1 = getDataTypeOf(undefined);
    const res2 = getDataTypeOf(null);
    expect(res1).to.be.eq(DataType.ANY);
    expect(res2).to.be.eq(DataType.ANY);
  });

  it('returns DataType.STRING for a string value', function () {
    const res1 = getDataTypeOf('value');
    const res2 = getDataTypeOf('');
    expect(res1).to.be.eq(DataType.STRING);
    expect(res2).to.be.eq(DataType.STRING);
  });

  it('returns DataType.NUMBER for an integer value', function () {
    const res1 = getDataTypeOf(10);
    const res2 = getDataTypeOf(-10);
    expect(res1).to.be.eq(DataType.NUMBER);
    expect(res2).to.be.eq(DataType.NUMBER);
  });

  it('returns DataType.NUMBER for a float value', function () {
    const res1 = getDataTypeOf(10.5);
    const res2 = getDataTypeOf(-10.5);
    expect(res1).to.be.eq(DataType.NUMBER);
    expect(res2).to.be.eq(DataType.NUMBER);
  });

  it('returns DataType.BOOLEAN for a boolean value', function () {
    const res1 = getDataTypeOf(true);
    const res2 = getDataTypeOf(false);
    expect(res1).to.be.eq(DataType.BOOLEAN);
    expect(res2).to.be.eq(DataType.BOOLEAN);
  });

  it('returns DataType.ARRAY for an array value', function () {
    const res1 = getDataTypeOf([1, 2, 3]);
    const res2 = getDataTypeOf([]);
    expect(res1).to.be.eq(DataType.ARRAY);
    expect(res2).to.be.eq(DataType.ARRAY);
  });

  it('returns DataType.OBJECT for an object value', function () {
    const res1 = getDataTypeOf({foo: 'bar'});
    const res2 = getDataTypeOf({});
    expect(res1).to.be.eq(DataType.OBJECT);
    expect(res2).to.be.eq(DataType.OBJECT);
  });
});
