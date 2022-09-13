import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectQueries'
import ProjectCard from './ProjectCard';
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
      <div className='row mt-4'>
        { data.projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    ) : (
      <div>No Projects to display</div>
    )}
    </div>
  )
}

export default Projects