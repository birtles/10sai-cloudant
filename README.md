## Adding a new database

Can be done easily either via curl or the Cloudant console.

## Switching to CouchDB auth

You need to do this for each DB.

Replace `DBNAMEHERE` and `PASSWORDHERE` below. The password is the admin one
from the CouchDB page.

```
curl -X PUT -d @_security-cloudant.json https://b62bf565-d36c-45ce-a12d-fc3bd31a256b-bluemix.cloudant.com/DBNAMEHERE/_security -u b62bf565-d36c-45ce-a12d-fc3bd31a256b-bluemix:PASSWORDHERE
```

## Adding a new user

You need to add a `_users` database but hopefully there should already be one.

Then edit the `index.js` script to add the admin password and new user
username/password.

```
$ npm install
$ node index.js
```

In theory that should automatically add the new user but somehow it doesn't seem
to work so just copy the output from the console and add a new document to the
`_users` database using the Cloudant console 

From memory, Cloudant doesn't like you specifying roles that begin with `_` so
you probably need to edit the `roles` part to make it just an empty array.

Then from the Cloudant console go to the permissions section of the database and
add the permissions for the user.
