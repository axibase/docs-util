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
 * Plugin locates credentials, email and url examples prohibited in Axibase style guide.
 */

const white_list = [
    "support-atsd@axibase.com",
    "user@example.org",
    "test@example.org",
    "john.doe@example.org",
    "jack.smith@example.org",
    "mary.jones@example.org",
    "username:password@atsd_hostname",
    "username:password@192.0.2.1",
    "username:password@198.51.100.1",
    "username:password@203.0.113.0",
    "john.doe:secret@atsd_hostname",
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
    "atsdreadonly@atsd_hostname"
]
const regex = /\w+:?[-_\w\.]+@[-_\w\.]+/;
const { InlineTokenChildren } = require("../common/InlineTokenChildren");

module.exports = {
    names: ["MD104", "whitelist-mail-and-host"],
    description: "Example is prohibited, refer to whitelist.",
    tags: ["email", "hostname"],
    "function": (params, onError) => {
        params.tokens.filter(t => (t.type == "inline" || t.type == "fence")).forEach(token => {
            let inFence = token.type === "fence";
            if (inFence) {
                let match = token.content.match(regex);
                if ((match != null) && (white_list.find(mail => mail === match[0]) == null)) {
                    let beforeMatch = token.content.substring(0, token.content.indexOf(match[0]));
                    let LF = beforeMatch.match(/\n/g);
                    let ln = LF == null ? token.lineNumber + 1 : token.lineNumber + LF.length + 1;
                    let left = LF == null ? token.content.indexOf(match[0]) + 1 : token.content.substring(beforeMatch.lastIndexOf("\n")).indexOf(match[0]);
                    onError({
                        lineNumber: ln,
                        detail: `Wrong: '${match}'.`,
                        range: [left, match[0].length]
                    })
                }
            } else {
                let children = new InlineTokenChildren(token);
                for (let { token: child, column, lineNumber } of children) {
                    let match = child.content.match(regex);
                    if ((match != null) && (white_list.find(mail => mail === match[0]) == null)) {
                        onError({
                            lineNumber,
                            detail: `Wrong: '${match}'.`,
                            range: [column + match.index, match[0].length]
                        })
                    }
                }
            }
        })
    }
};
