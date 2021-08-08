import yargs from "yargs";
declare const args: {
    readonly steps: {
        readonly describe: "number of branches to traverse";
        readonly demandOption: false;
        readonly default: 1;
        readonly type: "number";
        readonly alias: "n";
    };
    readonly interactive: {
        readonly describe: "Enable interactive branch picking when necessary";
        readonly demandOption: false;
        readonly default: true;
        readonly type: "boolean";
        readonly alias: "i";
    };
};
declare type argsT = yargs.Arguments<yargs.InferredOptionTypes<typeof args>>;
export declare const command = "prev [steps]";
export declare const aliases: string[];
export declare const description = "If you're in a stack: Branch A \u2192 Branch B (you are here) \u2192 Branch C. Takes you to the previous branch (Branch A). If there are two parent branches, errors out and tells you the various branches you could go to.";
export declare const builder: {
    readonly steps: {
        readonly describe: "number of branches to traverse";
        readonly demandOption: false;
        readonly default: 1;
        readonly type: "number";
        readonly alias: "n";
    };
    readonly interactive: {
        readonly describe: "Enable interactive branch picking when necessary";
        readonly demandOption: false;
        readonly default: true;
        readonly type: "boolean";
        readonly alias: "i";
    };
};
export declare const handler: (argv: argsT) => Promise<void>;
export {};
