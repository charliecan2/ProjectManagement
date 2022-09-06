import { gql, useQuery } from '@apollo/client'

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
            <tr>
              <th>{client.name}</th>
              <th>{client.email}</th>
              <th>{client.phone}</th>
              <th>x</th>
            </tr>
          ))}
        </tbody>
      </table>
    )}</div>
  )
}

export default Clients