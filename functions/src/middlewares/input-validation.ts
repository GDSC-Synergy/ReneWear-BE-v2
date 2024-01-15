import { CallableRequest, HttpsError } from "firebase-functions/v2/https";
import Predicate from "../util/func/pred";
import { validateMissing, validatePred } from "../util/validate";
import { Middleware } from "../util/middleware";

export default class InputValidationMiddleware<T = any, Return = any> implements Middleware<T, Return> {
    public constructor(
        private required: string[],
        private predicates: Iterable<[string, RegExp | Predicate<any>]>
    ) { }

    public pre(req: CallableRequest<T>): void {
        if (this.required || this.predicates) {
            let errors = new Array();
            
            if (this.required) errors = validateMissing(req.data, this.required, errors);
            if (this.predicates) errors = validatePred(req.data, this.predicates, errors);

            if (errors.length > 0) throw new HttpsError('invalid-argument', 'Bad argument', errors);
        }
    }

    public post(_: CallableRequest<T>, ret: Return): Return {
        return ret;
    }
}
