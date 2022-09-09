import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectQueries'
import ProjectRow from './ProjectRow';
import Spinner from './Spinner';

function Projects() {
  const { error, loading, data } = useQuery(GET_PROJECTS);

  if(loading){
    return(
      <Spinner />
    )
  }

  if(error){
    return(
      <p>Something Went Wrong</p>
    )
  }

  return (
    <div>{!loading && !error && data.projects.length > 0 ? (
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
            <ProjectRow key={project.id} project={project}/>
          ))}
        </tbody>
      </table>
    ) : (
      <div>No Projects to display</div>
    )}
    </div>
  )
}

export default Projects