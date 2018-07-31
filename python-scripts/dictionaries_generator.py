#!/usr/bin/env python3

import json
import sys
import urllib.request as req
from typing import Callable


BASE_DICTIONARY_LOCATION = "https://github.com/axibase/atsd/blob/master/"
DEFAULT_NAMES_DICTIONARY_FILENAME = ".dictionary-names"
DEFAULT_OTHER_DICTIONARY_FILENAME = ".dictionary-other"
DEFAULT_PLAIN_DICTIONARY_DESTINATION = ".spelling"
DEFAULT_JSON_DICTIONARY_DESTINATION = ".yaspeller-dictionary.json"


def wrap_pattern(pattern: str):
    return ".*?\\b{}\\b.*?".format(pattern)


def modify_regex(pattern: str):
    first_letter = pattern[0]
    if first_letter.isalpha():
        return wrap_pattern("[{}{}]{}".format(first_letter.upper(), first_letter.lower(), pattern[1:]))
    else:
        return wrap_pattern(pattern)


def convert_dictionary(file_provider: Callable, transformer_func: Callable, result: set):
    try:
        with file_provider() as f:
            for line in f:
                line = line.strip()
                if len(line) > 0:
                    result.add(transformer_func(line))
    except (OSError, IOError) as exc:
        sys.stderr.write(str(exc) + "\n")


def download_file(filename):
    req.urlopen(BASE_DICTIONARY_LOCATION + filename)


if __name__ == '__main__':
    download_base_dictionary = False if len(sys.argv) > 1 and sys.argv[1] == 'false' else True
    names_dictionary_name = sys.argv[2] if len(sys.argv) > 1 else DEFAULT_NAMES_DICTIONARY_FILENAME
    words_dictionary_name = sys.argv[3] if len(sys.argv) > 2 else DEFAULT_OTHER_DICTIONARY_FILENAME
    if DEFAULT_PLAIN_DICTIONARY_DESTINATION in (names_dictionary_name, words_dictionary_name):
        sys.stderr("Source dictionary filename must not be equal to {}\n".format(DEFAULT_PLAIN_DICTIONARY_DESTINATION))
        exit(1)

    dictionary_words = set()
    if download_base_dictionary:
        convert_dictionary(lambda: download_file(DEFAULT_NAMES_DICTIONARY_FILENAME), wrap_pattern, dictionary_words)
        convert_dictionary(lambda: download_file(DEFAULT_OTHER_DICTIONARY_FILENAME), modify_regex, dictionary_words)

    convert_dictionary(lambda: open(names_dictionary_name), wrap_pattern, dictionary_words)
    convert_dictionary(lambda: open(words_dictionary_name), modify_regex, dictionary_words)
    sorted_dictionary = list(sorted(dictionary_words))

    with open(DEFAULT_PLAIN_DICTIONARY_DESTINATION, 'w') as out:
        out.write('\n'.join(sorted_dictionary))

    with open(DEFAULT_JSON_DICTIONARY_DESTINATION, 'w') as out:
        out.write(json.dumps(sorted_dictionary))
