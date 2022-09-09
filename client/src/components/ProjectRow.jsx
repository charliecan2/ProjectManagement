import { FaTrash } from 'react-icons/fa'

function ProjectRow({ project }) {
  const { name, description, status, client } = project;

  return (
    <tr>
      <td>{name}</td>
      <td>{description}</td>
      <td>{status}</td>
      <td>{client.name}</td>
      <td>
        <button className="btn btn-danger btn-sm">
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}

export default ProjectRow