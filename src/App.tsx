import { AppStateProvider } from './context/appState';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import bRoutes from './routes/routeConfig';
import { ModalFactory } from './components/Modals/modalFactory';

function App() {
  return (
    <>
      <AppStateProvider>
        <Router>
          <Routes>
            {bRoutes.map(({ name, path, component }) => {
              return <Route path={path} Component={component} key={name} />;
            })}
          </Routes>
          <ModalFactory />
        </Router>
      </AppStateProvider>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </>
  );
}

export default App;
