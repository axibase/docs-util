'use strict';

import test from 'ava';
import execa from 'execa';
import path from 'path';

const tested_rule = './linting-rules/whitelist-mail-and-host.js';
const lint_exec = './node_modules/markdownlint-cli/markdownlint.js';

function lint(config, rule, file) {
    return execa(path.resolve(lint_exec),
        ['-c', path.resolve(__dirname, config), '-r', path.resolve(rule), file], {
            cwd: __dirname
        })
}

test('Use example names from the Axibase guide.', async t => {
    try {
        await lint('test-config.json', tested_rule, 'incorrect.md');
        t.fail();
    } catch (err) {
        const expected = [
            `incorrect.md: 3: MD104/whitelist-mail-and-host Example is prohibited, refer to whitelist. [Wrong: 'reader:my_password@192.0.2.6'.]\n`
        ].join('\n');
        t.true(err.stdout === '');
        t.true(err.stderr === expected);
    }
});