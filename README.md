# CSE6242-Columnists

## Introduction
The New Yorker captioning contest is an ongoing competition involving the captioning of cartoon images. We, as The Columnists, built a visualization tool for this contest, allowing users to graphically see what captions the general public percieves as funny, and the similarity these user created captions from a Natural Language Processing perspective. Additionally, we allow users of our visualization tool to interact and submit their own captions, for which we will return a humor score using our trained machine learning models.
## Setup

install python packages: `python -m pip install -r requirements.txt`

install node packages: `npm i`

run express server: `node server.js`

run frontend using [vscode liveserver](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) or python: `python -m http.server 5500` and navigate to `localhost:5500`