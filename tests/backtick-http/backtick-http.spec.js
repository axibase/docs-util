'use strict';

import test from 'ava';
import execa from 'execa';
import path from 'path';

const TESTED_RULE = './linting-rules/backtick-http.js';
const lint_exec = './node_modules/markdownlint-cli/markdownlint.js';

function lint(config, rule, file) {
    return execa(path.resolve(lint_exec),
        ['-c', path.resolve(__dirname, config), '-r', path.resolve(rule),  file], {
            cwd: __dirname
        })
}

test('linting results are sorted by file/line/names/description', async t => {
    try {
        await lint('test-config.json', TESTED_RULE, 'incorrect.md');
        t.fail();
    } catch (err) {
        const expected = [
            `incorrect.md: 3: MD103/backtick-http   [HTTP keyword 'GET' must be backticked.]\n`
        ].join('\n');
        t.true(err.stdout === '');
        t.true(err.stderr === expected);
    }
});