/*! anonymizer v0.0.0 - MIT license */

'use strict';

/**
 * Module dependencies
 */

var isArray = require('isarray');
var isObject = require('is-object');

function Anonymizer(categories){
  var self = this;
  this.categoryLookup = {};

  if(isArray(categories)){
    categories.forEach(function(category, i){
      self.categoryLookup[category] = i;
    });
  }
  else{
    this.categories = [];
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

};

/**
 * Module exports
 */

module.exports = Anonymizer;
