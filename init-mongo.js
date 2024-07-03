// Switch to the 'user-account' database
db = db.getSiblingDB('user-account');

// Create the 'users' collection
db.createCollection('users');

// Create the 'admin' user with the specified roles
db.createUser({
  user: 'admin',
  pwd: 'password',
  roles: [
    { role: 'readWrite', db: 'user-account' },
    { role: 'dbAdmin', db: 'user-account' }
  ]
});

// Insert the initial document into the 'users' collection
db.users.insertOne({
  userId: 1,
  email: 'mm.nazmul@brainstation-23.com',
  interests: 'Sleeping Dogs',
  name: 'Nazmul Hossain'
});
