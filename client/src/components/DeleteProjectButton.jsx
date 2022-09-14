import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client'
import { FaTrash } from 'react-icons/fa'
import { DELETE_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries'

function DeleteProjectButton({ project }) {
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: {id: project.id},

    update(cache, {data: {deleteProject}}){
      const { projects } = cache.readQuery({ query: GET_PROJECTS});

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: projects.filter(project => project.id !== deleteProject.id)}
      })
    }
  })

  return (
    <div className='d-flex mt-4 ms-auto'>
      <Link to="/" type="button" className='btn btn-danger' onClick={deleteProject}>
        <FaTrash /> Delete Project
      </Link>
    </div>   
  )
}

export default DeleteProjectButton