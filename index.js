const cradle = require('cradle');
const crypto = require('crypto');

cradle.setup({
  host: 'b62bf565-d36c-45ce-a12d-fc3bd31a256b-bluemix.cloudant.com',
  port: 443,
  cache: false,
  timeout: 5000,
});

const conn = new cradle.Connection({
  secure: true,
  auth: {
    username: 'b62bf565-d36c-45ce-a12d-fc3bd31a256b-bluemix',
    password: 'ADMIN_PASSWORD',
  },
});

const db = conn.database('_users');

function createUser(name, password) {
  return new Promise((resolve, reject) => {
    db.get(name, (err, doc) => {
      if (err && err.error === 'not_found') {
        const [password_sha, salt] = generatePasswordHash(password);
        console.log(
          {
            _id: 'org.couchdb.user:' + name,
            name,
            password_sha,
            salt,
            password_scheme: 'simple',
            type: 'user',
            roles: ['_default', '_reader', '_writer'],
          }
        );
        db.save(
          'org.couchdb.user:' + name,
          {
            name,
            password_sha,
            salt,
            password_scheme: 'simple',
            type: 'user',
            roles: ['_default', '_reader', '_writer'],
          },
          resolve
        );
      } else if (err) {
        reject(err);
      } else {
        reject({ error: 'user_exists' });
      }
    });
  });
}

function generatePasswordHash(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.createHash('sha1');
  hash.update(password + salt);
  return [hash.digest('hex'), salt];
}

createUser('USERNAME', 'USER_PASSWORD')
  .then(() => {
    console.log('Success');
  })
  .catch(err => {
    console.log('Error: ' + JSON.stringify(err));
  });
