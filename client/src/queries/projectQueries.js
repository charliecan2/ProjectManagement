import { gql } from '@apollo/client'

const GET_PROJECTS = gql`
  query getProjects{
    projects {
      id
      name
      description
      status
      client {
        name
      }
    }
  }
`

export { GET_PROJECTS }