Name Brainstormulator
=====================

After brainstorming on a product name with [Robert](http://www.linkedin.com/pub/robert-sullivan/0/21/3a2) and @brianpartridge, this toy was born. Nothing fancy. Very cheap. Just enter some words and watch them flash up in different sequences.

Currently using as a simple test app for k8s deployments.

<img src="https://raw.githubusercontent.com/ali5ter/name-brainstormulator/master/app/images/screenshots/brainstormulator-00.png" width="32%"/>&nbsp;
<img src="https://raw.githubusercontent.com/ali5ter/name-brainstormulator/master/app/images/screenshots/brainstormulator-01.png" width="32%"/>&nbsp;
<img src="https://raw.githubusercontent.com/ali5ter/name-brainstormulator/master/app/images/screenshots/brainstormulator-02.png" width="32%"/>&nbsp;

Running
-------

Clone this repo and start <pre>python -m SimpleHTTPServer</pre> in the `app` directory.

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

K8s deployment
--------------

Clone this repo, then inside it do the following:
1. Build the docker image: <pre>docker build -t ali5ter/name-brainstormulator:1.0 .</pre>
2. Optionally push the image: <pre>docker push ali5ter/name-brainstormulator:1.0</pre>
3. Deploy on K8s: <pre>kubectl apply -f deployment.yaml</pre>
4. Play with it
5. Remove the deployment: <pre>kubectl delete deployment.apps/name-brainstormulator service/name-brainstormulator</pre>

You can also run the docker image locally, if you don't have a K8s cluster handy:
<pre>docker run -p80:8080 ali5ter/name-brainstormulator:1.0</pre>
