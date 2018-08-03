#!/usr/bin/env python3

import argparse
import contextlib
import json
import sys
try:
    import urllib.request as req
except ImportError:
    import urllib as req

PY3 = sys.version_info >= (3, 0)
str_type = str if PY3 else unicode


"""
The script converts human-readable dictionary files to regular expressions understood by
spellchecker-cli and yaspeller tools. As a result it creates two files in a working directory:
- .spelling (format recognized by spellchecker-cli)
- .yaspeller-dictionary.json (format recognized by yaspeller)

Optional arguments:
--mode. Can be "atsd", "legacy" or "default".
    "atsd" means that the script is running in atsd repository and it
           doesn't need to download base dictionary
    "legacy" means that current repo is not updated to new format, so a single .dictionary file should be used
    "default" downloads base dictionaries and merges their content with current repository dictionaries
    dictionaries
--names-dictionary filename of dictionary with case-sensitive patterns (default is ".dictionary-names")
--words-dictionary filename of dictionary with patterns with case-insensitive capital (default is ".dictionary-other")
"""

BASE_DICTIONARY_LOCATION = "https://raw.githubusercontent.com/axibase/atsd/master/"
DEFAULT_NAMES_DICTIONARY_FILENAME = ".dictionary-names"
DEFAULT_OTHER_DICTIONARY_FILENAME = ".dictionary-other"
DEFAULT_LEGACY_DICTIONARY_FILENAME = ".dictionary"
DEFAULT_PLAIN_DICTIONARY_DESTINATION = ".spelling"
DEFAULT_JSON_DICTIONARY_DESTINATION = ".yaspeller-dictionary.json"


def wrap_pattern(pattern):
    """
    wraps the pattern to word boundaries.
    punctuation marks are checked to reduce number of false-positive matches in spellchecker-cli
    :param pattern: original regex
    :return: modified regex pattern
    """
    return str_type("\\b{}\\b[.,:?!)]*?").format(pattern)


def to_case_insensitive_regex(pattern):
    first_letter = pattern[0]
    if first_letter.isalpha():
        return wrap_pattern(str_type("[{}{}]{}").format(first_letter.upper(), first_letter.lower(), pattern[1:]))
    else:
        return wrap_pattern(pattern)


def convert_dictionary(file_provider, transformer_func, result):
    try:
        with file_provider() as f:
            for line in f:
                line = line.strip()
                if len(line) > 0:
                    if not isinstance(line, str_type):
                        line = line.decode('utf-8')
                    result.add(transformer_func(line))
    except (OSError, IOError) as exc:
        sys.stderr.write(str_type(exc) + "\n")


def download_file(filename):
    urlopen = req.urlopen(BASE_DICTIONARY_LOCATION + filename)
    if urlopen.code >= 400:
        urlopen.close()
        raise IOError("Response code: {}".format(urlopen.code))
    return contextlib.closing(urlopen)


def validate_arguments():
    parser = argparse.ArgumentParser(description='Spellchecking dictionaries converter.')
    parser.add_argument('--mode', '-m', type=str,
                        help="mode: atsd (don't download additional dictionaries), "
                             "legacy (load single .dictionary file from current repo), "
                             "default (download .dictionary-names, .dictionary-other from atsd repository, "
                             "merge with similar files in current repo)",
                        default="default")
    parser.add_argument('--names-dictionary', '-nd', type=str,
                        help='Names dictionary filename, first letter in each word in file stays unchanged',
                        default=DEFAULT_NAMES_DICTIONARY_FILENAME)
    parser.add_argument('--words-dictionary', '-d', type=str,
                        help='Other dictionary filename',
                        default=DEFAULT_OTHER_DICTIONARY_FILENAME)
    args = parser.parse_args()

    if DEFAULT_PLAIN_DICTIONARY_DESTINATION in (args.names_dictionary, args.words_dictionary):
        sys.stderr("Source dictionary filename must not be equal to {}\n".format(DEFAULT_PLAIN_DICTIONARY_DESTINATION))
        exit(1)
    return args


def write(destination, string):
    result = string if PY3 else string.encode('utf-8')
    destination.write(result)


if __name__ == '__main__':
    args = validate_arguments()
    patterns = set()
    if args.mode.lower() != "atsd" and False:
        convert_dictionary(lambda: download_file(DEFAULT_NAMES_DICTIONARY_FILENAME), wrap_pattern, patterns)
        convert_dictionary(lambda: download_file(DEFAULT_OTHER_DICTIONARY_FILENAME), to_case_insensitive_regex, patterns)
    if args.mode.lower() == "legacy":
        convert_dictionary(lambda: open(DEFAULT_LEGACY_DICTIONARY_FILENAME), to_case_insensitive_regex, patterns)
    else:
        convert_dictionary(lambda: open(args.names_dictionary), wrap_pattern, patterns)
        convert_dictionary(lambda: open(args.words_dictionary), to_case_insensitive_regex, patterns)
    sorted_dictionary = list(sorted(patterns))

    with open(DEFAULT_PLAIN_DICTIONARY_DESTINATION, 'w') as out:
        write(out, '\n'.join(sorted_dictionary))

    with open(DEFAULT_JSON_DICTIONARY_DESTINATION, 'w') as out:
        write(out, json.dumps(sorted_dictionary))
