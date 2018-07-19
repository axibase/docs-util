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
 * Plugin checks that Charts code blocks are fenced with `ls` info.
 */

const charts = /\[widget\]|\[series\]|\[tags\]|\[column\]|\[property\]/
module.exports = {
    names: ["MD108", "ls-info-for-charts-code"],
    description: "Charts code blocks fence.",
    tags: ["fence", "charts"],
    "function": (params, onError) => {
        params.tokens.filter(t => (t.type === "fence") && (charts.test(t.content))).forEach(token => {
            if (token.info != "ls") {
                onError({
                    lineNumber: token.lineNumber,
                    detail: `Expected "ls". Actual "${token.info}".`
                })
            }
        });
    }
};