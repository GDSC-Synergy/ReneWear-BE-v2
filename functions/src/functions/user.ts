import * as functions from 'firebase-functions/v2';
import InputValidationMiddleware from '../middlewares/input-validation';
import AuthMiddleware from '../middlewares/auth';
import { Stack } from '../util/middleware';

export const getUser = functions.https.onCall(Stack.from(
    [
        new AuthMiddleware(),
        new InputValidationMiddleware(['name', 'age'], [['name', /^[A-Za-z\s]+$/], ['age', /^[0-9]{1,3}$/]])
    ], async req => {
        const { name, age }: any = req.data;
        functions.logger.log(`Requesting from ${name} (${age} years old)`);
        return { message: `Hello, ${name}!` };
    }
));
