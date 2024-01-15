import 'dotenv/config';
import { initializeApp } from 'firebase-admin/app';

initializeApp();

// Functions
import * as userFunctions from './functions/user';

export const renewear = { ...userFunctions };
