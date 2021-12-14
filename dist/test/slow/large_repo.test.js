"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scenes_1 = require("../lib/scenes");
const utils_1 = require("../lib/utils");
for (const scene of [
    new scenes_1.PublicRepoScene({
        repoUrl: 'https://github.com/SmartThingsCommunity/SmartThingsPublic.git',
        name: 'SmartThingsPublic',
        timeout: 20000,
    }),
    new scenes_1.PublicRepoScene({
        repoUrl: 'https://github.com/dagster-io/dagster.git',
        name: 'Dagster',
        timeout: 10000,
    }),
]) {
    describe(`(${scene}): Run simple timed commands`, function () {
        (0, utils_1.configureTest)(this, scene);
        it('Can run stacks quickly', () => {
            scene.repo.execCliCommand(`log short`);
        }).timeout(scene.timeout);
        it('Can run log quickly', () => {
            scene.repo.execCliCommand(`log`);
        }).timeout(scene.timeout);
    });
}
//# sourceMappingURL=large_repo.test.js.map