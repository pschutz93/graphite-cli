import yargs from "yargs";
declare const args: {
    readonly branch: {
        readonly describe: "A branch to rebase the current stack onto";
        readonly demandOption: true;
        readonly optional: false;
        readonly positional: true;
        readonly type: "string";
    };
};
export declare const command = "onto <branch>";
export declare const description = "Rebase any upstack branches onto the latest commit (HEAD) of the current branch.";
export declare const builder: {
    readonly branch: {
        readonly describe: "A branch to rebase the current stack onto";
        readonly demandOption: true;
        readonly optional: false;
        readonly positional: true;
        readonly type: "string";
    };
};
declare type argsT = yargs.Arguments<yargs.InferredOptionTypes<typeof args>>;
export declare const handler: (argv: argsT) => Promise<void>;
export {};
