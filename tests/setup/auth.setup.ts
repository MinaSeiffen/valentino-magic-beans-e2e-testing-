import path from "path";
import fs from "fs";
import { test } from "@playwright/test";
import * as Login from '../pages/login';

const authSessionFile = path.resolve(__dirname, "../../playwright/.auth/user.json");

const loginFile = path.resolve(__dirname, "../../playwright/.auth/loginData.json");
const loginData = JSON.parse(fs.readFileSync(loginFile, "utf-8")) as {
    email: string,
    password: string,
};

test('Authentication', async ({ page }) => {
    await page.goto('/login');
    
    await Login.assertLoginInformation(page, loginData.email, loginData.password);

    await Login.verifyLogin(page);

    await page.context().storageState({ path: authSessionFile });
});