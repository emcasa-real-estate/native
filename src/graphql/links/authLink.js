import _ from 'lodash'
import {ApolloLink} from 'apollo-link'
import {cloneDeep, hasDirectives} from 'apollo-utilities'

// Maps all directives in a graphql query document with `fun`
const mapDirectives = (doc, fun) => {
  const nextDoc = cloneDeep(doc)
  nextDoc.definitions.forEach((definition) => {
    if (!definition.selectionSet || !definition.selectionSet.selections) return
    definition.selectionSet.selections.forEach((selection) => {
      if (selection.directives)
        selection.directives = selection.directives.map(fun).filter(_.identity)
    })
  })
  return nextDoc
}

const DIRECTIVE_NAME = 'clientAuth'

// Directs queries to cache or backend depending on auth state
export default () =>
  new ApolloLink((op, forward) => {
    if (!hasDirectives([DIRECTIVE_NAME], op.query)) return forward(op)
    const {authenticated} = op.getContext()
    op.query = mapDirectives(op.query, (directive) => {
      if (directive.name.value !== DIRECTIVE_NAME) return directive
      if (authenticated) return null
      else
        return {
          ...directive,
          name: {value: 'client', kind: 'Name'},
          arguments: []
        }
    })
    return forward(op)
  })
