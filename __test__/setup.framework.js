// Jest `setupTestFrameworkScriptFile` file - Runs before each test case
import chai from 'chai'

global.jexpect = global.expect
global.expect = chai.expect
