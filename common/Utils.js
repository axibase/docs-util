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

class WordPattern {
    constructor(pattern, suggestion, caseSensitive, noWordBoundary) {
        const escapedDots = pattern.replace(/\\?\./g, "\\.");
        this.pattern = noWordBoundary ? escapedDots : "\\b" + escapedDots + "\\b";
        const modifiers = caseSensitive ? "" : "i";
        this.regex = new RegExp(this.pattern, modifiers);
        this.suggestion = suggestion;
    }

    test(line) {
        return new Match(line.match(this.regex));
    }
}

class Match {
    constructor(match) {
        this.match = match;
    }

    get found() {
        return !!this.match;
    }

    range() {
        if (this.match) {
            let column = this.match.index + 1;
            let length = this.match[0].length;
            if (this.match[2]) {
                column += this.match[1].length;
                length -= this.match[1].length;
            }
            return [column, length];
        }
        return null;
    }

    toString() {
        return this.match ? this.match.toString() : "null";
    }
}

module.exports = { WordPattern }