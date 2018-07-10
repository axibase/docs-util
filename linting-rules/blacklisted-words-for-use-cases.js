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
    new WordPattern("abort", { suggestion: "'stop', 'cancel'" }),
    new WordPattern("kill", { suggestion: "'stop', 'cancel'" }),
    new WordPattern("terminate", { suggestion: "'stop', 'cancel'" }),
    new WordPattern("admin", { suggestion: "'administrator'", caseSensitive: true }),
    new WordPattern("so(?!-)", { suggestion: "use formal style" }),
    new WordPattern("a lot", { suggestion: "use formal style" }),
    new WordPattern("actually", { suggestion: "use formal style" }),
    new WordPattern("as is", { suggestion: "remove" }),
    new WordPattern("deselect", { suggestion: "'clear'" }),
    new WordPattern("uncheck", { suggestion: "'clear'" }),
    new WordPattern("ingest", { suggestion: "'load', 'import'" }),
    new WordPattern("lets", { suggestion: "-" }),
    new WordPattern("let(?!'s enc)", { suggestion: "-" }), // Match "let", but not "Let's Encrypt".
    new WordPattern("please", { suggestion: "-" }),
    new WordPattern("regex", { suggestion: "'regular expression'" }),
    new WordPattern("dropdown", { suggestion: "'drop-down'" }),
    new WordPattern("terminal", { suggestion: "'console'" }),
    new WordPattern("Epoch time", { suggestion: "Unix time" }),
    new WordPattern("datacenter", { suggestion: "data center" }),
    new WordPattern("and/or", { suggestion: "clarify the meaning" }),
    new WordPattern("in order to", { suggestion: "'to'" }),
    new WordPattern("make sure", { suggestion: "'ensure'" }),
    new WordPattern("end-point", { suggestion: "'endpoint'" }),
    new WordPattern("click on", { suggestion: "'click'" }),
    new WordPattern("robust", { suggestion: "avoid trite words" }),
    new WordPattern("i\\.e\\.", { suggestion: "'for example'" }),
    new WordPattern("e\\.g\\.", { suggestion: "'for example'" }),
    new WordPattern("execute these steps", { suggestion: "avoid verbiage" }),
    new WordPattern("follow the prompts", { suggestion: "avoid verbiage" }),
    new WordPattern("perform these tasks", { suggestion: "avoid verbiage" }),
    new WordPattern("the following command", { suggestion: "avoid verbiage" }),
    new WordPattern("the following step", { suggestion: "avoid verbiage" }),
    new WordPattern("execute the following", { suggestion: "avoid verbiage" }),
    new WordPattern("login into", { suggestion: "'log in to'" }),
    new WordPattern("log in into", { suggestion: "'log in to'" }),
    new WordPattern("atsd_host", { suggestion: "'atsd_hostname'" })
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