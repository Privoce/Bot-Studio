type UnknownString = string | null | undefined;

/**
 * Check whether the given String contains actual text.
 * */
export function hasText(str: UnknownString): boolean {
  return typeof str === 'string' && str.trim().length !== 0;
}

/**
 * Check whether the given object (possibly a String) is empty.
 * */
export function isEmpty(str: UnknownString) {
  return str === null || str === undefined || str === '';
}

/**
 * Check that the given String is neither null nor of length 0.
 * */
export function hasLength(str: UnknownString) {
  return str !== null && str !== undefined && str.length > 0;
}

// @see https://github.com/sindresorhus/is-absolute-url/blob/main/index.js
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;

// Windows paths like `c:\`
const WINDOWS_PATH_REGEX = /^[a-zA-Z]:\\/;

export function isAbsoluteUrl(url: string) {
  if (WINDOWS_PATH_REGEX.test(url)) {
    return false;
  }
  return ABSOLUTE_URL_REGEX.test(url);
}

const StringUtils = { hasText, isEmpty, hasLength, isAbsoluteUrl };

export default StringUtils;
