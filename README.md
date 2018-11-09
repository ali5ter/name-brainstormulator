Name Brainstormulator
=====================
A very simple web app to flash up words in different sequences. Used as a simple test app for container and kubernetes deployment.

<img src="https://raw.githubusercontent.com/ali5ter/name-brainstormulator/master/app/images/screenshots/brainstormulator-00.png" width="32%"/>&nbsp;
<img src="https://raw.githubusercontent.com/ali5ter/name-brainstormulator/master/app/images/screenshots/brainstormulator-01.png" width="32%"/>&nbsp;
<img src="https://raw.githubusercontent.com/ali5ter/name-brainstormulator/master/app/images/screenshots/brainstormulator-02.png" width="32%"/>&nbsp;

Running
-------
After cloning this repo, you can run locally as a container like this:
1. Build the docker image: <pre>docker build -t ali5ter/name-brainstormulator:1.1 .</pre>
2. Run the container: <pre>docker run -d -p80:8080 ali5ter/name-brainstormulator:1.1</pre>
3. Open http://localhost/ and play with the app
4. Stop and remove the container: <pre>docker rm -f $(docker ps | grep name-brainstormulator | awk '{print $1}')</pre>

Deploy this on Kubernetes like this:
1. Build the docker image: <pre>docker build -t ali5ter/name-brainstormulator:1.1 .</pre>
2. Push the image to an accessible image registry : <pre>docker push ali5ter/name-brainstormulator:1.1</pre>
3. Deploy on K8s: <pre>kubectl apply -f deployment.yaml</pre>
4. Open the external address presented by K8s and play with the app
5. Play with scaling the deployment: <pre>kubectl scale deployments/name-brainstormulator --replicas=110</pre>
6. Remove the deployment: <pre>kubectl delete deployment/name-brainstormulator service/name-brainstormulator</pre>

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
