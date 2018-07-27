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
 * Plugin checks that types for named elements are not used.
 */

const { WordPattern } = require("../common/Utils")
patterns = [
    new WordPattern("(?<=([A-Z]\\w*\\*{2}\\s))button(s?)", { caseSensitive: true }),
    new WordPattern("(?<=([A-Z]\\w*\\*{2}\\s))split-button(s?)", { caseSensitive: true }),
    new WordPattern("(?<=([A-Z]\\w*\\*{2}\\s))checkbox(es)?", { caseSensitive: true }),
    new WordPattern("(?<=([A-Z]\\w*\\*{2}\\s))drop-down list(s?)", { caseSensitive: true }),
    new WordPattern("(?<=([A-Z]\\w*\\*{2}\\s))field(s?)", { caseSensitive: true }),
    new WordPattern("(?<=([A-Z]\\w*\\*{2}\\s))link(s?)", { caseSensitive: true }),
    new WordPattern("(?<=([A-Z]\\w*\\*{2}\\s))switch(es)?", { caseSensitive: true })
]

module.exports = {
    names: ["MD109", "no-types-for-named-elements"],
    description: " ",
    tags: ["types"],
    "function": (params, onError) => {
        params.tokens.filter(t => t.type === "inline").forEach(token => {
            patterns.forEach(p => {
                if (match = token.content.match(p.regex)) {
                    onError({
                        lineNumber: token.lineNumber,
                        detail: `Remove '${match[0]}' (and 'the' before name)`,
                        range: [match.index + 1, match[0].length]
                    })
                }
            })
        });
    }
};