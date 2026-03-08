import { MailSlurp } from "mailslurp-client";

export class EmailUtils {
    private mailslurp: MailSlurp;

    constructor(){
        this.mailslurp = new MailSlurp({
            apiKey: process.env.MAIL_SLURP_API_KEY!
        });
    }

    public async createInbox(){
        const inbox = await this.mailslurp.inboxController.createInboxWithDefaults();
        return inbox;
    }

    public async waitForLatestEmail(inboxId: string){
        const email = await this.mailslurp.waitForLatestEmail(inboxId, 10000);
        return email;
    }
}