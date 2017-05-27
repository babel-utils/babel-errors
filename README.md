# babel-errors

> Nicer error messages for Babel

```js
import createBabelFile from 'babel-file';
import {BabelError, prettyError, buildCodeFrameError} from 'babel-errors';

const file = createBabelFile(...);

let path = file.path;
let {line, column} = path.loc.start;

throw prettyError(createErrorWithLoc('Error at this position', line, column));
throw buildCodeFrameError(path, 'Error with this Path');
```

### `createErrorWithLoc(message, line, column)`

This lets you add location information to your errors.

### `wrapErrorWithCodeFrame(err)`

You can use this when capturing errors thrown by Babel or constructed using
`createErrorWithLoc` to add a code frame when possible.

### `buildCodeFrameError(path, message)`

You can use this to build a code frame error around a path with a specified
message.

Use this instead of `path.buildCodeFrameError` when you aren't running inside a
Babel plugin.

### `toErrorStack(error)`

Creates string with error name, message, stack/code frame.
