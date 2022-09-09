import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectQueries'
import { FaTrash } from 'react-icons/fa'

function Projects() {
  const { error, loading, data } = useQuery(GET_PROJECTS);

  return (
    <div>{!loading && !error && (
      <table className='table table-hover mt-3'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Client</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.projects.map(project => (
            <tr>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.status}</td>
              <td>{project.client.name}</td>
              <td>
                <button className="btn btn-danger btn-sm">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    </div>
  )
}

export default Projects