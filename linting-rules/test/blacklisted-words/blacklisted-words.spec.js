'use strict';

import test from 'ava';
import execa from 'execa';
import path from 'path';

const tested_rule = './linting-rules/blacklisted-words.js';
const lint_exec = './node_modules/markdownlint-cli/markdownlint.js';

function lint(config, rule, file) {
    return execa(path.resolve(lint_exec),
        ['-c', path.resolve(__dirname, config), '-r', path.resolve(rule), file], {
            cwd: __dirname
        })
}

test('Correct file doesn\'t reproduce errors' , async t => {
        await lint('test-config.json', tested_rule, 'correct.md')
            .then(res => t.is(res.code, 0))
            .catch(res => {
                t.is(res.stderr, '','Unexpected err, stderr must be empty' )
            })
});
