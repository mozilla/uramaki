Signin to the Browser
=====

Signing into the browser should provide the user with:
* a list of his BrowserID identities that can be proven to web sites
* a list of services that are integrated into the browser

Browsing Context Provider
---

The Browsing Context Provider is the server that provides the browsing
context, e.g. initial identity, additional certs and services. It is a
Browser IdP with some extra properties, specifically:

* loginURL as expected
* provisionURL as expected
* discovery a new key e.g.

     "https://services.mozilla.org/discovery": "https://discovery.server/endpoint"

where this endpoint is expected to be loaded in an IFRAME and follow a
postMessage protocol for discovery.

Third-Party BrowserID Service
---

Third-party BrowserID services are typed by URL (e.g. the discovery
URL above). These URLs are expected to be loaded in an IFRAME in a
user-agent, with communication via postMessage. To send a message, the
service uses either a special variable, window.channel, if it is
present, or the parent frame (window.parent). The protocol goes like
this:

* service URL loaded in Service Frame (IFRAME)
* Service Frame postMessage to Browser Frame

     {type: "ready"}

* Browser Frame postMessage to Service Frame

     {type: "credentials", credentials: <ASSERTION>}

where the assertion is a special BrowserID assertion that contains the
right audience (service host) and an additional parameter, client,
which indicates the origin of the browser frame. This client parameter
should match the event.origin of the postMessage.

* Service Frame to Browser Frame

     {type: "credentialsResult", result: true}

or

     {type: "credentialsResult", result: false, reason: "blah blah blah"}


Once we have a successful credential setup, the specifics of the protocol can proceed:

* Browser Frame to Service Frame

     {type: "call", method: "getStuff", params: {}}

with response

     {type: "response", result: {}}

Discovery
---

The discovery endpoint is a URL that is expected to be loaded in an
IFRAME with postMessage communication from the parent frame (window.parent).

The specific discovery protocol

Additional Services: Bookmarks
---