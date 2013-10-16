
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
    entryShown = false,
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
            setStatus('Add a word');
            return '';
        }
        var phrase = '';
        for (var i=0; i<wordsPerPhrase; i++) {
            phrase = phrase + getWord(phrase, words);
        }
        return phrase;
    },
    setStatus = function(message) {
        $('#status').fadeIn(function() {
            $(this).text(message);
            setInterval(function() { $('#status').fadeOut(); }, 3000);
        });
    },
    setPhrase = function(phrase) {
        if (typeof(phrase) === 'undefined') phrase = getPhrase(words);
        $('h1').fadeOut(function() {
            $(this).text(phrase).fadeIn();
       });
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
        if (entryShown && (e.which == 13 || e.which == 27)) {
            var entry = $('#entry input').val();
            switch(entry) {
                case ':clear':
                    words = [];
                    console.log('Clearing words');
                    break;
                case ':kickstart':
                    words = kickstart
                    console.log('Loading test words');
                    break;
                case ':more':
                    wordsPerPhrase++
                    setStatus('Now showing a '+ wordsPerPhrase +' word phrase');
                    break;
                case ':less':
                    wordsPerPhrase--
                    setStatus('Now showing a '+ wordsPerPhrase +' word phrase');
                case ':words':
                    console.log('Show words');
                    break;
                default:
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

    // TODO: Make setTimeout to control timer
    setPhrase();
    setInterval(function() { setPhrase(); }, phraseRefresh);
});

