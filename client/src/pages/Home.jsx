import Clients from "../components/Clients";
import AddClientsModal from "../components/AddClientModal";
import Projects from "../components/Projects";

function Home() {
  return (
    <>
      <Clients />
      <div className="d-felx gap-3 mb-4">
        <AddClientsModal />
      </div>
      <Projects />
    </>
  )
}

export default Home