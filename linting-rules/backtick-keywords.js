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
 * Plugin checks that curl, wget are backticked if they are:
 * a) not in heading
 * b) not in code block.
 */

const testExternal = /^(?:https?\:)?\/\//;
const testValidRelative = /^(?:\.\.?\/)/;

module.exports = {
    names: ["MD101", "backtick-keywords"],
    description: "curl, wget must be backticked if they are a) not in heading b) not in code block.",
    tags: ["backtick", "code"],
    "function": (params, onError) => {
        params.tokens.filter(t => t.type === "content").forEach(token => {
            let images = token.children.filter(t => t.type === "image")
            for (let img of images) {
                let src = img.attrGet("src")
                if (src) {
                    let isExternal = testExternal.test(src);
                    let isValidRelative = testValidRelative.test(src);
                    if (!isExternal && !isValidRelative) {
                        let index = img.line.indexOf(src);
                        let range =  [index+1, src.length];
                        onError({
                            lineNumber: img.lineNumber,
                            details: `In the image for ${img.content}`,
                            context: `![${src}](${img.content})`,
                            range,
                        })
                    }
                }
            }
        });
    }
};