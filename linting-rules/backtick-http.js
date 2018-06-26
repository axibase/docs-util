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
 * Plugin checks that HTTP keywords below are fenced.
 * HTTP keywords in headers can either be fenced or not.
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
    "401 Unauthorized",
    "403 Forbidden",
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

const { InlineTokenChildren } = require("../common/InlineTokenChildren");

module.exports = {
    names: ["MD103", "backtick-http"],
    description: "HTTP keywords must be fenced.",
    tags: ["backtick", "HTTP", "HTTPS"],
    "function": (params, onError) => {
        var inHeading = false
        for (let token of params.tokens) {
            switch (token.type) {
                case "heading_open":
                    inHeading = true; break;
                case "heading_close":
                    inHeading = false; break;
                case "inline":
                    let children = new InlineTokenChildren(token);
                    for (let { token: child, column, lineNumber } of children) {
                        let isText = child.type === "text"
                        let anyCaseMatch = child.content.match(keywordsRegex);
                        if (anyCaseMatch != null) {
                            let match = anyCaseMatch[0];
                            let correct = http_keywords.find(kw => kw.toLowerCase() === match.toLowerCase());
                            // Bad not fenced
                            if (!inHeading && isText) {                                
                                onError({
                                    lineNumber,
                                    detail: `Expected \`${correct}\`. Actual ${match}.`,
                                    range: [column, match.length]
                                })
                            }
                        }
                    }
            }
        }
    }
};