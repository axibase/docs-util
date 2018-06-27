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
 * Plugin checks that keywords below are fenced and have exact case. 
 * Fence check is skipped for:
 *  a) code blocks; 
 *  b) links;
 *  c) headers.
 * Case check is skipped for:
 *  a) code blocks.
 */

//const api_path = "\\B\\/[\\w]+[\\w-\\/{}]*";
const keywords = [
    "curl",
    "wget",
    "crontab",
    "cron",
    "netcat",
    "ps",
    "ping",
    "traceroute",
    "sudo",
    "root",
    "true",
    "false",
    "jps",
    "name=value",
    "key=value",
    "atsd.log",
    "logback.xml",
    "stdout",
    "stderr",
    "graphite.conf",
    "SIGTERM",
    "NaN"
]
const keywordsRegexExactCase = new RegExp(keywords.join("|"));
const keywordsRegexAnyCase = new RegExp(keywords.map(word => "\\b" + word + "\\b").join("|"), 'i');

const { InlineTokenChildren } = require("../common/InlineTokenChildren")

module.exports = {
    names: ["MD101", "backtick-keywords"],
    description: "Keywords must be fenced.",
    tags: ["backtick", "code", "bash"],
    "function": (params, onError) => {
        var inHeading = false;
        var inLink = false;
        for (let token of params.tokens) {
            switch (token.type) {
                case "heading_open":
                    inHeading = true; break;
                case "heading_close":
                    inHeading = false; break;
                case "inline":
                    let children = new InlineTokenChildren(token);
                    for (let { token: child, column, lineNumber } of children) {
                        switch (child.type) {
                            case "link_open":
                                inLink = true; break;
                            case "link_close":
                                inLink = false; break;
                            case "text":
                                isText = true; break;
                            default:
                                isText = false; break;
                        }
                        let anyCaseMatch = child.content.match(keywordsRegexAnyCase);
                        if (anyCaseMatch != null) {
                            let match = anyCaseMatch[0];
                            let correct = keywords.find(kw => kw.toLowerCase() === match.toLowerCase());
                            if ((!inHeading && !inLink && isText) || // Bad not fenced
                                (!keywordsRegexExactCase.test(match))) { // Right fencing, wrong case  
                                onError({
                                    lineNumber,
                                    detail: `Expected \`${correct}\`. Actual ${match}.`,
                                    range: [column + anyCaseMatch.index, match.length]
                                })
                            }
                        }
                    }
            }
        }
    }
};
