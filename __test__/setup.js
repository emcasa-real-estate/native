import fs from 'fs'
import path from 'path'

const MOCKS_DIR = path.resolve(__dirname, '../__mocks__')

jest.mock('react-dom/server', () => {}, {virtual: true})

// Setup node_modules mocks manually
fs.readdirSync(MOCKS_DIR).map((filename) => {
  jest.mock(filename.replace(/\.[^/.]+$/, ''))
})
