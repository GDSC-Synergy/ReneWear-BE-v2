export function testRegex(val: any, regex: RegExp): boolean {
    const strVal = val + '';
    return regex.test(strVal);
}
