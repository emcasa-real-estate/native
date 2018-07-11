import gql from 'graphql-tag'

export default Object.assign(
  gql`
    fragment Image on Image {
      position
      filename
      description
      isActive
    }
  `,
  {
    parse: (image) => ({
      ...image,
      __typename: 'Image'
    })
  }
)
