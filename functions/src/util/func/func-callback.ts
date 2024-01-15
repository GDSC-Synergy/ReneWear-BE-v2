import { CallableRequest } from "firebase-functions/v2/https";

export default interface CallableFunctionCallback<T = any, Return = any> {
    (req: CallableRequest<T>, ret: Return): Return;
};
