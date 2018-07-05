/**
 * @license
 * Copyright 2018 Axibase Corporation or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Plugin locates patterns in atsd-use-cases prohibited in Axibase style guide.
 */

const { WordPattern } = require("../common/Utils")

const rules = [
    new WordPattern("abort", "'stop', 'cancel'"),
    new WordPattern("kill", "'stop', 'cancel'"),
    new WordPattern("terminate", "'stop', 'cancel'"),
    new WordPattern("admin", "'administrator'", { caseSensitive: true }),
    new WordPattern("so(?!-)", "use formal style"), // It's experiment. In case of errors remove and uncomment lines below.
    //new WordPattern("so ", "use formal style"),
    //new WordPattern("so, ", "use formal style"),
    new WordPattern("a lot", "use formal style"),
    new WordPattern("actually", "use formal style"),
    new WordPattern("as is", "remove"),
    new WordPattern("deselect", "'clear'"),
    new WordPattern("uncheck", "'clear'"),
    new WordPattern("ingest", "'load', 'import'"),
    new WordPattern("lets", "-"),
    new WordPattern("let(?!'s enc)", "-"), // Match "let", but not "Let's Encrypt".
    new WordPattern("please", "-"),
    new WordPattern("regex", "'regular expression'"),
    new WordPattern("dropdown", "'drop-down'"),
    new WordPattern("terminal", "'console'"),
    new WordPattern("Epoch time", "Unix time"),
    new WordPattern("datacenter", "data center"),
    new WordPattern("and/or", "clarify the meaning"),
    new WordPattern("in order to", "'to'"),
    new WordPattern("make sure", "'ensure'"),
    new WordPattern("end-point", "'endpoint'"),
    new WordPattern("click on", "'click'"),
    new WordPattern("robust", "avoid trite words"),
    new WordPattern("i\\.e\\.", "'for example'"),
    new WordPattern("e\\.g\\.", "'for example'"),
    new WordPattern("execute these steps", "avoid verbiage"),
    new WordPattern("follow the prompts", "avoid verbiage"),
    new WordPattern("perform these tasks", "avoid verbiage"),
    new WordPattern("the following command", "avoid verbiage"),
    new WordPattern("the following step", "avoid verbiage"),
    new WordPattern("execute the following", "avoid verbiage"),
    new WordPattern("login into", "'log in to'"),
    new WordPattern("log in into", "'log in to'"),
    new WordPattern("atsd_host", "'atsd_hostname'")
];

module.exports = {
    names: ["MD105", "blacklisted-words-for-use-cases"],
    description: " ",
    tags: ["blacklist"],
    "function": (params, onError) => {
        params.tokens.filter(t => t.type === "inline").forEach(token => {
            token.children.forEach(child => rules.forEach(rule => {
                if ((child.type !== "code_inline") && (rule.regex.test(child.content))) {
                    const match = rule.test(child.line);
                    onError({
                        lineNumber: child.lineNumber,
                        detail: `The phrase '${match}' is blacklisted. Alternatives: ${rule.suggestion}`,
                        range: match.range()
                    })
                }
            }))
        });
    }
};