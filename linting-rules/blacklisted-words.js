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
 * Plugin locates patterns prohibited in Axibase style guide.
 */

class Rule {
    constructor(pattern, suggestion, caseSensitive, noWordBoundary) {
        this.pattern = noWordBoundary ? pattern : "\\b" + pattern + "\\b";
        const modifiers = caseSensitive ? "" : "i";
        this.regex = new RegExp(pattern, modifiers);
        this.suggestion = suggestion;
    }

    test(line) {
        return new Match(line.match(this.regex));
    }
}

class Match {
    constructor(match) {
        this.match = match;
    }

    found() {
        return !!this.match;
    }

    range() {
        if (this.match) {
            let column = this.match.index + 1;
            let length = this.match[0].length;
            if (this.match[2]) {
                column += this.match[1].length;
                length -= this.match[1].length;
            }
            return [column, length];
        }
        return null;
    }

    toString() {
        return this.match ? this.match.toString() : "null";
    }
}

const rules = [
    new Rule("should", "use 'must' or remove"),
    new Rule("could", "-"),
    new Rule("would", "use present tense"),
    new Rule("may", "'can'", true),
    new Rule("will", "use present tense"),
    new Rule("was", "use present tense"),
    new Rule("were", "use present tense"),
    new Rule("had", "use present tense"),
    new Rule("did", "use present tense"),
    new Rule("wasn't", "use present tense"),
    new Rule("weren't", "use present tense"),
    new Rule("hadn't", "use present tense"),
    new Rule("didn't", "use present tense"),
    new Rule("abort", "'stop', 'cancel'"),
    new Rule("kill", "'stop', 'cancel'"),
    new Rule("terminate", "'stop', 'cancel'"),
    new Rule("admin", "'administrator'", true),
    new Rule("a lot", "use formal style"),
    new Rule("actually", "use formal style"),
    new Rule("as is", "remove"),
    new Rule("deselect", "'clear'"),
    new Rule("uncheck", "'clear'"),
    new Rule("flag", "'option', 'setting'"),
    new Rule("ingest", "'load', 'import'"),
    new Rule("lets|let's", "informal"),
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
    new Rule("i\\.e\\.", "'for example'"),
    new Rule("e\\.g\\.", "'for example'"),
    new Rule("don't", "'do not'"),
    new Rule("can't", "'cannot'"),
    new Rule("hasn't", "'has not'"),
    new Rule("isn't", "'is not'"),
    new Rule("\\w+s's?", "do not use possessives", false, true),
    new Rule("execute these steps", "avoid verbiage"),
    new Rule("follow the prompts", "avoid verbiage"),
    new Rule("perform these tasks", "avoid verbiage"),
    new Rule("the following command", "avoid verbiage"),
    new Rule("login into", "'log in to'"),
    new Rule("log in into", "'log in to'")
];

module.exports = {
    names: ["MD102", "blacklisted-words"],
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
