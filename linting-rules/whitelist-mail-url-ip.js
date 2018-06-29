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
 * Plugin locates credentials, email, url and ip examples prohibited in Axibase style guide.
 */

const white_list = [
    "support-atsd@axibase.com",
    "user@example.org",
    "test@example.org",
    "john.doe@example.org",
    "jack.smith@example.org",
    "mary.jones@example.org",
    "username:password@example.org",
    "username:password@atsd_hostname",
    "username:password@192.0.2.1",
    "username:password@198.51.100.1",
    "username:password@203.0.113.0",
    "user:password@atsd_hostname",
    "usr:pwd@atsd_hostname",
    "atsd_user:atsd_user_password@atsd_hostname",
    "reader:my_password@192.0.2.6",
    "cuser:cpass@192.0.2.9",
    "slack:12345678@atsd_hostname",
    "telegram:12345678@atsd_hostname",
    "john.doe:secret@atsd_hostname",
    "john.doe:secret@192.0.2.\\d{1,3}",
    "john.doe:secret@example.org",
    "git@github.com",
    "SelectChannelConnector@0.0.0.0",
    "SslSelectChannelConnector@0.0.0.0",
    "username:password@HADOOP.EXAMPLE.ORG",
    "_HOST@HADOOP.EXAMPLE.ORG",
    "login:axibase@HADOOP.EXAMPLE.ORG",
    "axibase@HADOOP.EXAMPLE.ORG",
    "HBase@prod",
    "ATSD@prod",
    "Redmine@prod",
    "atsdreadonly@atsd_hostname",
    "0.0.0.0",
    "1.1.1.1",
    "8.8.8.8",
    "192.0.2.\\d{1,3}(/24)?",
    "198.51.100.\\d{1}",
    "203.0.113.\\d{1}",
    "198.51.100.0/24",
    "203.0.113.0/24",
    "127.0.[01].1(/\\d+)?",
    "172.17.0.\\d{1,2}",
    "172.30.0.\\d{1,2}",
    "12.2.0.1", // Oracle EE 12c 12.2.0.1 database.
    "6.1.8.1", // Example in nmon-upload.md
    "6.1.7.16", "7.1.3.16", // Examples in headers.md
    "2.6.6.1", // RHEL version in ambari.md
    "124.216.164.14", "37.58.57.238" // Example in data_retention.md
].map(x => x.replace(/\\?\./g, "\\."))

const regexForSearch = /(?:[\w\.]+:)?[-_\w\.]+@[-_\w\.]+/g; // match URLs, credentials, Emails
const ipRegexForSearch = /\b(?:\d{1,3}\.){3}\d{1,3}(\/\d+)?\b/g; // match IPs
const regexForCheck = new RegExp(white_list.map(word => "\\b^" + word + "$\\b").join("|")); // white list
const { InlineTokenChildren } = require("../common/InlineTokenChildren");

module.exports = {
    names: ["MD104", "whitelist-mail-and-host"],
    description: "Example is prohibited, refer to whitelist.",
    tags: ["email", "url", "ip"],
    "function": (params, onError) => {
        params.tokens.filter(t => (t.type == "inline" || t.type == "fence")).forEach(token => {
            let inFence = token.type === "fence";
            if (inFence) {
                let match = [token.content.match(regexForSearch), token.content.match(ipRegexForSearch)];
                if (match) {
                    match.filter(m => m).forEach(m => {
                        m.filter(checked => !regexForCheck.test(checked)).forEach(incorrect => {
                            let beforeMatch = token.content.substring(0, token.content.indexOf(incorrect));
                            let LF = beforeMatch.match(/\n/g);
                            let ln = LF == null ? token.lineNumber + 1 : token.lineNumber + LF.length + 1;
                            let left = LF == null ? token.content.indexOf(incorrect) + 1 : token.content.substring(beforeMatch.lastIndexOf("\n")).indexOf(incorrect);
                            onError({
                                lineNumber: ln,
                                detail: `Wrong: '${incorrect}'.`,
                                range: [left, incorrect.length]
                            })
                        })
                    });
                }
            } else {
                let children = new InlineTokenChildren(token);
                for (let { token: child, column, lineNumber } of children) {
                    let match = [child.content.match(regexForSearch), child.content.match(ipRegexForSearch)];
                    if (match) {
                        match.filter(m => m).forEach(m => {
                            m.filter(checked => !regexForCheck.test(checked)).forEach(incorrect => {
                                onError({
                                    lineNumber,
                                    detail: `Wrong: '${incorrect}'.`,
                                    range: [column + child.content.indexOf(incorrect), incorrect.length]
                                })
                            });
                        });
                    }
                }
            }
        })
    }
};
