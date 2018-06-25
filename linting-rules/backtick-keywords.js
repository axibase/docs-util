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
 * Plugin checks that keywords below are backticked and in lowercase (except words in keywords_only_upper ) if they are:
 * a) not in heading;
 * b) not in code block.
 * Keyword in header must not be backticked and must be in lowercase (except words in keywords_only_upper).
 */

const api_path = "\\B\\/[\\w]+[\\w-\\/{}]*";
const keywords = [
    "curl",
    "wget",
    "crontab",
    "cron",
    "netcat",
    "top",
    "ps",
    "ping",
    "traceroute",
    "sudo",
    "root",
    "axibase",
    "true",
    "false",
    "null",
    "jps",
    "name=value",
    "key=value",
    api_path,
    "atsd.log",
    "logback.xml",
    "stdout",
    "stderr",
    "graphite.conf",
    "SIGTERM",
    "NaN"
]

const keywords_only_upper = [
    "NaN",
    "SIGTERM"
]

const keywordsRegexExactCase = new RegExp(keywords.join("|"));
const keywordsRegexAnyCase = new RegExp(keywords.map(word => {
    if (word === api_path) {
        return word;
    } else {
        return "\\b" + word + "\\b";
    }
}).join("|"), 'i');
const keywordsOnlyUpperRegex = new RegExp(keywords_only_upper.join("|"), 'i');

module.exports = {
    names: ["MD101", "backtick-keywords"],
    description: " ",
    tags: ["backtick", "code", "bash"],
    "function": (params, onError) => {
        params.tokens.forEach((token, index, tokens) => {
            if (token.children != null) {
                let words = token.children.filter(child => keywordsRegexAnyCase.test(child.content));
                for (let word of words) {
                    let match = word.line.match(keywordsRegexAnyCase);
                    if (tokens[index - 1].type != "heading_open") {
                        if ((word.type != "code_inline") || (!keywordsRegexExactCase.test(match))) {
                            let desc = "Phrase '" + match + "' must be backticked";
                            onError({
                                lineNumber: word.lineNumber,
                                detail: keywordsOnlyUpperRegex.test(match) ? desc + " and must be in uppercase." : desc + " and must be in lowercase.",
                                range: [match.index + 1, match[0].length]
                            })
                        }
                    } else {
                        if ((word.type === "code_inline") || (!keywordsRegexExactCase.test(match))) {
                            let desc = "Phrase '" + match + "' in header must not be backticked";
                            onError({
                                lineNumber: word.lineNumber,
                                detail: keywordsOnlyUpperRegex.test(match) ? desc + " and must be in uppercase." : desc + " and must be in lowercase.",
                                range: [match.index + 1, match[0].length]
                            })
                        }
                    }
                }
            }
        })
    }
};