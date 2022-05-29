## var let const

不用var申明的变量会被视为全局变量(可以使用window.v 或者v 在控制台访问)，为了避免这一缺陷，所有的JavaScript代码都应该使用strict模式。我们在后面编写的JavaScript代码将全部采用strict模式。
```angular2html
<html>
    <head>
        <script>
//            'use strict';
            a = 'hello world';
            console.log(a);
        </script>
    </head>

    
test.html:5 Uncaught ReferenceError: a is not defined
    at test.html:5:15
</html>
```

### summary
1. immutable: const 
1. mutable: let
1. never use var
> const > let > var

#### var
1. scope: `global or function`
1. re-declare
1. use it before declare , initialize with `undefined` 

#### let
1. scope: `block`
1. can not re-declare
1. can not use it before declare `ReferenceError`

### const
1. scope: `block`
1. can not change


