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
 * Plugin checks that keywords below have exact case if they are not in code blocks, 
 * links, "Category" column (changelogs) and are not fenced. 
 */
const { InlineTokenChildren } = require("../common/InlineTokenChildren")
const { WordPattern } = require("../common/Utils")

const keywords = [
    new WordPattern("ATSD(?![-@:])", { suggestion: "ATSD" }),
    new WordPattern("HDFS"),
    new WordPattern("HBase"),
    new WordPattern("HTTP(?!-pool)", { suggestion: "HTTP" }),
    new WordPattern("HTTPS"),
    new WordPattern("LDAP"),
    new WordPattern("TCP"),
    new WordPattern("UDP"),
    new WordPattern("SSL"),
    new WordPattern("JMX"),
    new WordPattern("SSH"),
    new WordPattern("DNS"),
    new WordPattern("SQL(?!-)", { suggestion: "SQL" }),
    new WordPattern("Unix"),
    new WordPattern("XLS"),
    new WordPattern("(?<!.)CSV", { suggestion: "CSV" }),
    new WordPattern("(?<![./])JSON", { suggestion: "JSON" }),
    new WordPattern("(?<!.)XML", { suggestion: "XML" }),
    new WordPattern("(?<!.)PDF", { suggestion: "PDF" }),
    new WordPattern("(?<!.)HTML", { suggestion: "HTML" }),
    new WordPattern("(?<!.)XLSX", { suggestion: "XLSX" }),
    new WordPattern("(?<!.)ZIP", { suggestion: "ZIP" }),
    new WordPattern("(?<!.)GZIP", { suggestion: "GZIP" }),
    new WordPattern("(?<!.)TAR", { suggestion: "TAR" }),
    //new WordPattern("(?<!.)JAR", { suggestion: "JAR" }),
    new WordPattern("REST API"),
    new WordPattern("JVM"),
    new WordPattern("UTF"),
    new WordPattern("URL"),
    new WordPattern("URI"),
    new WordPattern("ISO"),
    new WordPattern("ASCII"),
    new WordPattern("ANSI"),
    new WordPattern("W3C"),
    new WordPattern("UTC"),
    new WordPattern("EST"),
    new WordPattern("GMT")
]

var inTableCell = false;
module.exports = {
    names: ["MD106", "case-sensitive"],
    description: "Keywords must have appropriate case.",
    tags: ["case sensitive"],
    "function": (params, onError) => {
        params.tokens.forEach(token => {
            var inLink = false;
            var childrenCheks = true;
            switch (token.type) {
                case "td_open":
                    inTableCell = true; break;
                case "td_close":
                    inTableCell = false; break;
                case "inline":
                    if (inTableCell) {
                        for (let k of keywords) {
                            // If cell contains only one word and it's in keywords
                            if (k.stringRegex.test(token.content)) {
                                childrenCheks = false;
                                break;
                            }
                        }
                    }
                    if (childrenCheks) {
                        let children = new InlineTokenChildren(token);
                        for (let { token: child, column, lineNumber } of children) {
                            let isText = child.type === "text";
                            switch (child.type) {
                                case "link_open":
                                    inLink = true; break;
                                case "link_close":
                                    inLink = false; break;
                            }
                            for (let k of keywords) {
                                let anyCaseMatch = child.content.match(k.regex);
                                if (anyCaseMatch != null) {
                                    let match = anyCaseMatch[0];
                                    let correct = k.suggestion;
                                    if (!inLink && isText && (match != correct)) {
                                        onError({
                                            lineNumber,
                                            detail: `Expected ${correct}. Actual ${match}.`,
                                            range: [column + anyCaseMatch.index, match.length]
                                        })
                                    }
                                }
                            }
                        }
                    }
            }
        })
    }
};