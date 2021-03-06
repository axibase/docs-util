# Axibase Guides And Document Checking Utilities

## Resources

* [Style guides](./styleguides)
  * [Axibase Documentation Guide](./styleguides/docs.md)
  * [JavaScript](./styleguides/js.md)
* Installing [Custom Rules in VSCode](docs/vscode-rule-installation-guide.md)
* Creating a [Custom Rule](docs/CONTRIBUTING.md)

## Custom Rules

|ID | Name| Description|
|---|---|---|
|MD100|[relative-image-urls](linting-rules/relative-image-urls.js)| Checks relative image urls start with `./` or `../`, which is required by Vuepress image loader.|
|MD101|[backtick-keywords](linting-rules/backtick-keywords.js)|Checks that [keywords](linting-rules/backtick-keywords.js#L29) are fenced and have exact case.<br>Fence check is skipped for: **code blocks**, **links**, **headers**. <br>Case check is skipped for: **code blocks**.|
|MD102|[blacklisted](linting-rules/blacklisted.js)|Locates [patterns](linting-rules/common/blacklist.js) prohibited in Axibase style [guide](./styleguides/docs.md).|
|MD103|[backtick-http](linting-rules/backtick-http.js)|Checks that [HTTP-related](linting-rules/backtick-http.js#L23) words are fenced. HTTP keywords in headers can either be fenced or not.|
|MD104|[whitelist-mail-url-ip](linting-rules/whitelist-mail-url-ip.js)|Locates credentials, email, url and ip prohibited in Axibase style [guide](./styleguides/docs.md#example-names). See [white list](linting-rules/whitelist-mail-url-ip.js#L22).|
|MD105|[blacklisted-for-use-cases](linting-rules/blacklisted-for-use-cases.js)|Locates [patterns](linting-rules/common/blacklist.js) in atsd-use-cases prohibited in Axibase style [guide](./styleguides/docs.md).|
|MD106|[case-sensitive](linting-rules/case-sensitive.js)|Plugin checks that [keywords](linting-rules/case-sensitive.js#L25) have exact case. <br>Case check is skipped for: **code blocks**, **links**, **"Category" column** (changelogs), **fence blocks**.|
|MD107|[no-space-in-fenced-code](linting-rules/no-space-in-fenced-code.js)|Plugin locates whitespace characters at the beginning of code block excluding `txt`.|
|MD108|[ls-info-for-charts-code](linting-rules/ls-info-for-charts-code.js)|Plugin checks that Charts code blocks are fenced with `ls` info.|

## Manual Checks

Install [markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli#markdownlint-cli--):

```bash
npm install -g markdownlint-cli
```

Clone or update `docs-util`:

```bash
git clone https://github.com/axibase/docs-util.git
# update
cd docs-util && git pull
```

Replace `/path/to` with appropriate values:

```bash
markdownlint [--config /path/to/.markdownlint.json] -r "/path/to/docs-util/linting-rules/*" /path/to/checked_docs
```

Example:

```bash
user@axibase:~/atsd$ markdownlint -r "../../docs-util/linting-rules/*" .
```
