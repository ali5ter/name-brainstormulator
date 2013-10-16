
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
    getWord = function(phrase) {
        var word = phrase;
        while (phrase.match(RegExp(word, 'g'))) {
            word = words[Math.floor((Math.random()*(words.length-1)))];
        }
        return word +' ';
    },
    getPhrase = function() {
        var phrase = '';
        for (var i=0; i<wordsPerPhrase; i++) {
            phrase = phrase + getWord(phrase);
        }
        return phrase;
    },
    setPhrase = function() {
        $('h1').fadeOut(function() {
            $(this).text(getPhrase()).fadeIn();
       });
    },
    parseKey = function(e) {
        console.log(e.which);
        if (!entryShown) {
            $('#entry').show();
            $('#entry input').val(String.fromCharCode(e.which)).focus();
            entryShown = true;
        }
        if (entryShown && (e.which == 13 || e.which == 27)) {
            var entry = $('#entry input').val();
            switch(entry) {
                case 'ºclear':
                    words = [];
                    console.log('Clearing words');
                    break;
                case 'ºkickstart':
                    words = kickstart
                    console.log('Loading test words');
                    break;
                case 'ºwords':
                    console.log('Show words');
                    break;
                default:
                    words.push(entry);
                    console.log('Added '+ entry);
                    console.dir(words);
            }
            $('#entry').hide();
            $('#entry input').val('');
            entryShown = false;
        }
        e.preventDefault();
    },
    permutation = function(n, r) {
        if (n<0 || r<0 || r>n) return 0;
        var p = 1; for ( var i=n; i>(n-r); i--) { p=p*i; }
        return p;
    };

$(function() {
    words = kickstart;
    console.log('Imported '+ words.length +' words');
    var perms = permutation(words.length, wordsPerPhrase);
    console.log('The provides '+ perms +' permutations of a '+ wordsPerPhrase +' word phrase');

    $(document).keyup(parseKey);

    setPhrase();
    setInterval(function() { setPhrase(); }, phraseRefresh);
});

