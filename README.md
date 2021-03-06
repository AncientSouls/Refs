# AncientRefs

[![npm version](https://badge.fury.io/js/ancient-refs.svg)](https://badge.fury.io/js/ancient-refs)
[![Join the chat at https://gitter.im/AncientSouls/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/AncientSouls/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Multi-storage ids syntax, parse and get methods.

## Install
```bash
npm install --save ancient-refs
```

## Example

```js
import { Refs } from 'ancient-refs';

var items = { abc: 123 };
var users = { def: 456 };

var getFromObject = function(object) {
  return function(id, callback) {
    if (callback) callback(undefined, object[id]);
    return object[id];
  };
};

var refs = new Refs(
  { items: items, users: users },
  { items: getFromObject(items), users: getFromObject(users) }
);

refs.get('items/abc', function(error, document) {
  document; // 123
});
refs.get('items/abc') // 123;

refs.storage('items') // { abc: 123 }
refs.storage('items/abc') // { abc: 123 }
```

## License

The MIT License (MIT)
Copyright (c) 2016 Ivan S Glazunov <ivansglazunov@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
