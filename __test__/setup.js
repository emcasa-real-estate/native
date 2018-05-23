// Jest `setupFiles` file - Runs before each test, before test framework
import fs from 'fs'
import path from 'path'

const MOCKS_DIR = path.resolve(__dirname, '../__mocks__')

jest.mock('react-dom/server', () => {}, {virtual: true})

fs.readdirSync(MOCKS_DIR).map((filename) => {
  jest.mock(filename.replace(/\.[^/.]+$/, ''))
})
