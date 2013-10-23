#!/bin/bash
# ★  Display all permutations of an 'n' word phrase from a list of 'm' words.
# @author Alister Lewis-Bowen <alister@different.com>

BASE=$(dirname $0)
WORDS=''
NUM_WORDS=0
PHRASE=''
WORDS_IN_PHRASE=3

# dump words into js array format...
# cat words.txt | sed -E "s/^(.+)$/'\1'/" | tr '\n' ','

function importWords {
    local i=0
    while read word ; do
        WORDS[$i]="$word"
        i=$(($i+1))
    done < "$BASE/words.txt"
    NUM_WORDS=${#WORDS[@]}
}

function getWord {
    local word="$1"
    while [[ $(echo "$1" | grep -c "$word") -gt 0 ]]; do
        word=${WORDS[$(( ( RANDOM % $NUM_WORDS ) ))]}
    done
    echo -n "$word "
}

# @see http://phodd.net/gnu-bc/
function permutation {
    echo 'define int_permutation(n,r)
    {
        auto i,p,os;
        os=scale;scale=0;n/=1;r/=1
        if(n<0||r<0||r>n)return(0)
        p=1;for(i=n;i>n-r;i--)p*=i
        scale=os;return(p)
    }
    int_permutation('$1','$2')' | bc
}

importWords && (
    echo "Imported $NUM_WORDS words"
    PERMS=$(permutation $NUM_WORDS $WORDS_IN_PHRASE)
    echo "That provides $PERMS permutations of a $WORDS_IN_PHRASE word phrase"
    echo -e "Like this...\n"
    for perms in $(seq $PERMS); do
        for words in $(seq $WORDS_IN_PHRASE); do
            PHRASE=$PHRASE$(getWord "$PHRASE")
        done
        echo $PHRASE
        PHRASE=''
    done
    echo )
