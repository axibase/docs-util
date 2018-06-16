# Axibase Documentation Guide

Refer to [Google Developer Documentation Style Guide](https://developers.google.com/style/) (GDG) for in-depth reviews.

## Abbreviations

* Abbreviate if the acronym is known to the target audience.
* Do not backtick acronyms.
* **Always** abbreviate:
  * Widely known terms: SQL, API, REST, JVM, UTF.
    * :white_check_mark: `SQL report`
    * :no_entry: `Structure Query Language (SQL) report`
  * Common data formats: CSV, JSON, XLS, XML, XLS.
  * Protocols: HTTP, HTTPS, TCP, UDP, SSH.
  * Time zones: UTC, EST, GMT.
  * ATSD in Axibase docs repositories.
* If an acronym is new, introduce it in the beginning and re-use thereafter.
  * :white_check_mark: `Hadoop Distributed File System (HDFS) is a clustered system. HDFS is resilient.`
  
## Contractions

* Replace "i.e." or "e.g." with "for example".
  * :white_check_mark: `Specify the recipient, e.g. 'test@example.org'`
  * :no_entry: `Specify the recipient, for example 'test@example.org'`
* "etc" is allowed.
* Replace "don't", "can't", "hasn't", "isn't", "didn't" with "do not", "cannot", etc.
  * :white_check_mark: `The parameter isn't valid.`
  * :no_entry: `The parameter is not value.`

## Capitalization

* Use [title case](https://titlecase.com/) in headers.
  * :white_check_mark: `## Import Data`
  * :no_entry: `## Import data`
* Do not capitalize program/file/function names such as `curl`, `atsd.log`, even in headers.
  * :white_check_mark: `## Import Data with curl`
  * :no_entry: `## Import Data with Curl`
* Do not capitalize the first word after the colon in a list.
  * :white_check_mark: `Step 3: unzip files`
* Do not capitalize file extensions.
  * :white_check_mark: `.png`, `.xml`, `.jar`
* Keep original product capitalization.
  * :white_check_mark: `SQL Server Database`, `Hadoop`, `HBase`.
* In ambiguous cases, adhere to one option for consistency:
  * :white_check_mark: Unix, bash, IPv4, IPv6
  * :no_entry: UNIX, Bash, IP v4, IP v6
  
## Parentheses

* Do not use parentheses.
  * :no_entry: `Execute any query (such as 'SELECT 1') to test the connection`
  * :white_check_mark: `Execute 'SELECT 1' query to test the connection`
* Parentheses are allowed to spell out a number or character sequence.
  * :white_check_mark: `The field supports wildcards ('*')`
  * :white_check_mark: `Up to nine (9) fraction digits are allowed`
* If you need to make a note, refer to [Notes](#notes) guidelines.  

## Colons

* Begin lists with colons (:).
  * :white_check_mark: `Execute the following commands to stop the database:`
* Separate list titles from their content with a colon.
  * :white_check_mark: `Step 1: stop ATSD process.`

## Quotation Marks

* Do not use quotation marks.
* To designate [UI elements](#interface-elements) use bold text.
  * :no_entry: `Click on 'View' to proceed`
  * :white_check_mark: `Click **View** to proceed`
* To designate single-line machine output use bold text or backticks.
  * :no_entry: `Watch the log file for "Start completed" message.`
  * :white_check_mark: `Watch the log file for **Start completed** message.`
  * :white_check_mark: ``Watch the log file for `Start completed` message.``
* To designate multiple-line machine output use code blocks with `txt` dialect.

## Commas

* Do not use a comma to separate clauses with multiple actors. Create separate sentences.
  * :no_entry: `Submit the query, the result is displayed.`
  * :white_check_mark: `Submit the query. Review the results.`

## Hyphens

* Hyphenate compound adjectives.
  * :white_check_mark: `Cancel a long-running query`
* Do not hyphenate adverb adjectives that end with `ly`.
  * :no_entry: `Load data from the publicly-accessible service`.
  * :white_check_mark: `Review frequently used queries`.
* Do not use a hyphen to separate title from meaning, use a [colon](#colons).
  * :no_entry: `Meta Query - retrieves metadata from the service.`
  * :white_check_mark: `Meta Query: retrieves metadata from the service.`

## Backticks

Apply single backticks to the following:

* File names: `atsd.log`
* Directory and file paths: `/opt/atsd/atsd/conf/server.properties`
* File extensions: `.png`, `.xml`
* Program names: `curl`, `wget`, `cron`
* Email addresses: `example@example.org`
* Host names and IP addresses: `127.0.0.1`, `2001:db8::1`
* HTTP methods: `POST`, `GET`
* HTTP status codes: `200 OK`, `404`.
* URI paths and query strings: `/api/v1/{entity}/metrics`
* Header names and values.
  * Set `Content-Type` header to `application/json`.
* Function and procedure names.
* Reserved SQL keywords and clauses.
  * Add condition to the `HAVING` clause.
* Parameter, field, and variable names.
  * "Reset `queue.policy` to `BLOCK`"
  * "Local the `github-notify` rule on the **Alerts** page"
* Parameter, field, and variable values, including boolean values and numbers.
  * "Set `limit` field to `16`"
* Usernames.
  * "Switch to `axibase` user"
* Port numbers.
  * "Make sure ATSD is listening on port `8443`"
* Version numbers.
  * "Python `3.5` is required for ATSD version `19420`"
* Single-line machine output. Bold text is also allowed.
  * :white_check_mark: "Watch the log file for `Start completed` message."

Exceptions:

* Do not use backticks in headings.
  * :white_check_mark: `## Install Python 3.5 using curl`
  
### Code Block

* Fence code with triple backticks.
* Fence multiple-line machine output with triple backticks.
* Apply the correct dialect such as `javascript` or `python`.
  * Use `txt` for ASCII tables.
  * Use `json` for JSON documents, `xml` for XML files etc.
  * Use `txt` for machine output, unless the output is formatted, in which case use  appropriate dialect.
  * Use `ls` for Charts configuration.
  * Use `javascript` for rule engine expressions.

## Numbers

* Write out numbers one through ten, unless they have units.
  * :white_check_mark: `There are three ways to perform this calculation`
* Write out ordinal numbers.
  * :white_check_mark: `The first query causes the database to lock the table`  
* Add thousands separator except for milliseconds and machine output.
  * :white_check_mark: `Stop the query if the row count exceeds 1,000`
* When describing amounts of resource, write numeric value and space between the number and the unit.
  * :white_check_mark: `8 GB`, `128 MB`, `2 CPUs`
  
## Possessives

* Do not use possessives.
  * :no_entry: `Modify the file's content`
  * :white_check_mark: `Modify the file content` or `Modify the contents of the file`

## Headers

* Use [title case](https://titlecase.com/) in headers.
  * :white_check_mark: `## Import Data from File`
  * :no_entry: `## Import data from file`
* Do not use backticks in headers.
  * :white_check_mark: `## Configure cron`
  * :no_entry: `` ## Configure `cron` ``
* Do not terminate sentences in headers with dot.
  * :no_entry: `## Import data from file.`
* Avoid punctuation symbols in headers except colon (`:`).
  * :no_entry: `## Import Data from File (Directory)`

## Variables

* Use curly brackets (`{}`) to designate a variable or parameter in URI path or query string
  * :white_check_mark: `/api/v1/entity/{entity}/metrics`
  * :white_check_mark: `/api/v1/entity/{entity}/metrics?tags={tagValue}`
* Use camelCase in compound variable names in REST API
  * :white_check_mark: `entityGroup`
  * :no_entry: `entity-group`

## Example Names

* IPv4 address: `192.0.2.1`, `198.51.100.1`, `203.0.113.0` per [RFC 5737](https://tools.ietf.org/html/rfc5737).
* IPv4 address range: `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24`.
* IPv6 address: `2001:db8::1` per [RFC 3849](https://tools.ietf.org/html/rfc3849)
* IPv6 address range: `2001:db8::/32`
* Phone number: `(800) 555-0100`.
* Host name: `atsd_hostname`, `atsd_ip_address`.
* DNS name: `example.org`, `test.example.org`, `atsd.example.org` per [RFC 2606](https://tools.ietf.org/html/rfc2606).
* Email: `user@example.org`, `john.doe@example.org`
* First name: `John`, `Jack`, `Jane`, `Mary`
* Last name: `Doe`, `Smith`, `Jones`
* Credentials: `username` and `password`
* SSN: `000-00-0000`
* File path: `/path/to/new-dir`, `/path/to/new-file`. Replace `new-dir` and `new-file` to indicate the purpose, for example, `/path/to/backup-dir`

## Lists

* Use two spaces for indentation in bullet lists and numbered lists.

## Active Voice

* Maintain active voice for technical documentation.
* Describe both the actor and the action, or use the imperative to instruct a user.  

## Present Tense

* Do not use "will" and "was". Write everything in one present tense.

## Blacklisted Words

word | alternatives
---|---
should | use must or remove
would | -
will | use present tense
was | use present tens
abort | stop, cancel
kill | stop, cancel
terminate | stop, cancel
admin | administrator
so | use formal style
deselect | clear
uncheck | clear
flag | option, setting
ingest | load, import
lets | -
please | -
regex | regular expression
Epoch time | Unix time

## Notes

* Include notes when needed but separate the note so as not to lead a reader to believe the note is critical to the process.
* Notes that are not important but are relevant nonetheless should be appended to the end of a document.

## Interface Elements

* Interface elements should be **bold**.
* When describing interface elements include the type of element, except for button. Use the defined article "the".
  * `Click **Next**`
  * `Open the **Alerts** page`
* UI elements in Axibase products:
  * drop-down list (not drop-down menu)
  * tab
  * link
  * page
  * button
  * switch
  * window
  * dialog window (not popup menu)
  * left menu (also main menu)
  * top menu
* In ATSD, the **top menu** appears along the top of the user interface while the **left menu** or the **main menu** appears on the left side of the page.

## Links

* Use relative paths when linking markdown files in the same repository.
  * :white_check_mark: `Perform [ATSD restart](../../administration/restarting.md)`
  * :no_entry: `Perform [ATSD restart](/administration/restarting.md)`  
* When linking to documents in the same repository, link to markdown files, and not to `https://axibase.com/` URLs.
  * :white_check_mark: `Perform [ATSD restart](../../administration/restarting.md)`
  * :no_entry: `Perform [ATSD restart](https://axibase.com/docs/atsd/administration/restarting.html)`

## Product Names

* Shorten product names after you introduce the abbreviation.
* Capitalize product name s unless you refer to a general concept in place of the product name.
* Articles may be omitted from product names in most cases.

## Documentation Names

* Axibase Documentation is a proper noun, capitalize Axibase Documentation every time.
* When referring to a specific document or guide, you may leave the type of document lowercase.

## Issue Subjects

* Add prefix (topic) to subject. The topic can repeat the category or clarify it if necessary.
  * :white_check_mark: `UI: SQL Query Statistics page error.`
* Use regular case (not title case) in the subject.
* Use the imperative for features.
  * :white_check_mark: `Storage: Add table details to data consistency page.`
* Use descriptive sentences for bugs.
  * :white_check_mark: `NMON Parser: property record is not updated.`
