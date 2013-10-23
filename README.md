Name Brainstormulator
=====================

After brainstorming on a product name with [Robert](http://www.linkedin.com/pub/robert-sullivan/0/21/3a2) and @brianpartridge, this toy was born. Nothing fancy. Very cheap. Just enter some words and watch them flash up in different sequences.

<img src="https://github.com/ali5ter/name-brainstormulator/blob/master/app/images/screenshots/brainstormulator-00.png?raw=true" width="32%"/>&nbsp;
<img src="https://github.com/ali5ter/name-brainstormulator/blob/master/app/images/screenshots/brainstormulator-01.png?raw=true" width="32%"/>&nbsp;
<img src="https://github.com/ali5ter/name-brainstormulator/blob/master/app/images/screenshots/brainstormulator-02.png?raw=true" width="32%"/>&nbsp;

Installation
------------

If you are at all interested: Just clone and crank up <pre>python -m SimpleHTTPServer</pre> in the `app` directory.

Usage
-----

Press a key to show the input field, then enter a word. That word is added to the stored list of words. Escape will cancel the opertion.

The default number of words in a phrase that is flashed up is 3 but you can change that.

There are some commands too:
* **:words** ....... displays all the words so you can view them all at once and delete the ones you don't like. Escape to exit.
* **:clear** ....... removes all words and starts from scratch again. You should see a prompt to add a word after entering this.
* **:kickstart** ... populates the app with a bunch of words to get you going
* **:more** ........ increases the word length of the phrase
* **:less** ........ decreases the word length of the phrase
* **:faster** ...... increases speed at which phrases are flashed up
* **:slower** ...... drecreses speed at which phrases are flashed up

Comments
--------

Again, if you at all inerested: I'd welcome suggestions, advice and comments about coding style, visual and interaction design. Thanks!
