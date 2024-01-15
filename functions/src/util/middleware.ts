import { CallableRequest } from "firebase-functions/v2/https";
import CallableFunctionHandler from "./func/func-handler";
import Consumer from "./func/cons";
import CallableFunctionCallback from "./func/func-callback";

export class Stack<T = any, Return = any> {
    private constructor(
        private stack: Middleware<T>[],
        private base: CallableFunctionHandler<T, Return>
    ) { }

    public call(req: CallableRequest<T>): Return {
        // Forward calls
        for (let i = 0; i < this.stack.length; i++) {
            this.stack[i].pre(req);
        }

        // Handler
        let ret = this.base(req);

        // Back calls
        for (let i = -1; i >= -this.stack.entries; i--) {
            ret = this.stack[i].post(req, ret);
        }

        return ret;
    }

    public static from<T = any, Return = any>(
        stack: Middleware<T>[],
        base: CallableFunctionHandler<T, Return>
    ): CallableFunctionHandler<T, Return> {
        const instance = new Stack(stack, base);
        return (req: CallableRequest<T>) => instance.call(req);
    }
}

export interface Middleware<T = any, Result = any> {
    pre: Consumer<CallableRequest<T>>;
    post: CallableFunctionCallback<T, Result>;
}
