import '../../styles/globals.css';
import Dashboard from '../components/dashboard/Dashboard';
import Clients from '../components/clients/Clients';
import Main from '../components/layout/Main';

const ClientsPage = () => {
  return (
    <div className='flex flex-row justify-start left-0 h-main'>
      <Dashboard />
      <Main>
        <Clients />
      </Main>
    </div>
  );
};

export default ClientsPage;
