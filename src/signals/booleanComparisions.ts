export function isAtLeastOneBooleanTrue(...args: boolean[]): boolean {
    // .find returns undefined if nothing matched the testing function. Therefore, if .find returns falsy, instead return false with the or operand
    return args.find((element: boolean) => element === true) || false;
}
