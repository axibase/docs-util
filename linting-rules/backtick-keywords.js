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
 * Plugin checks that keywords are backticked and in lowercase if they are:
 * a) not in heading;
 * b) not in code block.
 * Keyword in header must not be backticked and must be in lowercase.
 */

const keywords = /(curl |wget|cron)/i;
const keywords_lower = /(curl |wget|cron)/;

module.exports = {
    names: ["MD101", "backtick-keywords"],
    description: " ",
    tags: ["backtick", "code", "bash"],
    "function": (params, onError) => {
        params.tokens.forEach((token, index, tokens) => {
            if (token.children != null) {
                let words = token.children.filter(child => keywords.test(child.content));
                for (let word of words) {
                    if (tokens[index - 1].type != "heading_open") {
                        if ((word.type != "code_inline") || (!keywords_lower.test(word.content))) {
                            onError({
                                lineNumber: word.lineNumber,
                                detail: "Keywords must be backticked and in lowercase: " + word.content
                            })
                        }
                    } else {
                        if ((word.type === "code_inline") || (!keywords_lower.test(word.content))) {
                            onError({
                                lineNumber: word.lineNumber,
                                detail: "Keyword in header must not be backticked and must be in lowercase: " + word.content
                            })
                        }
                    }
                }
            }
        })
    }
};
