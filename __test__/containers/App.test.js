import renderer from 'react-test-renderer'

jest.mock('@/redux')
jest.mock('@/lib/graphql/links')

import Provider from '@/containers/Provider'
import App from '@/containers/App'

describe('containers/App', () => {
  it('renders without crashing', () => {
    const node = renderer.create(
      <Provider>
        <App />
      </Provider>
    )
    expect(node.getInstance()).to.be.ok
  })
})
