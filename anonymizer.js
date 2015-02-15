/*! anonymizer v0.0.0 - MIT license */

'use strict';

/**
 * Module dependencies
 */

var isArray = require('isarray');
var isObject = require('is-object');

function Anonymizer(categories){
  var self = this;

  if(isArray(categories)){
    this.categories = categories;
    this.categoryLookup = categories.reduce(function(obj, category, i){
      obj[category] = i;
      return obj;
    }, {});
  }
  else{
    this.categories = [];
    this.categoryLookup = {};
  }
}

var proto = Anonymizer.prototype;

proto.getCategoryCode = function(categoryName){
  if(this.categoryLookup.hasOwnProperty(categoryName)){
    return this.categoryLookup[categoryName];
  }
  else{
    this.categories.push(categoryName);
    this.categoryLookup[categoryName] = this.categories.length;
    return this.categories.length;
  }
};

proto.getCategoryName = function(categoryCode){
  return categoryCode>this.categories.length ? null : this.categories[categoryCode-1];
};

proto.getCategories = function(){
  return this.categories;
};

proto.encode = function(data, schema){
  var self = this;

  if(isArray(data)){
    var childSchema = isArray(schema) && schema.length > 0 ? schema[0] : null;
    return data.map(function(row){
      return self.encode(row, childSchema);
    });
  }
  else if(isObject(data)){
    if(!isObject(schema)) throw 'Expect schema to be an object but receive: ' + JSON.stringify(schema);
    return Object.keys(schema).map(function(key){
      return self.encode(data[key], schema[key]);
    });
  }
  else if(schema==='Category'){
    return this.getCategoryCode(data);
  }
  else{
    return data;
  }
};

proto.decode = function(data, schema){
  var self = this;

  if(isArray(schema)){
    var childSchema = isArray(schema) && schema.length > 0 ? schema[0] : null;
    return data.map(function(row){
      return self.decode(row, childSchema);
    });
  }
  else if(isObject(schema)){
    return Object.keys(schema).reduce(function(obj, key, i){
      obj[key] = self.decode(data[i], schema[key]);
      return obj;
    }, {});
  }
  else if(schema==='Category'){
    return this.getCategoryName(data);
  }
  else{
    return data;
  }
};

/**
 * Module exports
 */

module.exports = Anonymizer;
