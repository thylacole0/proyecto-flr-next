const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(user_id) {
  const payload = {
    user: user_id,
  };

  const secret = process.env.jwtsecret;

  if(!secret) throw new Error('JWT_SECRET must be defined');

  return jwt.sign(payload, secret, { expiresIn: '1hr' });
}

module.exports = jwtGenerator;