import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import Spinner from './Spinner';

function AddProjectModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('New');

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    // Variables we will be passing into addProject
    variables: { name, description, status, clientId },

    // addProject will return to us the data from addProject mutation
    update(cache, { data: { addProject }}){
      // Reading the cache from GET_CLIENTS
      const { projects } = cache.readQuery({ query: GET_PROJECTS });

      cache.writeQuery({
        query: GET_PROJECTS,
        // Here, we're writing onto the clients from GET_CLIENTS
        data: { projects: [...projects, addProject]}
      })
    }
  })

  const submitProject = (e) => {
    e.preventDefault();

    if(name === '' || description === '' || status === '' || clientId === ''){
      return alert('Please fill in all fields');
    }

    addProject(name, description, status, clientId);

    setName('');
    setDescription('');
    setStatus('New');
    setClientId('');
  }

  if(loading) return <Spinner />

  if(error) return "Something went wrong"

  return (
    <>
      {!loading && !error && (
      <>
        <button onClick={() => {}} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
          <div className="d-flex align-items-center">
            <FaList className='icon' />
            <div>New Project</div>
          </div>
        </button>
        
        {data.clients.length === 0 ?
        <div className="modal fade" id="addProjectModal" tabIndex="-1" aria-labelledby="addProjectModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addProjectModalLabel">No Clients Found</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>To begin, please add a Client first before starting a Project.</p>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        <div className="modal fade" id="addProjectModal" tabIndex="-1" aria-labelledby="addProjectModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addProjectModalLabel">Add Project</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={submitProject}>
                  <div className="mb-3">
                    <label className='from-label'>
                      Name
                    </label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <label className='from-label'>
                      Description
                    </label>
                    <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                  </div>
                  <div className="mb-3">
                    <label className='form-label'>
                      Status
                    </label>
                    <select className='form-select' id="status" value={status} onChange={(e)=> setStatus(e.target.value)}>
                      <option value="New">Not Started</option>
                      <option value="Ongoing">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className='form-label'>
                      Client
                    </label>
                    <select className='form-select' id="clientId" value={clientId} onChange={(e)=> setClientId(e.target.value)}>
                      <option value="">Select Client</option>
                      {data.clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Submit</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                  </div>
                </form>
              </div>
              
            </div>
          </div>
        </div>
        }
      </>
      )}
    </>
    
    
  )
}

export default AddProjectModal