process.env.JWT_SECRET = 'test-jwt-secret'

const { expect } = require('chai')
const supertest = require('supertest')
require('dotenv').config()

global.expect = expect
global.supertest = supertest