import Clients from "../components/Clients";
import AddClientsModal from "../components/AddClientModal";
import Projects from "../components/Projects";
import AddProjectModal from "../components/AddProjectModal";

function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4 mt-3">
        <AddClientsModal />
        <AddProjectModal />
      </div>
      <Clients />
      <Projects />
    </>
  )
}

export default Home