import { FaTrash } from 'react-icons/fa'
import { DELETE_PROJECT } from '../mutations/projectMutations'
import { useMutation } from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectQueries';

function ProjectRow({ project }) {
  const { name, description, status, client } = project;

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: {id: project.id},

    update(cache, { data: { deleteProject }}){
      // Here, we're getting the projects data from the GET_PROJECTS query. We'll use this data to filter by id
      const { projects } = cache.readQuery({
        query: GET_PROJECTS
      });

      // Now, we'll write over the GET_PROJECTS query and replace the data by filtering through the projects by id
      // All Projects, but the one with the id we're deleting, get returned and are written over the exisiting data
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: projects.filter(project => project.id !== deleteProject.id)}
      })
    }
  })

  return (
    <tr>
      <td>{name}</td>
      <td>{description}</td>
      <td>{status}</td>
      <td>{client.name}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteProject}>
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}

export default ProjectRow