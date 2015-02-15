# anonymizer

[![Build Status](https://secure.travis-ci.org/user/anonymizer.png?branch=master)](http://travis-ci.org/user/anonymizer)


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
