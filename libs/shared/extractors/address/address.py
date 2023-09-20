import sys
from json import dumps
from natasha import (
    MorphVocab,
    AddrExtractor,
)

morph_vocab = MorphVocab()
addr_extractor = AddrExtractor(morph_vocab)


def extract_address(text: str) -> str:
    addr = addr_extractor.find(text)

    if not addr:
        return addr

    return [{'value': part.value, 'type': part.type} for part in addr.fact.parts]


print(dumps(extract_address(sys.argv[1])))
