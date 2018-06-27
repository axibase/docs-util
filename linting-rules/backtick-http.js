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
    "Content-Type",
    "Content-Encoding",
    "User-Agent",
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
                    if (!inHeading) {
                        let children = new InlineTokenChildren(token);
                        for (let { token: child, column, lineNumber } of children) {
                            if (child.type === "text") {
                                let exactCaseMatch = child.content.match(keywordsRegex);
                                if (exactCaseMatch != null) {
                                    let match = exactCaseMatch[0];
                                    onError({
                                        lineNumber,
                                        detail: `Expected \`${match}\`. Actual ${match}.`,
                                        range: [column + exactCaseMatch.index, match.length]
                                    })
                                }
                            }
                        }
                    }
            }
        }
    }
};
