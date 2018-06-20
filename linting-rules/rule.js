class Rule {
    constructor(pattern, suggestion, caseSensitive) {
        this.pattern = pattern;
        const modifiers = caseSensitive ? "" : "i";
        this.regex = new RegExp("\\b" + pattern + "\\b", modifiers);
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

    found() {
        return !!this.match;
    }

    range() {
        if (this.match) {
            let column = this.match.index + 1;
            let length = this.match[0].length;
            if (match[2]) {
                column += this.match[1].length;
                length -= this.match[1].length;
            }
            return [ column, length ];
        }
        return null;
    }

    toString() {
        return this.match ? "null" : this.match.toString();
    }
}

module.exports = Rule;