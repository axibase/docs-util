# How To Add Custom markdownlint Rule

## Create Rule File

Create JavaScript file in `linting-rules` directory, e.g. `my-rule.js`. It must be a CommonJS module, which exports object with structure described below:

```typescript
module.exports = {
    /**
     * Name of rule, used in config files. Add MD1XX code, where XX should be
     * incremental, and the name of current file
     */
    names: string[];
    /**
     * Rule ID and human-readable description
     */
    description: string;
    /**
     * Add some groups which this rule can belong to
     * Important: do not use dashes, for example "case-sensitive"
     */
    tags: string[]
    /**
     * Test function itself
     */
    "function": (params, onError) => void;
}
```

See the [official guide](https://github.com/DavidAnson/markdownlint/blob/master/doc/CustomRules.md) for details and examples.
Since we use Node 8 or Chromium you can use most of ES6 features, except esm-modules.

## Implement Test Function

Test function takes 2 arguments: `params` object and `onError` callback.
The most important thing in the function input is `params.tokes` field, which is the list of document tokens, parsed by `markdown-it`. Visit the [API reference](https://markdown-it.github.io/markdown-it/#Token) for details.
One useful tool is the [`markdown-it` playground](https://markdown-it.github.io/), which can help you to discover how the token tree looks for your test case. Type an example and go to debug tab.

The `onError` callback takes an object, describing what goes bad and where. The only required field is `lineNumber`, but try to provide as much info, as possible. Take a look at [InlineTokenChildren](common/InlineTokenChildren.js) module, it helps to [iterate](linting-rules/backtick-keywords.js#L73) over `token.children` array. Also this module useful for creating [range](linting-rules/backtick-keywords.js#L90) array for proper underline in VSCode:

![](./images/vscode_underline.png)

Refer to Axibase [rules](README.md#axibase-rules).

## Debug Rule

1. Configure `debug/mdlint.js`, replace `<rule-filename>` with appropriate rule file, for example `my-rule.js`:

    ![](./images/debug_myrule.png)

2. Configure `.vscode/launch.json`, set field `program` to `"${workspaceFolder}/debug/mdlint.js"`:

    ```json
    {
     "version": "0.2.0",
     "configurations": [
        {
         "type": "node",
         "request": "launch",
         "name": "Launch Program",
         "program": "${workspaceFolder}/debug/mdlint.js"
        }
      ]
    }
    ```

3. Add some cases to `foo.md` and start debug:

   ![](./images/debug.png)

## Run Tests

Before commit changes ensure tests are passed:

```node
npm install
npm run test
```

![](./images/tests_passed.png)
