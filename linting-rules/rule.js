class Rule {
    constructor(pattern, suggestion, caseSensitive) {
        this.pattern = pattern;
        const modifiers = caseSensitive ? "" : "i";
        this.regex = new RegExp("\\b" + pattern + "\\b", modifiers);
        this.suggestion = suggestion;
    }
}

module.exports = Rule;