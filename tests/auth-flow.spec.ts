import { test, expect, Page } from '@playwright/test';
import * as SignUp from './pages/SignUp';
import * as Login from './pages/login';
import { EmailUtils } from './utils/email-utils';
import { join, resolve } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

test('signup full flow', async ({ page }) => {
    test.skip( process.env.SIGN_UP_FLOW !== 'true', "Sign up Testing is disabled");
    const emailUtils = new EmailUtils();
    const inbox = await emailUtils.createInbox();

    let code: string;

    await test.step('Signup - fill and submit form', async () => {
        await page.goto('/signup');
        await SignUp.assertSignupInformation(page, inbox.emailAddress);
    });

    await test.step('Fetch verification code from email', async () => {
        const email = await emailUtils.waitForLatestEmail(inbox.id);
        const match = /([0-9]{6})$/.exec(email.body!);
        if (!match) throw new Error('Verification code not found in email body');
        code = match[0];
    });

    await test.step('Submit verification code', async () => {
        await SignUp.assertSignupConfirmation(page, code!);
    });

    await test.step('Login with new account', async () => {
        await Login.assertLoginInformation(page, inbox.emailAddress, SignUp.SignupValues.password);
    });

    await test.step('Verify login', async () => {
        await Login.verifyLogin(page);
    });

    // presist login data
    const loginData = {
        email: inbox.emailAddress,
        password: SignUp.SignupValues.password
    }
    const authDirectory = resolve(process.cwd(), './playwright/.auth');
    if(!existsSync(authDirectory)) mkdirSync(authDirectory, {recursive: true});

    writeFileSync(
        join(authDirectory, 'loginData.json'),
        JSON.stringify(loginData)
    );
});