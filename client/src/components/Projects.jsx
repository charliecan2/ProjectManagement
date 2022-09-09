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
            <ProjectRow key={project.id} project={project}/>
          ))}
        </tbody>
      </table>
    )}
    </div>
  )
}

export default Projects