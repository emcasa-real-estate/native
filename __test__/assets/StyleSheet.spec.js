import _ from 'lodash'
import {View} from 'react-native'
import renderer from 'react-test-renderer'

import StyleSheet from '@/assets/StyleSheet'
import {styleId} from '@/assets/StyleSheet/flatten'

const STYLES = {
  foo: {
    position: 'relative',
    ':foo': {height: 200},
    ':bar': {width: 200}
  },
  bar: {
    position: 'absolute',
    ':test=foo': {height: 200},
    ':test=bar': {width: 200}
  }
}

const FLAT_STYLES = {
  foo: _.omit(STYLES.foo, [':foo', ':bar']),
  foo__foo: STYLES.foo[':foo'],
  foo__bar: STYLES.foo[':bar'],
  bar: _.omit(STYLES.bar, [':test=foo', ':test=bar']),
  bar__foo: STYLES.bar[':test=foo'],
  bar__bar: STYLES.bar[':test=bar']
}

describe('StyleSheet', () => {
  const $styles = StyleSheet(STYLES)

  it('contains flat stylesheet properties', () => {
    expect($styles.foo).to.eql(FLAT_STYLES.foo)
    expect($styles.bar).to.eql(FLAT_STYLES.bar)
    expect($styles[styleId('foo', 'foo')]).to.eql(FLAT_STYLES.foo__foo)
    expect($styles[styleId('foo', 'bar')]).to.eql(FLAT_STYLES.foo__bar)
  })

  it('returns a stylesheet with desired variants', () => {
    expect($styles({foo: true, bar: true})).to.eql({
      foo: [FLAT_STYLES.foo, FLAT_STYLES.foo__foo, FLAT_STYLES.foo__bar],
      bar: [FLAT_STYLES.bar]
    })
  })

  it('ignores falsy values', () => {
    expect($styles({foo: true, bar: false})).to.eql({
      foo: [FLAT_STYLES.foo, FLAT_STYLES.foo__foo],
      bar: [FLAT_STYLES.bar]
    })
  })

  it('matches selectors by value', () => {
    expect($styles({test: 'foo'})).to.eql({
      foo: [FLAT_STYLES.foo],
      bar: [FLAT_STYLES.bar, FLAT_STYLES.bar__foo]
    })
  })

  describe('#get', () => {
    it('returns a style with desired variants', () => {
      expect($styles.get('foo')).to.have.lengthOf(1)
      expect($styles.get('foo', {foo: true})).to.have.lengthOf(2)
      expect($styles.get('foo', {foo: true, bar: true})).to.have.lengthOf(3)
    })
  })

  describe('#inject', () => {
    const Target = ({styles}) => <View style={styles.foo} />
    const mapStyles = (props) => ({bar: props.value === 'bar', ...props})
    const Component = $styles.inject(mapStyles)(Target)

    it('extracts variants from props', () => {
      const node = renderer.create(<Component foo />).toJSON()
      expect(node.props.style).to.eql([FLAT_STYLES.foo, FLAT_STYLES.foo__foo])
    })

    it('maps props to style variants', () => {
      const node = renderer.create(<Component value="bar" />).toJSON()
      expect(node.props.style).to.eql([FLAT_STYLES.foo, FLAT_STYLES.foo__bar])
    })

    it('merges "styles" props into final stylesheet', () => {
      const moreStyles = {foo: {flex: 1}}
      const node = renderer
        .create(<Component bar styles={moreStyles} />)
        .toJSON()
      expect(node.props.style).to.eql([
        FLAT_STYLES.foo,
        FLAT_STYLES.foo__bar,
        moreStyles.foo
      ])
    })
  })

  describe('#all', () => {
    it('concatenates stylesheets', () => {
      const moreStyles = {foo: {flex: 1}}
      expect($styles.all('foo', 'bar')).to.eql([
        FLAT_STYLES.foo,
        FLAT_STYLES.bar
      ])
      expect($styles.all('foo', moreStyles.foo)).to.eql([
        FLAT_STYLES.foo,
        moreStyles.foo
      ])
    })
  })
})
