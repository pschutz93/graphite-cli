import { expect } from 'chai';
import { allScenes } from '../../../lib/scenes';
import { configureTest, expectBranches } from '../../../lib/utils';
import { fakeGitSquashAndMerge } from '../../../lib/utils/fake_squash_and_merge';

for (const scene of allScenes) {
  // eslint-disable-next-line max-lines-per-function
  describe(`(${scene}): repo fix continue`, function () {
    configureTest(this, scene);

    it('Can continue a repo sync with one merge conflict', async () => {
      scene.repo.checkoutBranch('main');
      scene.repo.createChange('a', 'file_with_no_merge_conflict_a');
      scene.repo.execCliCommand(`branch create "a" -m "a" -q`);

      scene.repo.checkoutBranch('main');
      scene.repo.createChange('b', 'file_with_no_merge_conflict_b');
      scene.repo.execCliCommand(`branch create "b" -m "b" -q`);

      scene.repo.createChange('c', 'file_with_merge_conflict');
      scene.repo.execCliCommand(`branch create "c" -m "c" -q`);

      scene.repo.checkoutBranch('main');
      scene.repo.createChange('d', 'file_with_merge_conflict');
      scene.repo.execCliCommand(`branch create "d" -m "d" -q`);

      scene.repo.checkoutBranch('main');
      scene.repo.createChange('e', 'file_with_no_merge_conflict_e');
      scene.repo.execCliCommand(`branch create "e" -m "e" -q`);

      expectBranches(scene.repo, 'a, b, c, d, e, main');

      // Squashing all but branch (c) which will have a merge conflict when
      // it's rebased onto trunk.
      fakeGitSquashAndMerge(scene.repo, 'a', 'squash');
      fakeGitSquashAndMerge(scene.repo, 'b', 'squash');
      fakeGitSquashAndMerge(scene.repo, 'd', 'squash');
      fakeGitSquashAndMerge(scene.repo, 'e', 'squash');
      scene.repo.execCliCommand(`repo fix -qf`);

      expect(scene.repo.rebaseInProgress()).to.be.true;

      scene.repo.resolveMergeConflicts();
      scene.repo.markMergeConflictsAsResolved();
      const output =
        scene.repo.execCliCommandAndGetOutput('continue --no-edit');

      // Continue correctly finishes the command including the upsell at the
      // end to submit feedback.
      expect(output.includes('Still seeing issues with Graphite?')).to.be.true;

      expectBranches(scene.repo, 'c, main');
    });

    it('Can continue a repo sync with multiple merge conflicts', () => {
      scene.repo.checkoutBranch('main');
      scene.repo.createChange('a', 'file_with_no_merge_conflict_a');
      scene.repo.execCliCommand(`branch create "a" -m "a" -q`);

      scene.repo.checkoutBranch('main');
      scene.repo.createChange('b', 'file_with_no_merge_conflict_b');
      scene.repo.execCliCommand(`branch create "b" -m "b" -q`);

      scene.repo.createChange('c', 'file_with_merge_conflict_1');
      scene.repo.execCliCommand(`branch create "c" -m "c" -q`);

      scene.repo.createChange('d', 'file_with_merge_conflict_2');
      scene.repo.execCliCommand(`branch create "d" -m "d" -q`);

      scene.repo.checkoutBranch('main');
      scene.repo.createChange('e', 'file_with_merge_conflict_1');
      scene.repo.execCliCommand(`branch create "e" -m "e" -q`);

      scene.repo.checkoutBranch('main');
      scene.repo.createChange('f', 'file_with_merge_conflict_2');
      scene.repo.execCliCommand(`branch create "f" -m "f" -q`);

      expectBranches(scene.repo, 'a, b, c, d, e, f, main');

      fakeGitSquashAndMerge(scene.repo, 'a', 'squash');
      fakeGitSquashAndMerge(scene.repo, 'b', 'squash');
      fakeGitSquashAndMerge(scene.repo, 'e', 'squash');
      fakeGitSquashAndMerge(scene.repo, 'f', 'squash');
      scene.repo.execCliCommand(`repo fix -qf`);

      expect(scene.repo.rebaseInProgress()).to.be.true;
      scene.repo.resolveMergeConflicts();
      scene.repo.markMergeConflictsAsResolved();
      scene.repo.execCliCommand('continue --no-edit');

      expect(scene.repo.rebaseInProgress()).to.be.true;
      scene.repo.resolveMergeConflicts();
      scene.repo.markMergeConflictsAsResolved();
      scene.repo.execCliCommand('continue --no-edit');

      expectBranches(scene.repo, 'c, d, main');
    });
  });
}
