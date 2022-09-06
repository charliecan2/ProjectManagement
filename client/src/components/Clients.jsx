import { useQuery } from '@apollo/client'
import ClientRow from './ClientRow'
import Spinner from './Spinner'
import { GET_CLIENTS } from '../queries/clientQueries'


function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS)

  if(loading){
    return <Spinner />
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