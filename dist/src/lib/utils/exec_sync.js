"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gpExecSync = void 0;
const child_process_1 = require("child_process");
function gpExecSync(command, onError) {
    try {
        return child_process_1.execSync(command.command, Object.assign({}, command.options));
    }
    catch (e) {
        return onError(e);
    }
}
exports.gpExecSync = gpExecSync;
//# sourceMappingURL=exec_sync.js.map