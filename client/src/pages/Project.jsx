import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries'

function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
  variables: { id}});


  if(error){
    return <p>Something went wrong</p>
  }

  if(loading){
    return <Spinner />
  }

  return (
    <div>Project</div>
  )
}

export default Project