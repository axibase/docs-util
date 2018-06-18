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
 * Plugin checks blacklisted words below (case-insensitive).
 */

const blacklist = {
    "should": "use 'must' or 'remove'",
    "could": "-",
    "would": "-",
    "may": "'can'",
    "will": "use present tense",
    "was": "use present tens",
    "abort": "'stop', 'cancel'",
    "kill": "'stop', 'cancel'",
    "terminate": "'stop', 'cancel'",
    "admin": "'administrator'",
    "so, a lot": "use formal style",
    "deselect": "'clear'",
    "uncheck": "'clear'",
    "flag": "'option', 'setting'",
    "ingest": "'load', 'import'",
    "lets": "-",
    "please": "-",
    "regex": "'regular expression'",
    "Epoch time": "Unix time",
    "datacenter": "data center",
    "and/or": "clarify the meaning",
    "in order to": "'to'",
    "make sure": "'ensure'",
    "end-point": "'endpoint'",
    "click on": "'click'",
    "robust": "avoid trite words"
}

module.exports = {
    names: ["MD102", "blacklisted-words"],
    description: " ",
    tags: ["blacklist"],
    "function": (params, onError) => {
        params.tokens.filter(t => t.type === "inline").forEach(token => {
            token.children.forEach(child => Object.keys(blacklist).forEach(bad_word => {
                let regex = new RegExp(bad_word, 'i');
                if (regex.test(child.content)) {
                    onError({
                        lineNumber: child.lineNumber,
                        detail: "The word '" + bad_word + "' is blacklisted. Alternatives: " + blacklist[bad_word]
                    })
                }
            }))
        });
    }
};