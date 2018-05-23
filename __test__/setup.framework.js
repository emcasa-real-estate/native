// Jest `setupFiles` file - Runs before each test, after test framework
import chai from 'chai'

global.jexpect = global.expect
global.expect = chai.expect
