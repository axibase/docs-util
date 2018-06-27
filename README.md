# Documentation Helpers

## Axibase Documentation Guide

To write good documentation refer to [Axibase Documentation Guide](./guide.md).

## Install Axibase Rules in VSCode

To apply automatic checks for `*.md` files refer to [Install Rules in VSCode](./vscode-rule-installation-guide.md) guide.

## Create and Test Lint Rule

To create new rule refer to [Create and Test Lint Rule](./how-to-add-custom-linter-rule.md) guide.

## Axibase Rules

|ID | Name| Description|
|---|---|---|
|MD100|[relative-image-urls](linting-rules/relative-image-urls.js)| Checks relative image urls start with './' or '../', which is required by Vuepress image loader.|
|MD101|[backtick-keywords](linting-rules/backtick-keywords.js)|Checks that [keywords](linting-rules/backtick-keywords.js#L29) are fenced and have exact case.<br>Fence check is skipped for:<ul><li>code blocks</li><li>links</li><li>headers</li></ul> Case check is skipped for:<ul><li>code blocks</li></ul>|
|MD102|[blacklisted-words](linting-rules/blacklisted-words.js)|Locates [patterns](linting-rules/blacklisted-words.js#L62) prohibited in Axibase style [guide](./guide.md).|
|MD103|[backtick-http](linting-rules/backtick-http.js)|Checks that [HTTP-related](linting-rules/backtick-http.js#L23) words are fenced. HTTP keywords in headers can either be fenced or not.|