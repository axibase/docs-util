'use strict';

import test from 'ava';
import execa from 'execa';
import path from 'path';

const tested_rule = './linting-rules/no-types-for-named-elements.js';
const lint_exec = './node_modules/markdownlint-cli/markdownlint.js';

function lint(config, rule, file) {
    return execa(path.resolve(lint_exec),
        ['-c', path.resolve(__dirname, config), '-r', path.resolve(rule), file], {
            cwd: __dirname
        })
}

test('No types for named elements.', async t => {
    try {
        await lint('test-config.json', tested_rule, 'incorrect.md');
        t.fail();
    } catch (err) {
        const expected = [
            `incorrect.md: 3: MD109/no-types-for-named-elements   [Remove 'button' (and 'the' before name)]\n`
        ].join('\n');
        t.true(err.stdout === '');
        t.true(err.stderr === expected);
    }
});