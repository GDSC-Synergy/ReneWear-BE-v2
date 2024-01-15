import { CallableRequest, HttpsError } from "firebase-functions/v2/https";
import { Middleware } from "../util/middleware";

export default class AuthMiddleware<T = any, Return = any> implements Middleware<T, Return> {
    public pre(req: CallableRequest<T>): void {
        if (!req.auth) {
            throw new HttpsError('unauthenticated', 'Unauthenticated');
        }
    }

    public post(_: CallableRequest<T>, ret: Return): Return {
        return ret;
    }
}
