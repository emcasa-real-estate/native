import detox from 'detox'
import pkg from '@/package.json'

jest.setTimeout(60000)

beforeAll(() => detox.init(pkg.detox))

afterAll(() => detox.cleanup())
