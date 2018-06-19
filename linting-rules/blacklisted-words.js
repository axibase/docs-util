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
 * Plugin checks blacklisted words below (case-insensitive).
 */

class Rule {
    constructor(pattern, suggestion) {
        this.pattern = pattern;
        this.regex = new RegExp("\\b" + pattern + "\\b", "i");
        this.suggestion = suggestion;
    }
}

const rules = [
    new Rule("should", "use 'must' or 'remove'"),
    new Rule("could", "-"),
    new Rule("would", "-"),
    new Rule("may", "'can'"),
    new Rule("will", "use present tense"),
    new Rule("was", "use present tense"),
    new Rule("abort", "'stop', 'cancel'"),
    new Rule("kill", "'stop', 'cancel'"),
    new Rule("terminate", "'stop', 'cancel'"),
    new Rule("admin", "'administrator'"),
    new Rule("so, a lot", "use formal style"),
    new Rule("deselect", "'clear'"),
    new Rule("uncheck", "'clear'"),
    new Rule("flag", "'option', 'setting'"),
    new Rule("ingest", "'load', 'import'"),
    new Rule("lets", "-"),
    new Rule("please", "-"),
    new Rule("regex", "'regular expression'"),
    new Rule("Epoch time", "Unix time"),
    new Rule("datacenter", "data center"),
    new Rule("and/or", "clarify the meaning"),
    new Rule("in order to", "'to'"),
    new Rule("make sure", "'ensure'"),
    new Rule("end-point", "'endpoint'"),
    new Rule("click on", "'click'"),
    new Rule("robust", "avoid trite words"),
];

module.exports = {
    names: ["MD102", "blacklisted-words"],
    description: "Plugin locates patterns prohibited in Axibase style guide",
    tags: ["blacklist"],
    "function": (params, onError) => {
        params.tokens.filter(t => t.type === "inline").forEach(token => {
            token.children.forEach(child => rules.forEach(rule => {
                if (rule.regex.test(child.content)) {
                    onError({
                        lineNumber: child.lineNumber,
                        detail: `The word '${rule.pattern} ' is blacklisted. Alternatives: ${rule.suggestion}`
                    })
                }
            }))
        });
    }
};
