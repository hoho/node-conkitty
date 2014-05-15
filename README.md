# node-conkitty [![Build Status](https://travis-ci.org/hoho/node-conkitty.svg?branch=master)](https://travis-ci.org/hoho/node-conkitty)

Apply Conkitty templates in Node.JS.

[Conkitty](https://github.com/hoho/conkitty) is a DOM builder and supposed to
work in browsers. Sometimes it is nice to be able to apply the same templates
on server-side too. `node-conkitty` utilizes
[jsdom](https://github.com/tmpvar/jsdom) for DOM building.

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


`jsdom` is not the fastest solution available, but it gives full W3C DOM
support. My primary goal of using `jsdom` is to bring the ability to run
Conkitty templates on server-side to build static sites with minimal efforts.
And for static site generator high performance is not a very critical thing.
With more efforts it is possible to run templates much faster and it'll
probably happen some day in future.
