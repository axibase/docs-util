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

const { InlineTokenChildren } = require("../common/InlineTokenChildren")
const { WordPattern } = require("../common/Utils")

const keywords = [
    new WordPattern("curl", "curl"),
    new WordPattern("wget", "wget"),
    new WordPattern("crontab", "crontab"),
    new WordPattern("cron", "cron"),
    new WordPattern("netcat", "netcat"),
    new WordPattern("ping", "ping"),
    new WordPattern("traceroute", "traceroute"),
    new WordPattern("sudo", "sudo"),
    new WordPattern("(?<!(system |ISRG ))root(?! ca)", "root"),// match "root", but not "root CA", "MacOS System Root" and "ISRG Root X1"
    new WordPattern("true", "true"),
    new WordPattern("false", "false"),
    new WordPattern("jps", "jps"),
    new WordPattern("name=value", "name=value"),
    new WordPattern("key=value", "key=value"),
    new WordPattern("atsd.log", "atsd.log"),
    new WordPattern("logback.xml", "logback.xml"),
    new WordPattern("graphite.conf", "graphite.conf"),
    new WordPattern("command_malformed.log", "command_malformed.log"),
    new WordPattern("stdout", "stdout"),
    new WordPattern("stderr", "stderr"),
    new WordPattern("SIGTERM", "SIGTERM"),
    new WordPattern("NaN", "NaN")
]

module.exports = {
    names: ["MD101", "backtick-keywords"],
    description: "Keywords must be fenced and must be in appropriate case.",
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
                                if ((!inHeading && !inLink && isText) || // Bad not fenced
                                    (match != correct)) { // Right fencing, wrong case  
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
    }
};
