import { EthProvider } from "./contexts/EthContext";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./Home";
import BorrowerPage from "./Borrower";
import LenderPage from "./Lender";
import Admin from "./Admin";
import Signup from "./Signup";

function App() {
  return (
    <EthProvider>
      <Router>
        <div id="App">
          <div className="container">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/borrower" element={<BorrowerPage />} />
              <Route path="/lender" element={<LenderPage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>

            
            <Footer />
          </div>
        </div>
      </Router>
    </EthProvider>
  );
}

export default App;
