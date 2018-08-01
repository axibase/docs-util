#!/usr/bin/env python3

import argparse
import json
import sys
import urllib.request as req
from typing import Callable, IO

"""
The script converts human-readable dictionary files to regular expressions understood by
spellchecker-cli and yaspeller tools. As a result it creates two files in a working directory:
- .spelling (format recognized by spellchecker-cli)
- .yaspeller-dictionary.json (format recognized by yaspeller)

Optional arguments:
$1 mode. Can be "atsd", "legacy" or "default".
    "atsd" means that the script is running in atsd repository and it
           doesn't need to download base dictionary
    "legacy" means that the base repository (atsd) dictionary is not updated, so download
           the old dictionary file .spelling
    "default" downloads base dictionaries and merges their content with current repository
    dictionaries
$2 names dictionary filename (default is ".dictionary-names")
$3 other dictionary filename (default is ".dictionary-other")
"""

BASE_DICTIONARY_LOCATION = "https://raw.githubusercontent.com/axibase/atsd/master/"
DEFAULT_NAMES_DICTIONARY_FILENAME = ".dictionary-names"
DEFAULT_OTHER_DICTIONARY_FILENAME = ".dictionary-other"
DEFAULT_PLAIN_DICTIONARY_DESTINATION = ".spelling"
DEFAULT_JSON_DICTIONARY_DESTINATION = ".yaspeller-dictionary.json"


def wrap_pattern(pattern: str) -> str:
    """
    wraps the pattern to word boundaries.
    punctuation marks are checked to reduce number of false-positive matches in spellchecker-cli
    :param pattern: original regex
    :return: modified regex pattern
    """
    return "\\b{}\\b[.,:?!)]*?".format(pattern)


def modify_regex(pattern: str) -> str:
    first_letter = pattern[0]
    if first_letter.isalpha():
        return wrap_pattern("[{}{}]{}".format(first_letter.upper(), first_letter.lower(), pattern[1:]))
    else:
        return wrap_pattern(pattern)


def convert_dictionary(file_provider: Callable[[], IO], transformer_func: Callable[[str], str], result: set):
    try:
        with file_provider() as f:
            for line in f:
                line = line.strip()
                if len(line) > 0:
                    if isinstance(line, bytes):
                        line = line.decode('utf-8')
                    result.add(transformer_func(line))
    except (OSError, IOError) as exc:
        sys.stderr.write(str(exc) + "\n")


def download_file(filename) -> IO:
    return req.urlopen(BASE_DICTIONARY_LOCATION + filename)


def validate_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description='Spellchecking dictionaries converter.')
    parser.add_argument('--mode', '-m', type=str,
                        help="mode: atsd (don't download additional dictionaries), "
                             "legacy (download .spelling file), "
                             "default (download .dictionary-names, .dictionary-other from atsd repository)",
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


if __name__ == '__main__':
    args = validate_arguments()
    patterns = set()
    if args.mode.lower() == "legacy":
        convert_dictionary(lambda: download_file(DEFAULT_PLAIN_DICTIONARY_DESTINATION), wrap_pattern, patterns)
    elif args.mode.lower() != "atsd":
        convert_dictionary(lambda: download_file(DEFAULT_NAMES_DICTIONARY_FILENAME), wrap_pattern, patterns)
        convert_dictionary(lambda: download_file(DEFAULT_OTHER_DICTIONARY_FILENAME), modify_regex, patterns)

    convert_dictionary(lambda: open(args.names_dictionary), wrap_pattern, patterns)
    convert_dictionary(lambda: open(args.words_dictionary), modify_regex, patterns)
    sorted_dictionary = list(sorted(patterns))

    with open(DEFAULT_PLAIN_DICTIONARY_DESTINATION, 'w') as out:
        out.write('\n'.join(sorted_dictionary))

    with open(DEFAULT_JSON_DICTIONARY_DESTINATION, 'w') as out:
        out.write(json.dumps(sorted_dictionary))
