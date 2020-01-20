# Axibase Style Guide for JavaScript Code

This document serves as the definition of Axibase coding standards for source code in the JavaScript Programming Language.

It's mostly based on [Google Code Style](https://google.github.io/styleguide/jsguide.html).

---

## Contents

* [1 Terminology notes](#1-terminology-notes)
* [2 Source file basics](#2-source-file-basics)
  * [2.1 File name](#21-file-name)
  * [2.2 File encoding: UTF-8](#22-file-encoding-utf-8)
  * [2.3 Special characters](#23-special-characters)
    * [2.3.1 Whitespace characters](#231-whitespace-characters)
    * [2.3.2 Special escape sequences](#232-special-escape-sequences)
    * [2.3.3 Non-ASCII characters](#233-non-ascii-characters)
* [3 Source file structure](#3-source-file-structure)
  * [3.1 License or copyright information, if present](#31-license-or-copyright-information-if-present)
  * [3.2 ES `import` statements, if an ES module](#32-es-import-statements-if-an-es-module)
  * [3.3 `require` statements](#33-require-statements)
* [4 Formatting](#4-formatting)
  * [4.1 Braces](#41-braces)
    * [4.1.1 Braces are used for all control structures](#411-braces-are-used-for-all-control-structures)
    * [4.1.2 Nonempty blocks: K&R style](#412-nonempty-blocks-kr-style)
    * [4.1.3 Empty blocks: may be concise](#413-empty-blocks-may-be-concise)
  * [4.2 Block indentation: +4 spaces](#42-block-indentation-4-spaces)
    * [4.2.1 Array literals: optionally block-like](#421-array-literals-optionally-block-like)
    * [4.2.2 Object literals: optionally block-like](#422-object-literals-optionally-block-like)
    * [4.2.3 Class literals](#423-class-literals)
    * [4.2.4 Function expressions](#424-function-expressions)
    * [4.2.5 Switch statements](#425-switch-statements)
  * [4.3 Statements](#43-statements)
    * [4.3.1 One statement per line](#431-one-statement-per-line)
    * [4.3.2 Semicolons are required](#432-semicolons-are-required)
  * [4.4 Column limit: 120](#44-column-limit-120)
  * [4.5 Line-wrapping](#45-line-wrapping)
    * [4.5.1 Where to break](#451-where-to-break)
    * [4.5.2 Indent continuation lines at least +4 spaces](#452-indent-continuation-lines-at-least-4-spaces)
  * [4.6 Whitespace](#46-whitespace)
    * [4.6.1 Vertical whitespace](#461-vertical-whitespace)
    * [4.6.2 Horizontal whitespace](#462-horizontal-whitespace)
    * [4.6.3 Horizontal alignment: discouraged](#463-horizontal-alignment-discouraged)
    * [4.6.4 Function arguments](#464-function-arguments)
  * [4.7 Grouping parentheses: recommended](#47-grouping-parentheses-recommended)
  * [4.8 Comments](#48-comments)
    * [4.8.1 Block comment style](#481-block-comment-style)
* [5 Language features](#5-language-features)
  * [5.1 Local variable declarations](#51-local-variable-declarations)
    * [5.1.1 Use `const` and `let`](#511-use-const-and-let)
    * [5.1.2 One variable per declaration](#512-one-variable-per-declaration)
    * [5.1.3 Declared when needed, initialized as soon as possible](#513-declared-when-needed-initialized-as-soon-as-possible)
    * [5.1.4 Declare types as needed](#514-declare-types-as-needed)
  * [5.2 Array literals](#52-array-literals)
    * [5.2.1 No trailing commas](#521-no-trailing-commas)
    * [5.2.2 Do not use the variadic `Array` constructor](#522-do-not-use-the-variadic-array-constructor)
    * [5.2.3 Non-numeric properties](#523-non-numeric-properties)
    * [5.2.4 Destructuring](#524-destructuring)
    * [5.2.5 Spread operator](#525-spread-operator)
  * [5.3 Object literals](#53-object-literals)
    * [5.3.1 No trailing commas](#531-no-trailing-commas)
    * [5.3.2 Do not use the `Object` constructor](#532-do-not-use-the-object-constructor)
    * [5.3.3 Do not mix quoted and unquoted keys](#533-do-not-mix-quoted-and-unquoted-keys)
    * [5.3.4 Computed property names](#534-computed-property-names)
    * [5.3.5 Method shorthand](#535-method-shorthand)
    * [5.3.6 Shorthand properties](#536-shorthand-properties)
    * [5.3.7 Destructuring](#537-destructuring)
    * [5.3.8 Enums](#538-enums)
  * [5.4 Classes](#54-classes)
    * [5.4.1 Constructors](#541-constructors)
    * [5.4.2 Fields](#542-fields)
    * [5.4.3 Computed properties](#543-computed-properties)
    * [5.4.4 Static methods](#544-static-methods)
    * [5.4.5 Do not manipulate `prototype`s directly](#545-do-not-manipulate-prototypes-directly)
    * [5.4.6 Getters and Setters](#546-getters-and-setters)
    * [5.4.7 Overriding `toString`](#547-overriding-toString)
    * [5.4.8 Interfaces](#548-interfaces)
  * [5.5 Functions](#55-functions)
    * [5.5.1 Top-level functions](#551-top-level-functions)
    * [5.5.2 Nested functions and closures](#552-nested-functions-and-closures)
    * [5.5.3 Arrow functions](#553-arrow-functions)
    * [5.5.4 Generators](#554-generators)
    * [5.5.5 Parameters](#555-parameters)
        * [5.5.5.1 Default parameters](#5551-default-parameters)
        * [5.5.5.2 Rest parameters](#5552-rest-parameters)
    * [5.5.6 Returns](#556-returns)
    * [5.5.7 Spread operator](#557-spread-operator)
  * [5.6 String literals](#56-string-literals)
    * [5.6.1 Use double quotes](#561-use-double-quotes)
    * [5.6.2 Template strings](#562-template-strings)
    * [5.6.3 No line continuations](#563-no-line-continuations)
  * [5.7 Number literals](#57-number-literals)
  * [5.8 Control structures](#58-control-structures)
    * [5.8.1 For loops](#581-for-loops)
    * [5.8.2 Exceptions](#582-exceptions)
        * [5.8.2.1 Empty catch blocks](#5821-empty-catch-blocks)
    * [5.8.3 Switch statements](#583-switch-statements)
        * [5.8.3.1 Fall-through: commented](#5831-fall-through-commented)
        * [5.8.3.2 The `default` case is present](#5832-the-default-case-is-present)
  * [5.9 this](#59-this)
  * [5.10 Disallowed features](#510-disallowed-features)
    * [5.10.1 with](#5101-with)
    * [5.10.2 Dynamic code evaluation](#5102-dynamic-code-evaluation)
    * [5.10.3 Automatic semicolon insertion](#5103-automatic-semicolon-insertion)
    * [5.10.4 Non-standard features](#5104-non-standard-features)
    * [5.10.5 Wrapper objects for primitive types](#5105-wrapper-objects-for-primitive-types)
    * [5.10.6 Modifying builtin objects](#5106-modifying-builtin-objects)
* [6 Naming](#6-naming)
  * [6.1 Rules common to all identifiers](#61-rules-common-to-all-identifiers)
  * [6.2 Rules by identifier type](#62-rules-by-identifier-type)
    * [6.2.1 Package names](#621-package-names)
    * [6.2.2 Class names](#622-class-names)
    * [6.2.3 Method names](#623-method-names)
    * [6.2.4 Enum names](#624-enum-names)
    * [6.2.5 Constant names](#625-constant-names)
        * [6.2.5.1 Definition of "constant"](#6251-definition-of-constant)
        * [6.2.5.2 Local aliases](#6252-local-aliases)
    * [6.2.6 Non-constant field names](#626-non-constant-field-names)
    * [6.2.7 Parameter names](#627-parameter-names)
    * [6.2.8 Local variable names](#628-local-variable-names)
  * [6.3 Camel case: defined](#63-camel-case-defined)
* [7 JSDoc](#7-jsdoc)
  * [7.1 General form](#71-general-form)
  * [7.2 Markdown](#72-markdown)
  * [7.3 Line wrapping](#73-line-wrapping)
  * [7.4 Class comments](#74-class-comments)
  * [7.5 Enum and typedef comments](#75-enum-and-typedef-comments)
  * [7.6 Method and function comments](#76-method-and-function-comments)
  * [7.7 Property comments](#77-property-comments)
  * [7.8 Type annotations](#78-type-annotations)
    * [7.8.1 Nullability](#781-nullability)
  * [7.9 Deprecation](#79-deprecation)
* [8 Policies](#8-policies)
  * [8.1 Code not in Axibase JavaScript Style](#81-code-not-in-axibase-javascript-style)
    * [8.1.1 Reformatting existing code](#811-reformatting-existing-code)
    * [8.1.2 Newly added code: use Axibase JavaScript Style](#812-newly-added-code-use-axibase-javascript-style)
  * [8.2 Generated code: mostly exempt](#82-generated-code-mostly-exempt)
* [9 Appendices](#9-appendices)
  * [9.1 Commonly misunderstood style rules](#91-commonly-misunderstood-style-rules)
  * [9.2 Exceptions for legacy platforms](#92-exceptions-for-legacy-platforms)
    * [9.2.1 Overview](#921-overview)
    * [9.2.2 Use `var`](#922-use-var)
        * [9.2.2.1 `var` declarations are NOT block-scoped](#9221-var-declarations-are-not-block-scoped)
        * [9.2.2.2 Declare variables as close as possible to first use](#9222-declare-variables-as-close-as-possible-to-first-use)
---

## 1 Terminology notes

In this document, unless otherwise clarified:

1. The term _comment_ always refers to _implementation_ comments. We do not use the phrase documentation comments, instead using the common term `JSDoc` for both human-readable text and machine-readable annotations within `/** … */`.

Other terminology notes will appear occasionally throughout the document.

## 2 Source file basics

### 2.1 File name

File names must be all lowercase and may include underscores (`_`) or dashes (`-`), but no additional punctuation. Follow the convention that your project uses. Filenames extension must be `.js`.

### 2.2 File encoding: UTF-8

Source files are encoded in **UTF-8**.

### 2.3 Special characters

#### 2.3.1 Whitespace characters

Aside from the line terminator sequence, the **ASCII horizontal space character** (**0x20**) is the only whitespace character that appears anywhere in a source file. This implies that:

1. All other whitespace characters in string and character literals are escaped.
2. Tab characters are **not** used for indentation.

#### 2.3.2 Special escape sequences

For any character that has a special escape sequence (`\b`, `\t`, `\n`, `\f`, `\r`, `\"`, `\'` and `\\`), that sequence is used rather than the corresponding octal or Unicode escape.

* :heavy_check_mark: **GOOD**

  ```javascript
  var a = "\n";
  ```

* :no_entry: **BAD**

  ```javascript
  var a = "\012";
  var a = "\u000a";
  ```

#### 2.3.3 Non-ASCII characters

For the remaining non-ASCII characters, either the actual Unicode character (e.g. `∞`) or the equivalent hex or Unicode escape (e.g. `\u221e`) is used, depending only on which makes the code **easier to read and understand**.

> Tip: In the Unicode escape case, and occasionally even when actual Unicode characters are used, an explanatory comment can be very helpful.

Example|Discussion
---|---
`const units = 'μs';`|:heavy_check_mark: Best: perfectly clear even without a comment.
`const units = '\u03bcs'; // 'μs'`|:warning: Allowed, but there's no reason to do this.
`const units = '\u03bcs'; // Greek letter mu, 's'`|:warning: Allowed, but awkward and prone to mistakes.
`const units = '\u03bcs';`|:warning: Poor: the reader has no idea what this is.
`return '\ufeff' + content; // byte order mark`|:heavy_check_mark: Good: use escapes for non-printable characters, and comment if necessary.

> Tip: Never make your code less readable simply out of fear that some programs might not handle non-ASCII characters properly. If that happens, those programs are **broken** and they must be **fixed**.

## 3 Source file structure

A source file consists of, **in order**:

1. License or copyright information, if present
2. ES `import` statements, if an ES module
3. `require` statements
4. The file’s implementation
5. `export` statements

**Exactly one blank line** separates each section that is present, except the file's implementation, which may be preceded by 1 or 2 blank lines.

IDE-generated header with information about the author **must be removed**.

### 3.1 License or copyright information, if present

If license or copyright information belongs in a file, it belongs here.

### 3.2 ES `import` statements, if an ES module

Imported names appear in ASCII sort order.

### 3.3 `require` statements

Imported names appear in ASCII sort order.

All imports must be used. **Unused imports must be deleted**.

## 4 Formatting

> **Terminology Note:** _block-like construct_ refers to the body of a class, method or constructor. Note that any [array initializer](#421-array-initializers) _can_ optionally be treated as a block-like construct.

### 4.1 Braces

#### 4.1.1 Braces are used for all control structures

Braces are used with `if`, `else`, `for`, `do` and `while` statements, even when the body is empty or contains only a single statement.

The first statement of a non-empty block must begin on its own line.

* :no_entry: **BAD**

```javascript
if (someVeryLongCondition())
    doSomething();
    
for (let i = 0; i < foo.length; i++) bar(foo[i]);
```

**Exception**: a simple `if` statement that can fit entirely on a single line with no wrapping (and that does not have an `else`) may be kept on a single line with no braces when it improves readability. This is the only case in which a control structure may omit braces and newlines.

* :heavy_check_mark: **GOOD**

```javascript
if (shortCondition()) return;
```

#### 4.1.2 Nonempty blocks: K&R style

Braces follow the Kernighan and Ritchie style ("[Egyptian brackets](http://www.codinghorror.com/blog/2012/07/new-programming-jargon.html)") for _nonempty_ blocks and block-like constructs:

* No line break before the opening brace.
* Line break after the opening brace.
* Line break before the closing brace.
* Line break after the closing brace, _only if_ that brace terminates a statement or terminates the body of a method, constructor, or _named_ class. For example, there is _no_ line break after the brace if it is followed by `else` or a comma.

* :heavy_check_mark: **GOOD**

```javascript
class InnerClass {
    constructor() {}
    
    /** @param {number} foo */
    method(foo) {
        if (condition(foo)) {
            try {
                // Note: this might fail.
                something();
            } catch (err) {
                recover();
            }
        }
    }
}
```

#### 4.1.3 Empty blocks: may be concise

An empty block or block-like construct _may_ be closed immediately after it is opened, with no characters, space, or line break in between (i.e. `{}`),
**unless** it is a part of a _multi-block statement_ (one that directly contains multiple blocks: `if`/`else` or `try`/`catch`/`finally`).

* :heavy_check_mark: **GOOD**

```javascript
function doNothing() {}
```

* :no_entry: **BAD**

```javascript
if (condition) {
    // …
} else if (otherCondition) {} else {
    // …
}
    
try {
    // …
} catch (e) {}
```

### 4.2 Block indentation: +4 spaces

Each time a new block or block-like construct is opened, the indent increases by **four** spaces. When the block ends, the indent returns to the previous indent level.
The indent level applies to both code and comments throughout the block.

* :heavy_check_mark: **GOOD**

```javascript
if (name != null) {
    // Perform check, if name is initialized.
    Registry.Metric.checkExists(name);
}
```

#### 4.2.1 Array literals: optionally block-like

Any array literal may optionally be formatted as if it were a "block-like construct" to reduce horizontal size.

* :heavy_check_mark: **GOOD**

    ```javascript
    const a = [
        0,
        1,
        2,
    ];
    
    const b =
        [0, 1, 2];

    const c = [0, 1, 2];
    
    someMethod(foo, [
         0, 1, 2,
    ], bar);
    ```

Other combinations are allowed, particularly when emphasizing semantic groupings between elements.

#### 4.2.2 Object literals: optionally block-like

Any object literal may optionally be formatted as if it were a "block-like construct" to reduce horizontal size.

* :heavy_check_mark: **GOOD**

    ```javascript
    const a = {
        a: 0,
        b: 1,
    };
    
    const b =
        {a: 0, b: 1};
  
    const c = {a: 0, b: 1};
    
    someMethod(foo, {
        a: 0, b: 1,
    }, bar);
    ```

#### 4.2.3 Class literals

Class literals (whether declarations or expressions) are indented as blocks.

Do not add semicolons after methods, or after the closing brace of a class _declaration_ (statements—such as assignments—that contain class _expressions_ are still terminated with a semicolon).

* :heavy_check_mark: **GOOD**

    ```javascript
    class Foo {
       constructor() {
           /** @type {number} */
           this.x = 42;
      }
    
         /** @return {number} */
         method() {
           return this.x;
         }
    }
    Foo.Empty = class {};
    ```
    

#### 4.2.4 Function expressions

When declaring an anonymous function in the list of arguments for a function call, the body of the function is indented **4** spaces more than the preceding indentation depth.

* :heavy_check_mark: **GOOD**

    ```javascript
    prefix.something.reallyLongFunctionName('whatever', (a1, a2) => {
        // Indent the function body +4 relative to indentation depth
        // of the 'prefix' statement one line above.
        if (a1.equals(a2)) {
            someOtherLongFunctionName(a1);
        } else {
            andNowForSomethingCompletelyDifferent(a2.parrot);
        }
    });
    
    some.reallyLongFunctionCall(arg1, arg2, arg3)
        .thatsWrapped()
        .then((result) => {
            // Indent the function body +4 relative to the indentation depth
            // of the '.then()' call.
            if (result) {
                result.use();
            }
        });
    ```

#### 4.2.5 Switch statements

As with any other block, the contents of a switch block are indented **+4**.

After a switch label, a newline appears, and the indentation level is increased **+4**, exactly as if a block were being opened. An explicit block may be used if required by lexical scoping.

A blank line is optional between a `break` and the following case.

* :heavy_check_mark: **GOOD**

    ```javascript
    switch (animal) {
        case Animal.BANDERSNATCH:
            handleBandersnatch();
            break;
    
        case Animal.JABBERWOCK:
            handleJabberwock();
            break;
    
        default:
            throw new Error("Unknown animal");
    }
    
    switch (animal) {
        case Animal.BANDERSNATCH: {
            handleBandersnatch();
            break;
        }
        case Animal.JABBERWOCK: {
            handleJabberwock();
            break;
        }
        default:
            throw new Error("Unknown animal");
    }
    ```

### 4.3 Statements

#### 4.3.1 One statement per line

Each statement is followed by a line break.

* :heavy_check_mark: **GOOD**

```javascript
let a = 1;
let b = 2;
```

* :no_entry: **BAD**

```javascript
let a = 1, b = 2;
```

#### 4.3.2 Semicolons are required

Every statement must be terminated with a semicolon.

### 4.4 Column limit: 120

JavaScript code has a column limit of 120 characters. Except as noted below, any line that is exceed this limit must be [line-wrapped](#45-line-wrapping).

**Exception:** lines where obeying the column limit is not possible (for example, a long URL in JSDoc or a shell command intended to be copied-and-pasted).

### 4.5 Line-wrapping

**Terminology Note**: _line-wrapping_ is defined as breaking a single expression into multiple lines.

There is no comprehensive, deterministic formula showing _exactly_ how to line-wrap in every situation. Very often there are several valid ways to line-wrap the same piece of code.

> **Note:** While the typical reason for line-wrapping is to avoid overflowing the column limit, even code that is in fact fit within the column limit _can_ be line-wrapped at the author's discretion.

> **Tip:** Extracting a method or local variable can solve the problem without the need to line-wrap.

#### 4.5.1 Where to break

The prime directive of line-wrapping is: prefer to break at a **higher syntactic level**.

* :heavy_check_mark: **PREFERRED**

```javascript
currentEstimate =
    calc(currentEstimate + x * currentEstimate) /
    2.0f;
```

* :no_entry: **DISCOURAGED**

```javascript
currentEstimate = calc(currentEstimate + x *
    currentEstimate) / 2.0f;
```

In the preceding example, the syntactic levels from highest to lowest are as follows: assignment, division, function call, parameters, number constant.

Operators are wrapped as follows:

1.  When a line is broken at an operator the break comes after the symbol. **Note** that this is not the same practice used in style for Java.
    * This does not apply to the dot `.`, which is not actually an operator.
2.  A method or constructor name stays attached to the open parenthesis `(` that follows it.
3.  A comma `,` stays attached to the token that precedes it.

* :heavy_check_mark: **GOOD**

```javascript
d3.select(this)
    .attr("class", this.__initialClasses__)
    .attr("style", this.__initialStyles__);
  
const formattedCode = generate(parsedCode, {
    comment: true,
    format: {
        indent,
        newline,
        semicolons
    }
});
```

> Note: The primary goal for line wrapping is to have clear code, not necessarily code that fits in the smallest number of lines.

#### 4.5.2 Indent continuation lines at least +4 spaces

When line-wrapping, each line after the first (each _continuation line_) is indented at least **+8** from the original line.

When there are multiple continuation lines, indentation can be varied beyond **+8**. In general, two continuation lines use the same indentation level if and only if they begin with syntactically parallel elements.

[Horizontal alignment](#463-horizontal-alignment-discouraged) addresses the discouraged practice of using a variable number of spaces to align certain tokens with previous lines.

### 4.6 Whitespace

#### 4.6.1 Vertical whitespace

A single blank line appears:

1.  _Between_ consecutive methods in a class or object literal
    * **Exception**: a blank line between two consecutive properties definitions in an object literal (with no other code between them) is optional. Such blank lines are used as needed to create _logical groupings_ of fields.
2.  Within method bodies, sparingly to create _logical groupings_ of statements. Blank lines at the start or end of a function body are not allowed.
3.  _Optionally_ before the first or after the last method in a class or object literal (neither encouraged nor discouraged).
4.  As required by other sections of this document (such as [3 Source file structure](#3-source-file-structure)).

_Multiple_ consecutive blank lines are permitted, but never required (nor encouraged).

#### 4.6.2 Horizontal whitespace

Use of horizontal whitespace depends on location, and falls into three broad categories:

* _leading_ - at the start of a line, i.e. indentation, is addressed elsewhere
* _trailing_ - at the end of a line, is **forbidden**
* _internal_

Beyond where required by the language or other style rules, and apart from literals, comments, and JSDoc, a single internal ASCII space also appears in the following places **only**:

1.  Separating any reserved word (such as `if`, `for`, or `catch`) from an open parenthesis `(` that follows it on that line.
2.  Separating any reserved word (such as `else` or `catch`) from a closing curly brace `}` that precedes it on that line.
3.  Before any open curly brace `{`, with two exceptions:
    * `foo({a: [{c: d}]})` - before an object literal that is the first argument of a function or the first element in an array literal.
    * `abc${1 + 2}def` - in a template expansion, as it is forbidden by the language.
4.  On both sides of any binary or ternary operator.
5.  After a comma `,` or semicolon `;`. Note that spaces are _never_ allowed before these characters.
6.  After the colon `:` in an object literal.
7.  On both sides of the double slash `//` that begins an end-of-line comment. Here, multiple spaces are allowed, but not required.
8.  After an open-JSDoc comment character and on both sides of close characters (e.g. for short-form type declarations or casts: `this.foo = /** @type {number} */ (bar);` or `function(/** string */ foo) {`).

#### 4.6.3 Horizontal alignment: discouraged

**Terminology Note**: _horizontal alignment_ is the practice of adding a variable number of additional spaces in your code with the goal of making certain tokens appear directly below certain other tokens on previous lines.

It is not even required to _maintain_ horizontal alignment in places where it was already used.

Here is an example without alignment, then using alignment:

```javascript
{
    tiny: 42, // this is great
    longer: 435, // this too
};
    
{
    tiny:   42,  // permitted, but future edits
    longer: 435, // may leave it unaligned
};
```

**Tip**: alignment can aid readability, but it creates problems for future maintenance. Consider a future change that needs to touch just one line. This change may leave the formerly-pleasing formatting mangled, and that is **allowed**. More often it prompts the coder (perhaps you) to adjust whitespace on nearby lines as well, possibly triggering a cascading series of reformattings. That one-line change now has a blast radius. This can at worst result in pointless busywork, but at best it still corrupts version history information, slows down reviewers and exacerbates merge conflicts.

#### 4.6.4 Function arguments

Prefer to put all function arguments on the same line as the function name. If doing so would exceed the [120-column limit](#44-column-limit-120), the arguments must be line-wrapped in a readable way. To save space, you may wrap as close to 120 as possible, or put each argument on its own line to enhance readability. Indentation should be **four** spaces. Aligning to the parenthesis is allowed, but discouraged.

Below are the most common patterns for argument wrapping:

```javascript
// Arguments start on a new line, indented four spaces. Preferred when the
// arguments don't fit on the same line with the function name (or the keyword
// "function") but fit entirely on the second line. Works with very long
// function names, survives renaming without reindenting, low on space.
doSomething(
    descriptiveArgumentOne, descriptiveArgumentTwo, descriptiveArgumentThree) {
    // …
}
    
// If the argument list is longer, wrap at 120. Uses less vertical space,
// but violates the rectangle rule and is thus not recommended.
doSomething(veryDescriptiveArgumentNumberOne, veryDescriptiveArgumentTwo,
    tableModelEventHandlerProxy, artichokeDescriptorAdapterIterator) {
    // …
}
    
// Four-space, one argument per line.  Works with long function names,
// survives renaming, and emphasizes each argument.
doSomething(
    veryDescriptiveArgumentNumberOne,
    veryDescriptiveArgumentTwo,
    tableModelEventHandlerProxy,
    artichokeDescriptorAdapterIterator) {
    // …
}
```

### 4.7 Grouping parentheses: recommended

Optional grouping parentheses are omitted only when the author and reviewer agree that there is no reasonable chance that the code will be misinterpreted without them, nor would they have made the code easier to read. It is _not_ reasonable to assume that every reader has the entire operator precedence table memorized.

Do not use unnecessary parentheses around the entire expression following `delete`, `typeof`, `void`, `return`, `throw`, `case`, `in`, `of`, or `yield`.

Parentheses are required for type casts: `/** @type {!Foo} */ (foo)`.

### 4.8 Comments

This section addresses _implementation comments_. JSDoc is addressed separately in [??](#jsdoc).

#### 4.8.1 Block comment style

Block comments are indented at the same level as the surrounding code. They may be in `/* … */` or `//`\-style. For multi-line `/* … */` comments, subsequent lines must start with `\*` aligned with the `*` on the previous line, to make comments obvious with no extra context.

"Parameter name" comments should appear after values whenever the value and method name do not sufficiently convey the meaning.

* :heavy_check_mark: **GOOD**

```javascript
/*
 * This is
 * okay.
 */
    
// And so
// is this.
    
/* This is fine, too. */
    
someFunction(obviousParam, true /* shouldRender */, 'hello' /* name */);
```

Comments are not enclosed in boxes drawn with asterisks or other characters.

Do not use JSDoc (`/** … */`) for any of the above implementation comments.

## 5 Language features

JavaScript includes many dubious (and even dangerous) features. This section delineates which features may or may not be used, and any additional constraints on their use.

### 5.1 Local variable declarations

#### 5.1.1 Use `const` and `let`

Declare all local variables with either `const` or `let`. Use const by default, unless a variable needs to be reassigned. The `var` keyword must not be used.

#### 5.1.2 One variable per declaration

Every local variable declaration declares only one variable: declarations such as `let a = 1, b = 2;` are **not** used.

#### 5.1.3 Declared when needed, initialized as soon as possible

Local variables are **not** habitually declared at the start of their containing block or block-like construct. Instead, local variables are declared close to the point they are first used (within reason), to minimize their scope.

#### 5.1.4 Declare types as needed

JSDoc type annotations may be added on the line above the declaration.

* :heavy_check_mark: **GOOD**

```javascript    
/** @type {!Array<number>} */
const data = [];
```

### 5.2 Array literals

#### 5.2.1 No trailing commas

* :no_entry: **BAD**

 ```javascript
const values = [
    "first value",
    "second value",
];
``` 

#### 5.2.2 Do not use the variadic `Array` constructor

The constructor is error-prone if arguments are added or removed. Use a literal instead.

* :no_entry: **BAD**

```javascript
const a1 = new Array(x1, x2, x3);
const a2 = new Array(x1, x2);
const a3 = new Array(x1);
const a4 = new Array();
```

This works as expected except for the third case:
if `x1` is a whole number then `a3` is an array of size `x1` where all elements are `undefined`.
If `x1` is any other number, then an exception will be thrown, and if it is anything else then it will be a single-element array.

* :heavy_check_mark: **GOOD**

```javascript
const a1 = [x1, x2, x3];
const a2 = [x1, x2];
const a3 = [x1];
const a4 = [];
```

#### 5.2.3 Non-numeric properties

Do not define or use non-numeric properties on an array (other than `length`). Use a `Map` (or `Object`) instead.

* :no_entry: **BAD**

```javascript
const res = [parsed.type, parsed.typeIndex, parsed.level];
res.isParsedType = true;
res.toString = toStringSeriesKey;
```

#### 5.2.4 Destructuring

Array literals may be used on the left-hand side of an assignment to perform destructuring (such as when unpacking multiple values from a single array or iterable).
A final rest element may be included (with no space between the `...` and the variable name). Elements should be omitted if they are unused.

* :heavy_check_mark: **GOOD**

```javascript
const [a, b, c, ...rest] = generateResults();
let [, b,, d] = someArray;
```

Destructuring may also be used for function parameters (note that a parameter name is required but ignored). Always specify `[]` as the default value if a destructured array parameter is optional, and provide default values on the left hand side:

* :heavy_check_mark: **GOOD**

    ```javascript
    /** @param {!Array<number>=} param1 */
    function optionalDestructuring([a = 4, b = 2] = []) { … };
    ```

* :no_entry: **BAD**

    ```javascript
    function badDestructuring([a, b] = [4, 2]) { … };
    ```

> **Tip**: for (un)packing multiple values into a function’s parameter or return, prefer object destructuring to array destructuring when possible, as it allows naming the individual elements and specifying a different type for each.

#### 5.2.5 Spread operator

Array literals may include the spread operator `...` to flatten elements out of one or more other iterables. The spread operator should be used instead of more awkward constructs with `Array.prototype`. There is no space after the `...`.

* :heavy_check_mark: **GOOD**

```javascript
[...foo]   // preferred over Array.prototype.slice.call(foo)
[...foo, ...bar]   // preferred over foo.concat(bar)
```

### 5.3 Object literals

#### 5.3.1 No trailing commas

Do not include a trailing comma whenever there is a line break between the final property and the closing brace.

#### 5.3.2 Do not use the `Object` constructor

While `Object` does not have the same problems as `Array`, it is still disallowed for consistency.

Use an object literal instead: `{}` or `{a: 0, b: 1, c: 2}`.

#### 5.3.3 Do not mix quoted and unquoted keys

Object literals may represent either _structs_ (with unquoted keys and/or symbols) or _dicts_ (with quoted and/or computed keys). Do not mix these key types in a single object literal.

* :no_entry: **BAD**

```javascript
{
    a: 42, // struct-style unquoted key
    "b": 43, // dict-style quoted key
}
```

#### 5.3.4 Computed property names

Computed property names (e.g., `{['key' + foo()]: 42}`) are allowed, and are considered dict-style (quoted) keys (i.e. must not be mixed with non-quoted keys) unless the computed property is a symbol (e.g., `[Symbol.iterator]`). Enum values may also be used for computed keys, but should not be mixed with non-enum keys in the same literal.

#### 5.3.5 Method shorthand

Methods can be defined on object literals using the method shorthand `{method() {… }}` in place of a colon immediately followed by a `function` or arrow function literal.

* :heavy_check_mark: **GOOD**

```javascript
return {
    stuff: "candy",
    method() {
        return this.stuff;  // Returns 'candy'
    },
};
```

Note that `this` in a method shorthand or `function` refers to the object literal itself whereas `this` in an arrow function refers to the scope outside the object literal.

* :heavy_check_mark: **GOOD**

```javascript
class {
    getObjectLiteral() {
        this.stuff = "fruit";
        return {
            stuff: "candy",
            method: () => this.stuff,  // Returns "fruit"
        };
    }
}
```

#### 5.3.6 Shorthand properties

Shorthand properties are allowed on object literals.

* :heavy_check_mark: **GOOD**

```javascript
const foo = 1;
const bar = 2;
const obj = {
    foo,
    bar,
    method() { return this.foo + this.bar; },
};
assertEquals(3, obj.method());
```

#### 5.3.7 Destructuring

Object destructuring patterns may be used on the left-hand side of an assignment to perform destructuring and unpack multiple values from a single object.

Destructured objects may also be used as function parameters, but should be kept as simple as possible: a single level of unquoted shorthand properties.

Deeper levels of nesting and computed properties may not be used in parameter destructuring.
Specify any default values in the left-hand-side of the destructured parameter (`{str = 'some default'} = {}`, rather than `{str} = {str: 'some default'}`), and if a destructured object is itself optional, it must default to `{}`.

* :heavy_check_mark: **GOOD**

```javascript
/**
 * @param {string} ordinary
 * @param {{num: (number|undefined), str: (string|undefined)}=} param1
 *     num: The number of times to do something.
 *     str: A string to do stuff to.
 */
function destructured(ordinary, {num, str = "some default"} = {})
```

* :no_entry: **BAD**

```javascript
/** @param {{x: {num: (number|undefined), str: (string|undefined)}}} param1 */
function nestedTooDeeply({x: {num, str}}) {};
/** @param {{num: (number|undefined), str: (string|undefined)}=} param1 */
function nonShorthandProperty({num: a, str: b} = {}) {};
/** @param {{a: number, b: number}} param1 */
function computedKey({a, b, [a + b]: c}) {};
/** @param {{a: number, b: string}=} param1 */
function nontrivialDefault({a, b} = {a: 2, b: 4}) {};
```

#### 5.3.8 Enums

Enumerations are defined by adding the `@enum` annotation to an object literal. Additional properties may not be added to an enum after it is defined. Enums must be constant, and all enum values must be deeply immutable.

* :heavy_check_mark: **GOOD**

```javascript
/**
 * Supported temperature scales.
 * @enum {string}
 */
const TemperatureScale = {
    CELSIUS: "celsius",
    FAHRENHEIT: "fahrenheit",
};
    
/**
 * An enum with two options.
 * @enum {number}
 */
const Option = {
    /** The option used shall have been the first. */
    FIRST_OPTION: 1,
    /** The second among two options. */
    SECOND_OPTION: 2,
};
```

### 5.4 Classes

#### 5.4.1 Constructors

Constructors are optional for concrete classes. Subclass constructors must call `super()` before setting any fields or otherwise accessing `this`. Interfaces must not define a constructor.

#### 5.4.2 Fields

Set all of a concrete object's fields (i.e. all properties other than methods) in the constructor. Optionally annotate fields that are never reassigned with `@const` (these need not be deeply immutable).

Private fields must be annotated with `@private` and their names must start with a underscore. Fields are never set on a concrete class' `prototype`.

* :heavy_check_mark: **GOOD**

```javascript
class Foo {
    constructor() {
        /** @private @const {!Bar} */
        this._bar = computeBar();
    }
}
```

>**Tip**: Properties should never be added to or removed from an instance after the constructor is finished, since it significantly hinders VMs' ability to optimize. If necessary, fields that are initialized later should be explicitly set to `undefined` in the constructor to prevent later shape changes.

#### 5.4.3 Computed properties

Computed properties may only be used in classes when the property is a symbol. Dict-style properties (that is, quoted or computed non-symbol keys, as defined in [5.3.3 Do not mix quoted and unquoted keys](#533-do-not-mix-quoted-and-unquoted-keys)) are not allowed.

A `[Symbol.iterator]` method should be defined for any classes that are logically iterable. Beyond this, `Symbol` should be used sparingly.

>**Tip**: be careful of using any other built-in symbols (e.g., `Symbol.isConcatSpreadable`) as they are not polyfilled by the compiler and will therefore not work in older browsers.

#### 5.4.4 Static methods

Where it does not interfere with readability, prefer module-local functions over private static methods.

Static methods should only be called on the base class itself.
Static methods should not be called on variables containing a dynamic instance that may be either the constructor or a subclass constructor, and must not be called directly on a subclass that does not define the method itself.

* :no_entry: **BAD**

```javascript
class Base { static foo() {} }
class Sub extends Base {}
function callFoo(cls) { cls.foo(); }  // discouraged: don't call static methods dynamically
Sub.foo();  // illegal: don't call static methods on subclasses that don't define it themselves
```

#### 5.4.5 Do not manipulate `prototype`s directly

The `class` keyword allows clearer and more readable class definitions than defining `prototype` properties.

Mixin and modifying the prototypes of builtin objects are explicitly forbidden.

**Exception**: framework code (such as Polymer, or Angular) may need to use `prototype`s, and should not resort to even-worse workarounds to avoid doing so.

**Exception**: defining fields in interfaces, see [5.4.8 Interfaces](#548-interfaces).

#### 5.4.6 Getters and Setters

Do not use [JavaScript getter and setter properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get). They are potentially surprising and difficult to reason about, and have limited support in the compiler. Provide ordinary methods instead.

**Exception**: when working with data binding frameworks (such as Angular and Polymer), getters and setters may be used sparingly. Note, however, that compiler support is limited. When they are used, they must be defined either with `get foo()` and `set foo(value)` in the class or object literal, or if that is not possible, with `Object.defineProperties`. Do not use `Object.defineProperty`, which interferes with property renaming. Getters **must not** change observable state.

* :no_entry: **BAD**

```javascript
class Foo {
    get next() { return this.nextId++; }
}
```

#### 5.4.7 Overriding `toString`

The `toString` method may be overridden, but must always succeed and never have visible side effects.

>**Tip**: beware, in particular, of calling other methods from `toString`, since exceptional conditions could lead to infinite loops.

#### 5.4.8 Interfaces

All non-static method bodies on an interface must be empty blocks. Fields must be defined after the interface body as stubs on the `prototype`.

* :no_entry: **BAD**

```javascript
/**
 * Something that can frobnicate.
 */
class Frobnicator {
    /**
     * Performs the frobnication according to the given strategy.
     * @param {!FrobnicationStrategy} strategy
     */
    frobnicate(strategy) {}
}
    
/** @type {number} The number of attempts before giving up. */
Frobnicator.prototype.attempts;
```

### 5.5 Functions

#### 5.5.1 Top-level functions

Exported functions may be defined directly on the `exports` object, or else declared locally and exported separately.

* :heavy_check_mark: **GOOD**

```javascript
/** @return {number} */
function helperFunction() {
    return 42;
}
/** @return {number} */
function exportedFunction() {
    return helperFunction() * 2;
}
/**
 * @param {string} arg
 * @return {number}
 */
function anotherExportedFunction(arg) {
     return helperFunction() / arg.length;
}
exports = {exportedFunction, anotherExportedFunction};
    

/** @param {string} arg */
exports.foo = (arg) => {
    // do some stuff ...
};
```

#### 5.5.2 Nested functions and closures

Functions may contain nested function definitions. If it is useful to give the function a name, it should be assigned to a local `const`.

#### 5.5.3 Arrow functions

Arrow functions provide a concise syntax and fix a number of difficulties with `this`. Prefer arrow functions over the `function` keyword, particularly for nested functions, but see [5.3.6 Shorthand properties](#536-shorthand-properties).

Prefer using arrow functions over `f.bind(this)`. Avoid writing `const self = this`. Arrow functions are particularly useful for callbacks, which sometimes pass unexpected additional arguments.

The right-hand side of the arrow may be a single expression or a block. Parentheses around the arguments are optional if there is only a single non-destructured argument.

>**Tip**: it is a good practice to use parentheses even for single-argument arrows, since the code may still parse reasonably (but incorrectly) if the parentheses are forgotten when an additional argument is added.

#### 5.5.4 Generators

Generators enable a number of useful abstractions and may be used as needed.

When defining generator functions, attach the `*` to the `function` keyword when present, and separate it with a space from the name of the function. When using delegating yields, attach the `*` to the `yield` keyword.

* :heavy_check_mark: **GOOD**

```javascript
/** @return {!Iterator<number>} */
function* gen1() {
    yield 42;
}
    
/** @return {!Iterator<number>} */
const gen2 = function*() {
    yield* gen1();
}
    
class SomeClass {
/** @return {!Iterator<number>} */
    * gen() {
        yield 42;
    }
}
```

#### 5.5.5 Parameters

Function parameters must be typed with JSDoc annotations in the JSDoc preceding the function's definition, except in the case of same-signature `@override`s, where all types are omitted.

##### 5.5.5.1 Default parameters

Optional parameters are permitted using the equals operator in the parameter list. Optional parameters must include spaces on both sides of the equals operator, be named exactly like required parameters (i.e. not prefixed with `opt_`), use the `=` suffix in their JSDoc type, come after required parameters, and not use initializers that produce observable side effects. All optional parameters must have a default value in the function declaration, even if that value is `undefined`.

* :heavy_check_mark: **GOOD**

```javascript
/**
 * @param {string} required This parameter is always needed.
 * @param {string=} optional This parameter can be omitted.
 * @param {!Node=} node Another optional parameter.
 */
function maybeDoSomething(required, optional = '', node = undefined) {}
```

Use default parameters sparingly. Prefer destructuring (as in [5.3.7 Destructuring](#537-destructuring)) to create readable APIs when there are more than a small handful of optional parameters that do not have a natural order.

> **Note**: unlike Python's default parameters, it is okay to use initializers that return new mutable objects (such as `{}` or `[]`) because the initializer is evaluated each time the default value is used, so a single object will not be shared across invocations.

> **Tip**: while arbitrary expressions including function calls may be used as initializers, these should be kept as simple as possible. Avoid initializers that expose shared mutable state, as that can easily introduce unintended coupling between function calls.

##### 5.5.5.2 Rest parameters

Use a _rest_ parameter instead of accessing `arguments`. Rest parameters are typed with a `...` prefix in their JSDoc. The rest parameter must be the last parameter in the list. There is no space between the `...` and the parameter name. Do not name the rest parameter `var_args`. Never name a local variable or parameter `arguments`, which confusingly shadows the built-in name.

* :heavy_check_mark: **GOOD**

```javascript
/**
 * @param {!Array<string>} array This is an ordinary parameter.
 * @param {...number} numbers The remainder of arguments are all numbers.
 */
function variadic(array, ...numbers) {}
```

#### 5.5.6 Returns

Function return types must be specified in the JSDoc directly above the function definition, except in the case of same-signature `@override`s where all types are omitted.

#### 5.5.7 Spread operator

Function calls may use the spread operator `...`. Prefer the spread operator to `Function.prototype.apply` when an array or iterable is unpacked into multiple parameters of a variadic function. There is no space after the `...`.

* :heavy_check_mark: **GOOD**

```javascript
function myFunction(...elements) {}
myFunction(...array, ...iterable, ...generator());
```

### 5.6 String literals

#### 5.6.1 Use double quotes

Ordinary string literals are delimited with double quotes `"`.

> **Tip**: if a string contains a double quote character, consider using a template string to avoid having to escape the quote.

Ordinary string literals may not span multiple lines.

#### 5.6.2 Template strings

Use template strings (delimited with `` ` ``) over complex string concatenation, particularly if multiple string literals are involved. Template strings may span multiple lines.

If a template string spans multiple lines, it does not need to follow the indentation of the enclosing block, though it may if the added whitespace does not matter.

* :heavy_check_mark: **GOOD**

```javascript
function arithmetic(a, b) {
    return `Here is a table of arithmetic operations:
${a} + ${b} = ${a + b}
${a} - ${b} = ${a - b}
${a} * ${b} = ${a * b}
${a} / ${b} = ${a / b}`;
}
```

#### 5.6.3 No line continuations

Do not use _line continuations_ (that is, ending a line inside a string literal with a backslash) in either ordinary or template string literals.

Even though ES5 allows this, it can lead to tricky errors if any trailing whitespace comes after the slash, and is less obvious to readers.

* :no_entry: **BAD**

```javascript
const longString = "This is a very long string that far exceeds the 80 \
    column limit. It unfortunately contains long stretches of spaces due \
    to how the continued lines are indented.';
```

* :heavy_check_mark: **GOOD**

```javascript
const longString = "This is a very long string that far exceeds the 80 " +
    "column limit. It does not contain long stretches of spaces since " +
    "the concatenated strings are cleaner.";
```

### 5.7 Number literals

Numbers may be specified in decimal, hex, octal, or binary. Use exactly `0x`, `0o`, and `0b` prefixes, with lowercase letters, for hex, octal, and binary, respectively. Never include a leading zero unless it is immediately followed by `x`, `o`, or `b`.

### 5.8 Control structures

#### 5.8.1 For loops

With ES6, the language now has three different kinds of `for` loops. All may be used, though `for`\-`of` loops should be preferred when possible.

`for`\-`in` loops may only be used on dict-style objects (see [5.3.3 Do not mix quoted and unquoted keys](#533-do-not-mix-quoted-and-unquoted-keys)), and should not be used to iterate over an array.

`Object.prototype.hasOwnProperty` should be used in `for`\-`in` loops to exclude unwanted prototype properties.

Prefer `for`\-`of` and `Object.keys` over `for`\-`in` when possible.

#### 5.8.2 Exceptions

Exceptions are an important part of the language and should be used whenever exceptional cases occur. Always throw `Error`s or subclasses of `Error`: never throw string literals or other objects. Always use `new` when constructing an `Error`.

Custom exceptions provide a great way to convey additional error information from functions. They should be defined and used wherever the native `Error` type is insufficient.

Prefer throwing exceptions over ad-hoc error-handling approaches (such as passing an error container reference type, or returning an object with an error property).

##### 5.8.2.1 Empty catch blocks

It is very rarely correct to do nothing in response to a caught exception. When it truly is appropriate to take no action whatsoever in a catch block, the reason this is justified is explained in a comment.

* :heavy_check_mark: **GOOD**

    ```javascript
    try {
        return handleNumericResponse(response);
    } catch (ok) {
        // it's not numeric; that's fine, just continue
    }
    return handleTextResponse(response);
    ```

* :no_entry: **BAD**

    ```javascript
    try {
        shouldFail();
        fail("expected an error");
    } catch (expected) {}
    ```

> **Tip**: unlike in some other languages, patterns like the above simply don not work since this will catch the error thrown by `fail`. Use `assertThrows()` instead.

#### 5.8.3 Switch statements

Terminology Note: Inside the braces of a switch block are one or more statement groups. Each statement group consists of one or more switch labels (either `case FOO:` or `default:`), followed by one or more statements.

##### 5.8.3.1 Fall-through: commented

Within a switch block, each statement group either terminates abruptly (with a `break`, `return` or `throw`n exception),
or is marked with a comment to indicate that execution will or might continue into the next statement group.
Any comment that communicates the idea of fall-through is sufficient (typically `// fall through`). This special comment is not required in the last statement group of the switch block.

* :heavy_check_mark: **GOOD**

    ```javascript
    switch (input) {
        case 1:
        case 2:
            prepareOneOrTwo();
            // fall through
        case 3:
            handleOneTwoOrThree();
        break;
        default:
            handleLargeNumber(input);
    }
    ```

##### 5.8.3.2 The `default` case is present

Each switch statement includes a `default` statement group, even if it contains no code.

### 5.9 this

Only use `this` in class constructors and methods, or in arrow functions defined within class constructors and methods. Any other uses of `this` must have an explicit `@this` declared in the immediately-enclosing function's JSDoc.

Never use `this` to refer to the global object, the context of an `eval`, the target of an event, or unnecessarily `call()`ed or `apply()`ed functions.

### 5.10 Disallowed features

#### 5.10.1 with

Do not use the `with` keyword. It makes your code harder to understand and has been banned in strict mode since ES5.

#### 5.10.2 Dynamic code evaluation

Do not use `eval` or the `Function(...string)` constructor (except for code loaders). These features are potentially dangerous and simply do not work in CSP environments.

#### 5.10.3 Automatic semicolon insertion

Always terminate statements with semicolons (except function and class declarations, as noted above).

#### 5.10.4 Non-standard features

Do not use non-standard features. This includes old features that have been removed (e.g. `WeakMap.clear`), new features that are not yet standardized, or proprietary features that are only implemented in some browsers.
Use only features defined in the current ECMA-262 or WHATWG standards. Non-standard language "extensions" are forbidden.

#### 5.10.5 Wrapper objects for primitive types

Never use `new` on the primitive object wrappers `Boolean`, `Number`, `String`, `Symbol`, nor include them in type annotations.

* :no_entry: **BAD**

```javascript
const x = new Boolean(false);
if (x) alert(typeof x);  // alerts "object" - WAT?
```

#### 5.10.6 Modifying builtin objects

Never modify builtin types, either by adding methods to their constructors or to their prototypes.

Avoid depending on libraries that do this. Note that the JSCompiler's runtime library will provide standards-compliant polyfills where possible; nothing else may modify builtin objects.

Do not add symbols to the global object unless absolutely necessary (e.g. required by a third-party API).

## 6 Naming

### 6.1 Rules common to all identifiers

Identifiers use only ASCII letters and digits, and, in a small number of cases noted below, underscores and very rarely (when required by frameworks like jQuery) dollar signs.

Give as descriptive a name as possible, within reason. Do not worry about saving horizontal space as it is far more important to make your code immediately understandable by a new reader.

Do not use abbreviations that are ambiguous or unfamiliar to readers outside your project, and do not abbreviate by deleting letters within a word.

* :heavy_check_mark: **GOOD**

```javascript
priceCountReader      // No abbreviation.
numErrors             // "num" is a widespread convention.
numDnsConnections     // Most people know what "DNS" stands for.
```

* :no_entry: **BAD**

```javascript
n                     // Meaningless.
nErr                  // Ambiguous abbreviation.
nCompConns            // Ambiguous abbreviation.
wgcConnections        // Only your group knows what this stands for.
pcReader              // Lots of things can be abbreviated "pc".
cstmrId               // Deletes internal letters.
kSecondsPerDay        // Do not use Hungarian notation.
```

### 6.2 Rules by identifier type

#### 6.2.1 Package names

Package name conventions depend on project. Both `my.exampleCode.deepSpace` and `my.example_code.deep_space` are may be legal.

#### 6.2.2 Class names

Class, interface and typedef names are written in `UpperCamelCase`.

Type names are typically nouns or noun phrases. For example, `Request`, `ImmutableList` or `VisibilityMode`. Additionally, interface names may sometimes be adjectives or adjective phrases instead (for example, `Readable`).

#### 6.2.3 Method names

Method names are written in `lowerCamelCase`.

Method names are typically verbs or verb phrases. For example, `sendMessage` or `stop`.

Getter and setter methods for properties are never required, but if they are used they should be named `getFoo` (or optionally `isFoo` or `hasFoo` for booleans), or `setFoo(value)` for setters.

#### 6.2.4 Enum names

Enum names are written in `UpperCamelCase`, similar to classes, and should generally be singular nouns. Individual items within the enum are named in `CONSTANT_CASE`.

#### 6.2.5 Constant names

Constant names use `CONSTANT_CASE`: all uppercase letters, with words separated by underscores. There is no reason for a constant to be named with a trailing underscore, since private static properties can be replaced by (implicitly private) module locals.

##### 6.2.5.1 Definition of "constant"

Every constant is a `@const` static property or a module-local `const` declaration, but not all `@const` static properties and module-local `const`s are constants.

Before choosing constant case, consider whether the field really feels like a _deeply immutable_ constant.

For example, if any of that instance's observable state can change, it is almost certainly not a constant. Merely intending to never mutate the object is generally not enough.

Examples:

```javascript
// Constants
const NUMBER = 5;
/** @const */ exports.NAMES = ImmutableList.of("Ed", "Ann");
/** @enum */ exports.SomeEnum = { ENUM_CONSTANT: "value" };
    
// Not constants
let letVariable = "non-const";
class MyClass { constructor() { /** @const */ this.nonStatic = "non-static"; } };
/** @type {string} */ MyClass.staticButMutable = "not @const, can be reassigned";
const /** Set<String> */ mutableCollection = new Set();
const /** ImmutableSet<SomeMutableType> */ mutableElements = ImmutableSet.of(mutable);
const logger = log.getLogger("loggers.are.not.immutable");
```

Constants' names are typically nouns or noun phrases.

##### 6.2.5.2 Local aliases

Local aliases should be used whenever they improve readability over fully-qualified names.

Aliases may also be used within functions. Aliases must be `const`.

* :heavy_check_mark: **GOOD**

```javascript
const staticHelper = importedNamespace.staticHelper;
const CONSTANT_NAME = ImportedClass.CONSTANT_NAME;
const {assert, assertInstanceof} = asserts;
```

#### 6.2.6 Non-constant field names

Non-constant field names (static or otherwise) are written in `lowerCamelCase`, with a start underscore for private fields.

These names are typically nouns or noun phrases. For example, `computedValues` or `_index`.

#### 6.2.7 Parameter names

Parameter names are written in `lowerCamelCase`. Note that this applies even if the parameter expects a constructor.

One-character parameter names should not be used in public methods.

**Exception**: when required by a third-party framework, parameter names may begin with a `$`. This exception does not apply to any other identifiers (e.g. local variables or properties).

#### 6.2.8 Local variable names

Local variable names are written in `lowerCamelCase`, except for module-local (top-level) constants, as described above. Constants in function scopes are still named in `lowerCamelCase`.

Note that `lowerCamelCase` applies even if the variable holds a constructor.

### 6.3 Camel case: defined

Sometimes there is more than one reasonable way to convert an English phrase into camel case, such as when acronyms or unusual constructs like `IPv6` or iOS are present.

To improve predictability, Google Style specifies the following (nearly) deterministic scheme.

Beginning with the prose form of the name:

1. Convert the phrase to plain ASCII and remove any apostrophes. For example, Müller's algorithm might become Muellers algorithm.
2. Divide this result into words, splitting on spaces and any remaining punctuation (typically hyphens).
    * **Recommended**: if any word already has a conventional camel case appearance in common usage, split this into its constituent parts (e.g AdWords becomes ad words). Note that a word such as iOS is not really in camel case per se; it defies any convention, so this recommendation does not apply.
3. Now lowercase everything (including acronyms), then uppercase only the first character of:
    * ... each word, to yield upper camel case, or
    * ... each word except the first, to yield lower camel case
4. Finally, join all the words into a single identifier.

Note that the casing of the original words is almost entirely disregarded.

Examples:

Prose form|:heavy_check_mark: Correct|:no_entry: Incorrect
---|---|---
XML HTTP request|`XmlHttpRequest`|`XMLHTTPRequest`
new customer ID|`newCustomerId`|`newCustomerID`
inner stopwatch|`innerStopwatch`|`innerStopWatch`
supports IPv6 on iOS|`supportsIpv6OnIos`|`supportsIPv6OnIOS`
YouTube importer|`YouTubeImporter`|`YoutubeImporter`

## 7 JSDoc

Use [JSDoc](https://devdocs.io/jsdoc/) where appropriate.

### 7.1 General form

The basic formatting of JSDoc blocks is as seen in this example:

```javascript
/**
 * Multiple lines of JSDoc text are written here,
 * wrapped normally.
 * @param {number} arg - A number to do something to.
 */
function doSomething(arg) { … }
```

If a single-line comment overflows into multiple lines, it must use the multi-line style with `/**` and `*/` on their own lines.

Many tools extract metadata from JSDoc comments to perform code validation and optimization. As such, these comments **must** be well-formed.

### 7.2 Markdown

JSDoc is written in Markdown, though it may include HTML when necessary.

Note that tools that automatically extract JSDoc (e.g. [JsDossier](https://github.com/jleyba/js-dossier)) will often ignore plain text formatting, so if you did this:

```javascript
/**
 * Computes weight based on three factors:
 *   items sent
 *   items received
 *   last timestamp
 */
```

it would come out like this:

```txt
Computes weight based on three factors: items sent items received last timestamp
```

Instead, write a Markdown list:

```javascript
/**
 * Computes weight based on three factors:
 *  - items sent
 *  - items received
 *  - last timestamp
 */
```

### 7.3 Line wrapping

Line-wrapped block tags are indented four spaces. Wrapped description text may be lined up with the description on previous lines.

```javascript
/**
 * Illustrates line wrapping for long param/return descriptions.
 * @param {string} foo - This is a param with a description too long to fit in
 *     one line.
 * @return {number} - This returns something that has a description too long to
 *                    fit in one line.
 */
exports.method = function(foo) {
    return 5;
};
```

### 7.4 Class comments

Classes and interfaces must be documented with a description and any template parameters, implemented interfaces, visibility or other appropriate tags.

The class description should provide the reader with enough information to know how and when to use the class, as well as any additional considerations necessary to correctly use the class.

Textual descriptions may be omitted on the constructor.

`@constructor` and `@extends` annotations are not used with the `class` keyword unless the class is being used to declare an `@interface` or it extends a generic class.

```javascript
/**
 * A fancier event target that does cool things.
 * @implements {Iterable<string>}
 */
class MyFancyTarget extends EventTarget {
   /**
    * @param {string} arg1 - An argument that makes this more interesting.
    * @param {!Array<number>} arg2 - List of numbers to be processed.
    */
    constructor(arg1, arg2) {
        // ...
    }
};
```

### 7.5 Enum and typedef comments

Enums and typedefs must be documented. Public enums and typedefs must have a non-empty description. Individual enum items may be documented with a JSDoc comment on the preceding line.

```javascript
/**
 * A useful type union, which is reused often.
 * @typedef {!Bandersnatch|!BandersnatchType}
 */
let CoolUnionType;
  
/**
 * Types of bandersnatches.
 * @enum {string}
 */
const BandersnatchType = {
    /** This kind is really frumious. */
    FRUMIOUS: "frumious",
    /** The less-frumious kind. */
    MANXOME: "manxome",
};
```

Typedefs are useful for defining short record types or aliases for unions, complex functions, or generic types.
Typedefs should be avoided for record types with many fields, since they do not allow documenting individual fields, nor using templates or recursive references.

### 7.6 Method and function comments

Parameter and return types must be documented.

The `this` type should be documented when necessary.

Method, parameter and return descriptions (but not types) may be omitted if they are obvious from the rest of the method's JSDoc or from its signature.

Method descriptions should start with a sentence written in the third person declarative voice.

If a method overrides a superclass method, it must include an `@override` annotation.

Overridden methods must include all `@param` and `@return` annotations if any types are refined, but should omit them if the types are all the same.

```javascript
/** This is a class. */
class SomeClass extends SomeBaseClass {
   /**
    * Operates on an instance of MyClass and returns something.
    * @param {!MyClass} obj - An object that for some reason needs detailed
    *     explanation that spans multiple lines.
    * @param {!OtherClass} obviousOtherClass
    * @return {boolean} Whether something occurred.
    */
    someMethod(obj, obviousOtherClass) { ... }
    
    /** @override */
    overriddenMethod(param) { ... }
}
    
/**
 * Demonstrates how top-level functions follow the same rules. This one
 * makes an array.
 * @param {TYPE} arg
 * @return {!Array<TYPE>}
 * @template TYPE
 */
function makeArray(arg) { ... }
```

Anonymous functions do not require JSDoc, though parameter types may be specified inline if the automatic type inference is insufficient.

```javascript
promise.then(
    (/** !Array<number|string> */ items) => {
        doSomethingWith(items);
        return /** @type {string} */ (items[0]);
    });
```

### 7.7 Property comments

Property types must be documented. The description may be omitted for private properties, if name and type provide enough documentation for understanding the code.

Publicly exported constants are commented the same way as properties. Explicit types may be omitted for `@const` properties initialized from an expression with an obviously known type.

>**Tip**: a `@const` property's type can be considered "obviously known" if it is assigned directly from a constructor parameter with a declared type, or directly from a function call with a declared return type. Non-const properties and properties assigned from more complex expressions should have their types declared explicitly.
    
```javascript
/** My class. */
class MyClass {
    /** @param {string=} someString */
    constructor(someString = 'default string') {
        /** @private @const */
        this.someString_ = someString;
    
        /** @private @const {!OtherType} */
        this.someOtherThing_ = functionThatReturnsAThing();
    
        /**
         * Maximum number of things per pane.
         * @type {number}
         */
        this.someProperty = 4;
    }
}
 
/**
 * The number of times we'll try before giving up.
 * @const
 */
 MyClass.RETRY_COUNT = 33;
```

### 7.8 Type annotations

Type annotations are found on `@param`, `@return`, `@this`, and `@type` tags, and optionally on `@const`, `@export`, and any visibility tags. Type annotations attached to JSDoc tags must always be enclosed in braces.

#### 7.8.1 Nullability

The type system defines modifiers `!` and `?` for non-null and nullable, respectively. Primitive types (`undefined`, `string`, `number`, `boolean`, `symbol`, and `function(...): ...`) and record literals (`{foo: string, bar: number}`) are non-null by default.

Do not add an explicit `!` to these types.

Object types (`Array`, `Element`, `MyClass`, etc) are nullable by default, but cannot be immediately distinguished from a name that is `@typedef`'d to a non-null-by-default type.

As such, all types except primitives and record literals must be annotated explicitly with either `?` or `!` to indicate whether they are nullable or not.

### 7.9 Deprecation

Mark deprecated methods, classes or interfaces with `@deprecated` annotations. A deprecation comment must include simple, clear directions for people to fix their call sites.

## 8 Policies

### 8.1 Code not in Axibase JavaScript Style

You will occasionally encounter files in your codebase that are not in proper style. These may have come from an acquisition, or may have been written before style took a position on some issue, or may be in non-style for any other reason.

#### 8.1.1 Reformatting existing code

When updating the style of existing code, follow these guidelines.

1. It is not required to change all existing code to meet current style guidelines. Reformatting existing code is a trade-off between code churn and consistency. Style rules evolve over time and these kinds of tweaks to maintain compliance would create unnecessary churn. However, if significant changes are being made to a file it is expected that the file will be in Axibase JavaScript Style.
2. Be careful not to allow opportunistic style fixes to muddle the focus of an issue. If you find yourself making a lot of style changes that are not critical to the central focus of an issue, promote those changes to a separate issue.

#### 8.1.2 Newly added code: use Axibase JavaScript Style

Brand new files use Axibase JavaScript Style, regardless of the style choices of other files in the same package.

When adding new code to a file that is not in style, reformatting the existing code first is recommended, subject to the advice in [8.1.1 Reformatting existing code](#811-reformatting-existing-code).

If this reformatting is not done, then new code should be as consistent as possible with existing code in the same file, but must not violate the style guide.

### 8.2 Generated code: mostly exempt

Source code generated by the build process is not required to be in Axibase JavaScript Style.

## 9 Appendices

### 9.1 Commonly misunderstood style rules

Here is a collection of lesser-known or commonly misunderstood facts about Google Style for JavaScript. (The following are true statements; this is not a list of myths.)

* Aside from the constructor coming first, there is no hard and fast rule governing how to order the members of a class.
* Empty blocks can usually be represented concisely as `{}`.
* The prime directive of line-wrapping is: prefer to break at a higher syntactic level.
* Non-ASCII characters are allowed in string literals, comments and JSDoc, and in fact are recommended when they make the code easier to read than the equivalent Unicode escape would.

### 9.2 Exceptions for legacy platforms

#### 9.2.1 Overview

This section describes exceptions and additional rules to be followed when modern ECMAScript 6 syntax is not available to the code authors. Exceptions to the recommended style are required when ECMAScript 6 syntax is not possible and are outlined here:

* use of `var` declarations is allowed
* use of `arguments` is allowed
* optional parameters without default values are allowed

#### 9.2.2 Use `var`

##### 9.2.2.1 `var` declarations are NOT block-scoped

`var` declarations are scoped to the beginning of the nearest enclosing function, script or module, which can cause unexpected behavior, especially with function closures that reference `var` declarations inside of loops.

The following code gives an example:

```javascript
for (var i = 0; i < 3; ++i) {
    var iteration = i;
    setTimeout(function() { console.log(iteration); }, i*1000);
}
    
// logs 2, 2, 2 -- NOT 0, 1, 2
// because `iteration` is function-scoped, not local to the loop.
```

##### 9.2.2.2 Declare variables as close as possible to first use

Even though `var` declarations are scoped to the beginning of the enclosing function, `var` declarations should be as close as possible to their first use, for readability purposes.

However, do not put a `var` declaration inside a block if that variable is referenced outside the block. For example:
    
```javascript
function sillyFunction() {
    var count = 0;
    for (var x in y) {
        // "count" could be declared here, but don't do that.
        count++;
    }
    console.log(count + " items in y");
}
```
