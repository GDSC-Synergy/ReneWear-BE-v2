import { CallableRequest } from "firebase-functions/v2/https";

export default interface CallableFunctionHandler<T = any, Return = any> {
    (req: CallableRequest<T>): Return;
};
