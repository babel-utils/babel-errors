// @flow
'use strict';

/*::
type File = {
  code: string,
  wrap: (string, Function) => mixed,
};

type Path = {
  hub: { file: File },
  buildCodeFrameError: string => Error,
};
*/

function captureStackTrace(err, fn) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, fn);
  }
}

function createErrorWithLoc(
  message /*: string */,
  line /*: number */,
  column /*: number */
) /*: Error */ {
  let err /*: any */ = new SyntaxError(message);
  err.loc = {line, column};
  return err;
}

function wrapErrorWithCodeFrame(
  file /*: File */,
  error /*: Error */
) /*: Error */ {
  try {
    file.wrap(file.code, () => {
      throw error;
    });
  } catch (err) {
    captureStackTrace(err, wrapErrorWithCodeFrame);
    return err;
  }

  return error;
}

function buildCodeFrameError(
  path /*: Path */,
  message /*: string */
) /*: Error */ {
  let file = path.hub.file;
  let error;

  try {
    file.wrap(file.code, () => {
      throw path.buildCodeFrameError(message);
    });
    error = new Error(message);
  } catch (err) {
    error = err;
  }

  captureStackTrace(error, buildCodeFrameError);
  return error;
}

function toErrorStack(err /*: Error */) {
  if (err._babel && err instanceof SyntaxError) {
    let stack = `${err.name}: ${err.message}`;
    if (err.codeFrame) stack += '\n' + String(err.codeFrame);
    return stack;
  } else {
    return err.stack;
  }
}

module.exports = {
  createErrorWithLoc,
  wrapErrorWithCodeFrame,
  buildCodeFrameError,
  toErrorStack,
};
