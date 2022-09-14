import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'

function AddClientsModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [addClient] = useMutation(ADD_CLIENT, {
    // Variables we will be passing into addClient
    variables: { name, email, phone },

    // addClient will return to us the data from addClient mutation
    update(cache, { data: { addClient }}){
      // Reading the cache from GET_CLIENTS
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        // Here, we're writing onto the clients from GET_CLIENTS
        data: { clients: [...clients, addClient]}
      })
    }
  })

  const submitClient = (e) => {
    e.preventDefault();

    if(name === '' || email === '' || phone === ''){
      return alert('Please fill in all fields');
    }

    addClient(name, email, phone);

    setName('');
    setEmail('');
    setPhone('');
  }

  return (
    <div>
      <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModal">
        <div className="d-flex align-items-center">
          <FaUser className='icon' />
          <div>Add Client</div>
        </div>
      </button>

      <div className="modal fade" id="addClientModal" tabIndex="-1" aria-labelledby="addClientModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">Add Client</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitClient}>
                <div className="mb-3">
                  <label className='from-label'>
                    Name
                  </label>
                  <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label className='from-label'>
                    Email
                  </label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label className='from-label'>
                    Phone
                  </label>
                  <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div className="modal-footer">
                  <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Submit</button>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
              </form>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddClientsModal