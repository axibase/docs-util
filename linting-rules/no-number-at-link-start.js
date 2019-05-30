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
 * Plugin checks that relative url does not start with number and suggest to insert `_`
 * between `#` and number, because Vuepress performs the same transformation during headers
 * links parsing and links, referencing that headers, became broken.
 * @see [slugify]{@link https://github.com/axibase/atsd/tree/master/.vuepress/config.js#L436} for further information.
 */
const { InlineTokenChildren } = require("../common/InlineTokenChildren")
const linkStartsWithNumber = /^#(\d)/;

module.exports = {
    names: ["MD109", "no-number-at-link-start"],
    description: "Links must not start with number",
    tags: ["links"],
    "function": (params, onError) => {
        params.tokens.filter(t => t.type === "inline").forEach(token => {
            const children = new InlineTokenChildren(token);
            for (const { token: child, column, lineNumber } of children) {
                if (child.type === "link_open") {
                    const incorrectLinkMatch = child.attrs[0][1].match(linkStartsWithNumber);
                    if (incorrectLinkMatch !== null) {
                        const number = incorrectLinkMatch[1];
                        onError({
                            lineNumber,
                            detail: `Replace #${number} with #_${number}.`,
                            range: [incorrectLinkMatch.index, incorrectLinkMatch.length]
                        })
                    }
                    break;
                }
            }
        });
    }
};
