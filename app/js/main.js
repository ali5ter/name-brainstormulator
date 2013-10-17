/**
 * ★ A simple toy to brainstorm a name or phrase.
 * @author Alister Lewis-Bowen <alister@different.com>
 */

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

    // Return a word from the words array that hasn't already been used
    // in the phrase
    getWord = function(phrase, words) {
        if (words.length === 0) return '';
        var word = phrase;
        while (phrase.match(RegExp(word, 'g'))) {
            word = words[Math.floor((Math.random()*(words.length)))];
        }
        return word +' ';
    },

    // Return a phrase of a specified number of words
    getPhrase = function(words, wordsPerPhrase) {
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

    // Display a phrase on-screen
    setPhrase = function(phrase) {
        if (typeof(phrase) === 'undefined') phrase = getPhrase(words, wordsPerPhrase);
        console.log('set phrase to '+ phrase);
        $('#phrase').fadeOut(function() {
            $(this).text(phrase).fadeIn();
       });
    },

    // Start the phrase display timer
    startPhrase = function() {
        console.log('Start phrase timer');
        phraseTimer = setInterval(function() { setPhrase(); }, phraseRefresh);
    },

    // Stop the phrase display timer
    stopPhrase = function() {
        console.log('Stop phrase timer');
        clearInterval(phraseTimer);
    },

    // Display a status message on-screen
    setStatus = function(message, fadeOut) {
        if (typeof(fadeOut) === 'undefined') fadeOut = true;
        $('#status').fadeIn(function() {
            $(this).text(message);
            if (fadeOut) setInterval(function() { $('#status').fadeOut(); }, 4000);
        });
    },

    // Add a word to the word list on-screen
    appendWord = function(word) {
        $('#words').append('<p><i class="icon-remove-sign pull-left icon-muted"></i>'+ word +'</p>');
    },

    // Diplay all words as a list on-screen
    showWords = function(words) {
        for (var i=0;i<words.length;i++) { appendWord(words[i]); }
        $('#words').column({
            count: 5,
            rule_style: 'solid',
            rule_width: 'thin',
            rule_color: '#2A2A2A',
        });
    },

    // Remove word from word list and from word array
    removeWord = function(oWord) {
        var i= $.inArray(oWord.text(), words);
        if (i >= 0) {
            words.splice(i, 1);
            oWord.remove();
            console.log('Removed '+ oWord.text());
        }
    },

    // Handle any key stroke events on-screen
    keyupHandler = function(e) {
        //console.log(e.which);

        // Display the entry field on-screen if it's not already
        if (!entryShown) {
            $('#entry').show();
            // TODO: Attempt to show trigger char?
            //$('#entry input').val(String.fromCharCode(e.which)).focus();
            $('#entry input').focus();
            entryShown = true;
        }
        // Hide the word list if ESC pressed
        if (wordsShown && e.which === 27) {
            $('#words').hide();
            $('#phrase').show();
            startPhrase();
            wordsShown = false;
        }
        // Parse the entry field content if Enter or ESC pressed, then close it
        if (entryShown && (e.which === 13 || e.which === 27)) {
            parseEntry($('#entry input').val());
            $('#entry').hide();
            $('#entry input').val('');
            entryShown = false;
        }
        e.preventDefault(); // one way to stop space from scrolling the view port
    },

    // Parse the entry field content
    parseEntry = function (entry) {
        switch(entry) {
            case ':clear':      // clear the words array
                words = [];
                $('#words').empty();
                console.log('Cleared all words');
                break;
            case ':kickstart':  // populate word aray with test data
                words = kickstart;
                console.log('Loaded test words');
                break;
            case ':more':       // increase word length of the phrase
                wordsPerPhrase++;
                setStatus('Now showing a '+ wordsPerPhrase +' word phrase');
                break;
            case ':less':       // decrease word length of the phrase
                wordsPerPhrase--;
                setStatus('Now showing a '+ wordsPerPhrase +' word phrase');
                break;
            case ':words':      // show word list
                stopPhrase();
                $('#phrase').hide();
                $('#words').show();
                $('#words').empty();
                showWords(words);
                wordsShown = true;
                break;
            default:            // add content as a word to the word array
                entry = $.trim(entry);
                // TODO: Check for duplicates
                if (entry != '') {
                    words.push(entry);
                    setStatus('Added '+ entry);
                    // TODO: Update localStorage
                }
        }
    },

    // Return number of permutations of r selected items out of n items
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

    $(document).keyup(keyupHandler);
    $('#words').delegate('p', 'click', function() { removeWord($(this)); });

    setPhrase();
    startPhrase();
});

