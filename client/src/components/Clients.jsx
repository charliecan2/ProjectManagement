import { gql, useQuery } from '@apollo/client'
import ClientRow from './ClientRow'

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`

function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS)

  if(loading){
    return <p>Loading...</p>
  }

  if(error){
    return<p>Something went wrong</p>
  }

  return (
    <div>{!loading && !error && (
      <table className='table table-hover mt-3'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.clients.map(client => (
            <ClientRow client={client} />
          ))}
        </tbody>
      </table>
    )}</div>
  )
}

export default Clients