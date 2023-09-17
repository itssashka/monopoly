import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import AppRouter from "./components/AppRouter";
import './styles/index.scss'
import Footer from "./components/Footer/Footer";
import ScrollTop from "./components/ScrollTop";


function App() {

  return (
    <div className="wrapper">
      
      <BrowserRouter>
        <ScrollTop/>
        <Header/>
        <AppRouter/>   
        <Footer/>     
      </BrowserRouter>
    </div>
  );
}

export default App;
