import {ApolloLink, Observable} from 'apollo-link'

export const withQueryResolver = (transforms) => {
  const watchedQueries = Object.keys(transforms)
  return new ApolloLink((operation, forward) => {
    if (!(operation.query && watchedQueries.includes(operation.operationName)))
      return forward(operation)
    return new Observable((observer) => {
      const sub = forward(operation).subscribe({
        next: (result) => {
          result.data = transforms[operation.operationName](
            result.data,
            operation
          )
          observer.next(result)
        },
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer)
      })
      return () => {
        if (sub) sub.unsubscribe()
      }
    })
  })
}
