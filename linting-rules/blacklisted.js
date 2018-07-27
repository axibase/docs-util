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

const bad_words = require("../common/Blacklist")

module.exports = {
    names: ["MD102", "blacklisted"],
    description: " ",
    tags: ["blacklist"],
    "function": (params, onError) => {
        params.tokens.filter(t => t.type === "inline").forEach(token => {
            token.children.forEach(child => bad_words.forEach(rule => {
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