/**
 * Turn a string to camel case
 *
 * Created July 22nd, 2022
 * @author: ywarezk
 * @version: 0.0.4
 * @license: MIT
 */

/**
 * converts a string to camelcase
 */
export function camelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}
