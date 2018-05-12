import detox from 'detox'
import pkg from '@/package.json'

jest.setTimeout(120000)

beforeAll(() => detox.init(pkg.detox))

afterAll(() => detox.cleanup())
