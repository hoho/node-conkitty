# node-conkitty [![Build Status](https://travis-ci.org/hoho/node-conkitty.svg?branch=master)](https://travis-ci.org/hoho/node-conkitty)

Apply [Conkitty](https://github.com/hoho/conkitty) templates in Node.JS

Install npm package:

    npm install node-conkitty

Run this code (having `file1.ctpl` and `file2.ctpl`):

```js
conkitty = require('node-conkitty');

conkitty.compile(['file1.ctpl', 'file2.ctpl']);
console.log(conkitty.applyTemplate('template1', 'Hello', 'World'));

// <div><strong>Hello</strong></div><p><em>World</em></p>
```

Assume `file1.ctpl` looks like:

    template1 $arg1 $arg2
        div
            CALL template2 $arg1
        p
            ns::tpl $arg2


    template2 $arg
        strong
            $arg

And `file2.ctpl` looks like:

    ns::tpl $arg
        em
            $arg
