bugs-bunny
==========

A round-robin approach for daily bug cleanup.

Setting it up on heroku
=======================

First of all you need to install the heroku toolbelt which you can get [here](https://toolbelt.heroku.com/).
Run the installer and do this afterwards:

```console
heroku create --stack cedar
git push heroku master
heroku ps:scale web=1
heroku config:add NODE_ENV=production
```

After those basic steps, we have to setup the configuration of the project. For that, you just have to run `node` and to execute `JSON.stringify(contentOfYourConfig.json)`. Using the example configuration, it looks like this:

```js
JSON.stringify({
  "bugsBunnies": {
    "me@foo.com": "Michael",
    "bar@lol.com": "Andreas"
  },
  "notifications": {
    "no-bugs-bunny@aol.com": "I'm not a bugs bunny."
  },
  "gmail": {
    "user": "me@gmail.com",
    "pass": "**password**"
  }
})
```

Now take the result and use `config:add` again:

```console
heroku config:add CONFIG=<resultOfJSONStringify>
# e.g. heroku config:add CONFIG='{"bugsBunnies":{"me@foo.com":"Michael","bar@lol.com":"Andreas"},"notifications":{"no-bugs-bunny@aol.com":"I\'m not a bugs bunny."},"gmail":{"user":"me@gmail.com","pass":"**password**"}}'
```

Now that everything is up and running, you might want to rename the application in order to get a nicer URL for it. Just do this:

```console
heroku rename nameOfNewApp
```

Authors/Contributors
====================

- DaWanda GmbH
- Sascha Depold ([Twitter](http://twitter.com/sdepold) | [Github](http://github.com/sdepold) | [Website](http://depold.com))

License
=======
Hereby placed under MIT license.
