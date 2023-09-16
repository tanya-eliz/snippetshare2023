import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './theme/Theme';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import SnippetsPage from './pages/SnippetsPage/SnippetsPage';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={Theme}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/snippets" element={<SnippetsPage />} />
        </Routes>
      </ThemeProvider>
    
    </BrowserRouter>
  );
}

export default App;
