'use strict';

import test from 'ava';
import execa from 'execa';
import path from 'path';

const tested_rule = './linting-rules/no-number-at-link-start.js';
const lint_exec = './node_modules/markdownlint-cli/markdownlint.js';

function lint(config, rule, file) {
    return execa(path.resolve(lint_exec),
        ['-c', path.resolve(__dirname, config), '-r', path.resolve(rule), file], {
            cwd: __dirname
        })
}

test('Links must not start with number.', async t => {
    try {
        await lint('test-config.json', tested_rule, 'incorrect.md');
        t.fail();
    } catch (err) {
        const expected = 
            `incorrect.md: 3: MD109/no-number-at-link-start Links must not start with number [Replace #3 with #_3.]\n`;
        t.true(err.stdout === '');
        t.true(err.stderr === expected);
    }
});