Name Brainstormulator
=====================
A very simple web app to flash up words in different sequences. Used as a simple test app for container and kubernetes deployment.

<img src="https://raw.githubusercontent.com/ali5ter/name-brainstormulator/master/screenshots/brainstormulator-00.png" width="32%"/>&nbsp;
<img src="https://raw.githubusercontent.com/ali5ter/name-brainstormulator/master/screenshots/brainstormulator-01.png" width="32%"/>&nbsp;
<img src="https://raw.githubusercontent.com/ali5ter/name-brainstormulator/master/screenshots/brainstormulator-02.png" width="32%"/>&nbsp;

Running
-------
After cloning this repo, you can run locally as a container like this:
1. Build the docker image: <pre>docker build -t ali5ter/name-brainstormulator:1.3 .</pre>
2. Run the container: <pre>docker run -d -p8080:80 ali5ter/name-brainstormulator:1.3</pre>
3. Open http://localhost:8080/ and play with the app
4. Stop and remove the container: <pre>docker rm -f $(docker ps -lq)</pre>

Deploy this on Kubernetes like this:
1. Deploy on K8s: <pre>kubectl apply -f deployment.yaml</pre>
2. Open the external address presented by the service to view the app: <pre>kubectl get svc -n nb name-brainstormulator</pre>
3. If you're using minikube run <pre>open "http://$(minikube ip):$(kubectl get svc -n nb name-brainstormulator -o jsonpath='{.spec.ports[0].nodePort}')"</pre>
4. Play with scaling the deployment: <pre>kubectl scale deployments/name-brainstormulator -n nb --replicas=110</pre>
5. Remove the deployment: <pre>kubectl delete namespace/nb</pre>

Usage
-----
Press a key to show the input field, then enter a word. That word is added to the stored list of words. Escape will cancel the operation.

The default number of words in a phrase that is flashed up is 3 but you can change that.

There are some commands too:
* **:words** ....... displays all the words so you can view them all at once and delete the ones you don't like. Escape to exit.
* **:clear** ....... removes all words and starts from scratch again. You should see a prompt to add a word after entering this.
* **:kickstart** ... populates the app with a bunch of words to get you going
* **:more** ........ increases the word length of the phrase
* **:less** ........ decreases the word length of the phrase
* **:faster** ...... increases speed at which phrases are flashed up
* **:slower** ...... decreases speed at which phrases are flashed up
