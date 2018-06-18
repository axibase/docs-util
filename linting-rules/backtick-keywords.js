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
 * Plugin checks that bash keywords are backticked and in lowercase if they are:
 * a) not in heading
 * b) not in code block 
 */

const bash_keywords = /(curl|wget)/i;
const bash_keywords_lower = /(curl|wget)/;

module.exports = {
    names: ["MD101", "backtick-keywords"],
    description: "Bash keywords must be backticked and lowercased.",
    tags: ["backtick", "code", "bash"],
    "function": (params, onError) => {
        params.tokens.filter((token, index, tokens) => (token.type === "inline") && (tokens[index - 1].type != "heading_open")).forEach(token => {
            let keywords = token.children.filter(child => bash_keywords.test(child.content));
            for (let word of keywords) {
                if ((word.type != "code_inline") || (!bash_keywords_lower.test(word.content))) {
                    onError({
                        lineNumber: word.lineNumber,
                        detail: word.content
                    })
                }
            }
        })
    }
};