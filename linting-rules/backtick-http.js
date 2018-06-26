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
 * Plugin checks that HTTP keywords below are backticked if they are:
 * a) not in heading;
 * b) not in code block.
 * HTTP keyword in header must not be backticked.
 */

const http_keywords = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "Content-Type.* ",
    "Content-Encoding.* ",
    "Authorization.* ",
    "User-Agent.* ",
    "200 OK",
    "200",
    "401",
    "403",
    "API_DATA_READ",
    "API_DATA_WRITE",
    "API_META_READ",
    "API_META_WRITE",
    "USER",
    "EDITOR",
    "ENTITY_GROUP_ADMIN",
    "ADMIN"
]

const keywordsRegex = new RegExp(http_keywords.map(word => "\\b" + word + "\\b").join("|"));

module.exports = {
    names: ["MD103", "backtick-http"],
    description: " ",
    tags: ["backtick", "HTTP", "HTTPS"],
    "function": (params, onError) => {
        let tokens = params.tokens;
        if (tokens) {
            params.tokens.forEach((token, index, tokens) => {
                if (token.children != null) {
                    let words = token.children.filter(child => keywordsRegex.test(child.content));
                    for (let word of words) {
                        let match = word.line.match(keywordsRegex);
                        if (tokens[index - 1].type != "heading_open") {
                            if (word.type != "code_inline") {
                                onError({
                                    lineNumber: word.lineNumber,
                                    detail: "HTTP keyword '" + match + "' must be backticked.",
                                    range: [match.index + 1, match[0].length]
                                })
                            }
                        } else {
                            if (word.type === "code_inline") {
                                onError({
                                    lineNumber: word.lineNumber,
                                    detail: "HTTP keyword '" + match + "' in header must not be backticked.",
                                    range: [match.index + 1, match[0].length]
                                })
                            }
                        }
                    }
                }
            })
        }
    }
};