import yargs from "yargs";
declare const args: {
    readonly all: {
        readonly describe: "stage all changes before committing";
        readonly demandOption: false;
        readonly default: false;
        readonly type: "boolean";
        readonly alias: "a";
    };
    readonly message: {
        readonly type: "string";
        readonly alias: "m";
        readonly describe: "The message for the new commit";
        readonly required: true;
    };
};
declare type argsT = yargs.Arguments<yargs.InferredOptionTypes<typeof args>>;
export declare const command = "create";
export declare const description = "Create a new commit and fix upstack branches.";
export declare const builder: {
    readonly all: {
        readonly describe: "stage all changes before committing";
        readonly demandOption: false;
        readonly default: false;
        readonly type: "boolean";
        readonly alias: "a";
    };
    readonly message: {
        readonly type: "string";
        readonly alias: "m";
        readonly describe: "The message for the new commit";
        readonly required: true;
    };
};
export declare const handler: (argv: argsT) => Promise<void>;
export {};
