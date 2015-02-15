'use strict';

var expect = require('chai').expect;
var Anonymizer = require('../anonymizer.js');

describe('anonymizer', function () {

  var anonymizer = new Anonymizer();

  describe('#encode(data [,schema])', function(){
    it('can encode primitive values', function () {
      expect(anonymizer.encode('a', 'String')).to.deep.equal('a');
      expect(anonymizer.encode('a')).to.deep.equal('a');
      expect(anonymizer.encode(10, 'Number')).to.deep.equal(10);
      expect(anonymizer.encode(10)).to.deep.equal(10);

      expect(anonymizer.encode(true, 'Boolean')).to.deep.equal(true);
      expect(anonymizer.encode(true)).to.deep.equal(true);
      expect(anonymizer.encode(false, 'Boolean')).to.deep.equal(false);
      expect(anonymizer.encode(false)).to.deep.equal(false);

      expect(anonymizer.encode(undefined, 'undefined')).to.deep.equal(undefined);
      expect(anonymizer.encode(undefined)).to.deep.equal(undefined);
      expect(anonymizer.encode(null, 'null')).to.deep.equal(null);
      expect(anonymizer.encode(null)).to.deep.equal(null);
    });
    it('can encode categorical values', function () {
      expect(anonymizer.encode('a', 'Category')).to.equal(1);
      expect(anonymizer.encode(['a','b','a'], ['Category'])).to.deep.equal([1, 2, 1]);
    });
    it('can encode a simple array', function () {
      expect(anonymizer.encode(['a','b','c'], ['String'])).to.deep.equal(['a','b','c']);
      expect(anonymizer.encode(['a','b','c'], [])).to.deep.equal(['a','b','c']);
    });
    it('can encode a simple object', function () {
      expect(anonymizer.encode({a: 1, b: true, c: 'test'}, {a: 'Number', b: 'Boolean', c: 'String'})).to.deep.equal([1, true, 'test']);
    });
    it('can encode an array of objects', function(){
      expect(anonymizer.encode(
        [
          {a: 1, b: true, c: 'test'},
          {a: 2, b: false, c: 'test2'}
        ],
        [{a: 'Number', b: 'Boolean', c: 'String'}]
      )).to.deep.equal(
        [
          [1, true, 'test'],
          [2, false, 'test2']
        ]
      );
    });
    it('can encode an array of arrays', function(){
      expect(anonymizer.encode(
        [
          [1, 2, 3],
          ['a', 'b', 'c']
        ],
        [['Number'], ['String']]
      )).to.deep.equal(
        [
          [1, 2, 3],
          ['a', 'b', 'c']
        ]
      );
    });
    it('can encode an object of arrays', function(){
      expect(anonymizer.encode(
        {
          a: [1, 2, 3],
          b: ['a','b','c'],
          c: 'test'
        },
        {a: ['Number'], b: ['String'], c: 'String'}
      )).to.deep.equal(
        [
          [1, 2, 3],
          ['a', 'b', 'c'],
          'test'
        ]
      );
    });
    it('can encode an object of objects', function(){
      expect(anonymizer.encode(
        {
          a: {d: 1, e: 2},
          b: ['a','b','c'],
          c: {f: 'test'}
        },
        {a: {d: 'Number', e: 'Number'}, b: ['String'], c: {f: 'String'}}
      )).to.deep.equal(
        [
          [1, 2],
          ['a', 'b', 'c'],
          ['test']
        ]
      );
    });
    it('can handle > 2-level nested schema', function(){
      expect(anonymizer.encode(
        {
          a: {d: 1, e: [{g: 1}, {g: 1}]},
          b: [['a','b','c']],
          c: {f: ['test']}
        },
        {a: {d: 'Number', e: [{g: 'Number'}]}, b: [['String']], c: {f: ['String']}}
      )).to.deep.equal(
        [
          [1, [[1], [1]]],
          [['a', 'b', 'c']],
          [['test']]
        ]
      );
    });
  });

  describe('#decode(data, schema)', function(){
    it('does something', function () {
      expect(true).to.equal(true);
    });
  });

});
