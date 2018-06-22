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
    "/.[^ ]*",
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

const keywordsRegexAnyCase = new RegExp(keywords.join("|"), 'i');
const keywordsRegexExactCase = new RegExp(keywords.join("|"));
const keywordsOnlyUpperRegex = new RegExp(keywords_only_upper.join("|"), 'i');

rangeFromRegExp = function rangeFromRegExp(line, regexp) {
    let range = null;
    const match = line.match(regexp);
    if (match) {
        let column = match.index + 1;
        let length = match[0].length;
        if (match[2]) {
            column += match[1].length;
            length -= match[1].length;
        }
        range = [column, length];
    }
    return range;
};

module.exports = {
    names: ["MD101", "backtick-keywords"],
    description: " ",
    tags: ["backtick", "code", "bash"],
    "function": (params, onError) => {
        params.tokens.forEach((token, index, tokens) => {
            if (token.children != null) {
                let words = token.children.filter(child => keywordsRegexAnyCase.test(child.content));
                for (let word of words) {
                    let keyword = word.line.match(keywordsRegexAnyCase);
                    if (tokens[index - 1].type != "heading_open") {
                        if ((word.type != "code_inline") || (!keywordsRegexExactCase.test(word.content))) {
                            let desc = "Keyword '" + keyword + "' must be backticked";
                            onError({
                                lineNumber: word.lineNumber,
                                detail: keywordsOnlyUpperRegex.test(keyword) ? desc + " and must be in uppercase." : desc + " and must be in lowercase.",
                                range: rangeFromRegExp(word.line, keywordsRegexAnyCase)
                            })
                        }
                    } else {
                        if ((word.type === "code_inline") || (!keywordsRegexExactCase.test(word.content))) {
                            let desc = "Keyword '" + keyword + "' in header must not be backticked";
                            onError({
                                lineNumber: word.lineNumber,
                                detail: keywordsOnlyUpperRegex.test(keyword) ? desc + " and must be in uppercase." : desc + " and must be in lowercase.",
                                range: rangeFromRegExp(word.line, keywordsRegexAnyCase)
                            })
                        }
                    }
                }
            }
        })
    }
};