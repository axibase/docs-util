'use strict';

import test from 'ava';
import execa from 'execa';
import path from 'path';

const tested_rule = './linting-rules/no-space-in-fenced-code.js';
const lint_exec = './node_modules/markdownlint-cli/markdownlint.js';

function lint(config, rule, file) {
    return execa(path.resolve(lint_exec),
        ['-c', path.resolve(__dirname, config), '-r', path.resolve(rule), file], {
            cwd: __dirname
        })
}

test('No whitespace characters at the beginning of code block.', async t => {
    try {
        await lint('test-config.json', tested_rule, 'incorrect.md');
        t.fail();
    } catch (err) {
        const expected = [
            `incorrect.md: 4: MD107/no-space-in-fenced-code Remove whitespace characters at the beginning of code block.\n`
        ].join('\n');
        t.true(err.stdout === '');
        t.true(err.stderr === expected);
    }
});