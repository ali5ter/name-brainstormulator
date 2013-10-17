
var words = [],
    kickstart = ['Beacon','Insight','Monitor','Mobile','Case','View','Scope',
    'Minder','Monocle','Nanny','Handheld','vCenter','VSphere','Alert','Touch',
    'Analysis','Pocket','Assist','On-call','VM','Remote','Management',
    'Collector','Inspector','Investigate','Delegation','Check-in','Bookmarks',
    'KB','Investigate','Delegation','Sleuth','Dashboard','Consult',
    'Consulting','Assistant','Assit','Curator','List','Observer','Watchlist',
    'Lifelist','Pokedex','Lite','Focused','Control'],
    wordsPerPhrase = 3,
    phraseRefresh = 4000,
    phrase = '',
    phraseTimer = null,
    entryShown = false,
    wordsShown = false,
    getWord = function(phrase, words) {
        if (words.length === 0) return '';
        var word = phrase;
        while (phrase.match(RegExp(word, 'g'))) {
            word = words[Math.floor((Math.random()*(words.length)))];
        }
        return word +' ';
    },
    getPhrase = function(words) {
        if (words.length < wordsPerPhrase) {
            setStatus('Add a word', false);
            return '';
        }
        var phrase = '';
        for (var i=0; i<wordsPerPhrase; i++) {
            phrase = phrase + getWord(phrase, words);
        }
        return phrase;
    },
    setStatus = function(message, fadeOut) {
        if (typeof(fadeOut) === 'undefined') fadeOut = true;
        $('#status').fadeIn(function() {
            $(this).text(message);
            if (fadeOut) setInterval(function() { $('#status').fadeOut(); }, 4000);
        });
    },
    setPhrase = function(phrase) {
        if (typeof(phrase) === 'undefined') phrase = getPhrase(words);
        console.log('set phrase to '+ phrase);
        $('#phrase').fadeOut(function() {
            $(this).text(phrase).fadeIn();
       });
    },
    appendWord = function(word) {
        $('#words').append('<p><i class="icon-remove-sign pull-left icon-muted"></i>'+ word +'</p>');
    },
    showWords = function(words) {
        for (var i=0;i<words.length;i++) { appendWord(words[i]); }
        $('#words').column({
            count: 5,
            rule_style: 'solid',
            rule_width: 'thin',
            rule_color: '#2A2A2A',
        });
    },
    removeWord = function(oWord) {
        var i= $.inArray(oWord.text(), words);
        if (i >= 0) {
            words.splice(i, 1);
            oWord.remove();
            console.log('Removed '+ oWord.text());
        }
    },
    parseKey = function(e) {
        console.log(e.which);
        if (!entryShown) {
            $('#entry').show();
            // TODO: Attempt to show trigger char?
            //$('#entry input').val(String.fromCharCode(e.which)).focus();
            $('#entry input').focus();
            entryShown = true;
        }
        if (wordsShown && e.which === 27) {
            $('#words').hide();
            $('#phrase').show();
            startPhrase();
            wordsShown = false;
        }
        if (entryShown && (e.which === 13 || e.which === 27)) {
            var entry = $('#entry input').val();
            switch(entry) {
                case ':clear':
                    words = [];
                    $('#words').empty();
                    console.log('Cleared all words');
                    break;
                case ':kickstart':
                    words = kickstart;
                    console.log('Loaded test words');
                    break;
                case ':more':
                    wordsPerPhrase++;
                    setStatus('Now showing a '+ wordsPerPhrase +' word phrase');
                    break;
                case ':less':
                    wordsPerPhrase--;
                    setStatus('Now showing a '+ wordsPerPhrase +' word phrase');
                    break;
                case ':words':
                    $('#words').show();
                    $('#words').empty();
                    showWords(words);
                    $('#phrase').hide();
                    stopPhrase();
                    wordsShown = true;
                    break;
                default:
                    entry = $.trim(entry);
                    // TODO: Check for duplicates
                    if (entry != '') {
                        words.push(entry);
                        setStatus('Added '+ entry);
                        // TODO: Update localStorage
                    }
            }
            $('#entry').hide();
            $('#entry input').val('');
            entryShown = false;
        }
        e.preventDefault(); // one way to stop space from scrolling the view port
    },
    startPhrase = function() {
        console.log('Start phrase timer');
        phraseTimer = setInterval(function() { setPhrase(); }, phraseRefresh);
    },
    stopPhrase = function() {
        console.log('Stop phrase timer');
        clearInterval(phraseTimer);
    },
    permutation = function(n, r) {
        if (n<0 || r<0 || r>n) return 0;
        var p = 1; for ( var i=n; i>(n-r); i--) { p=p*i; }
        return p;
    };

$(function() {
    // TODO: Replace kickstart with import from localStorage
    words = kickstart;
    console.log('Imported '+ words.length +' words');
    var perms = permutation(words.length, wordsPerPhrase);
    console.log('This provides '+ perms +' permutations of a '+ wordsPerPhrase +' word phrase');

    $(document).keyup(parseKey);
    $('#words').delegate('p', 'click', function() { removeWord($(this)); });

    setPhrase();
    startPhrase();
});

