process.env.JWT_SECRET = 'test-jwt-secret'
process.env.JWT_EXPIRY = '10s'

const { expect } = require('chai')
const supertest = require('supertest')
require('dotenv').config()

global.expect = expect
global.supertest = supertest