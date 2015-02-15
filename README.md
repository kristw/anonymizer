# anonymizer

[![Build Status](https://secure.travis-ci.org/kristw/anonymizer.png?branch=master)](http://travis-ci.org/kristw/anonymizer)

Let's say you have to put a dataset on your website for your own use, but don't really want to share it to everyone. If you upload the raw, nice dataset with all the field names, people can just take it for their own use easily. You want to make it a bit harder for them to interpret the data without shooting yourself in the foot.

This **anonymizer** was built for that purpose:

* Given a schema, it can easily strip out all the field names.
* It works with nested schema, e.g., Array of Objects, Array of Objects that contains Array, and so on.
* It can also take all categorical values and map them into integers, which are more compact and help you anonymize the data.

The library is also very lightweight (raw 3KB, minified 1KB) and supports CommonJS, AMD (RequireJS) as well as browser use.

## Installation

Install with npm:

```
npm install --save anonymizer
```

## Usage

```
var anonymizer = new Anonymizer();
```

### Basic

#### anonymizer.encode(data [,schema])
```
anonymizer.encode(
  {a: 1, b: true, c: 'test'},
  {a: 'Number', b: 'Boolean', c: 'String'}
);
=> [1, true, 'test']

anonymizer.encode(
  [{a: 1, b: true, c: 'test'}, {a: 2, b: false, c: 'test2'}],
  [{a: 'Number', b: 'Boolean', c: 'String'}]
);
=> [ [1, true, 'test'], [2, false, 'test2'] ]
```

#### anonymizer.decode(data [,schema])
```
anonymizer.decode(
  [1, true, 'test'],
  {a: 'Number', b: 'Boolean', c: 'String'}
);
=> {a: 1, b: true, c: 'test'}

anonymizer.decode(
  [ [1, true, 'test'], [2, false, 'test2'] ],
  [{a: 'Number', b: 'Boolean', c: 'String'}]
);
=> [{a: 1, b: true, c: 'test'}, {a: 2, b: false, c: 'test2'}]
```

### Categorical values

Anonymizer can map categorical values to/from integers.

```
anonymizer.encode('test', 'Category');
=> 1

anonymizer.encode(['test', 'test2', 'test'], 'Category');
=> [1, 2, 1]

anonymizer.getCategories();
=> ['test', 'test2']

// Create a new anonymizer and pass known categories
var anonymizer2 = new Anonymizer(anonymizer.getCategories());

anonymizer2.decode(1);
=> 'test'

anonymizer2.decode([1, 2, 1]);
=> ['test', 'test2', 'test']
```

## Testing

From the repo root:

```
npm install
npm test
```
