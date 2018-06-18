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
 * Plugin checks that bash keywords are backticked if they are:
 * a) not in heading
 * b) not in code block
 * c) are in uppercase
 */

let bash_keywords = ['curl', 'wget'];

module.exports = {
    names: ["MD101", "backtick-keywords"],
    description: "Bash keywords must be backticked and lowercased.",
    tags: ["backtick", "code", "bash"],
    "function": (params, onError) => {
        params.tokens.filter(token => (token.type != "fence") && token.children.filter(child =>
            bash_keywords.indexOf(child.content.toLowerCase()) > -1)).forEach(token => {
                let keywords = token.children;
                for (let word of keywords) {
                    if (!(word.type === 'code_inline') && !(bash_keywords.indexOf(word.content) > -1)) {
                        onError({
                            lineNumber: word.lineNumber
                        })
                    }
                }
            }
            )
    }
};