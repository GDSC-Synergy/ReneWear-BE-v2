import Predicate from "./func/pred";
import { testRegex } from "./regex";

export function validateMissing(data: any, required: string[], errors?: string[]): string[] {
    const errs: string[] = errors || new Array();
    for (const key of required) {
        if (typeof data[key] !== 'boolean' && !data[key]) {
            const err = `${key}_missing`;
            if (errs.indexOf(err) === -1) {
                errs.push(err);
            }
        }
    }
    
    return errs;
}

export function validatePred(data: any, predicates: Iterable<[string, RegExp | Predicate<any>]>, errors?: string[]): string[] {
    const errs: string[] = errors || new Array();
    for (const [key, pred] of predicates) {
        if (data[key]) {
            const valid = pred instanceof RegExp
                ? testRegex(data[key], pred)
                : pred(data[key]);
            
            if (!valid) {
                const err = `${key}_invalid`;
                if (errs.indexOf(err) === -1) {
                    errs.push(err);
                }
            }
        }
    }

    return errs;
}
