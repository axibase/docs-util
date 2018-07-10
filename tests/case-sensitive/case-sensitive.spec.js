'use strict';

import test from 'ava';
import execa from 'execa';
import path from 'path';

const tested_rule = './linting-rules/case-sensitive.js';
const lint_exec = './node_modules/markdownlint-cli/markdownlint.js';

function lint(config, rule, file) {
    return execa(path.resolve(lint_exec),
        ['-c', path.resolve(__dirname, config), '-r', path.resolve(rule), file], {
            cwd: __dirname
        })
}

test('Keywords must have appropriate case.', async t => {
    try {
        await lint('test-config.json', tested_rule, 'incorrect.md');
        t.fail();
    } catch (err) {
        const expected = [
            `incorrect.md: 3: MD106/case-sensitive Keywords must have appropriate case. [Expected GZIP. Actual gzip.]\n`
        ].join('\n');
        t.true(err.stdout === '');
        t.true(err.stderr === expected);
    }
});