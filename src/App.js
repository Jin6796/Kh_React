import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HackerNews from "./components/HackerNews";
import HackerNewsReple from "./components/HackerNewsReple";
import "bootstrap/dist/css/bootstrap.min.css";
import DeptList from "./components/DeptList";

const App = ({ authLogic, pictureUpload }) => {
  return (
    <>
      <Routes>
        <Route path="/" 
                exact={true} 
                element={<LoginPage authLogic={authLogic} />} 
        />
        <Route path="/dept" 
                exact={true} 
                element={<DeptList authLogic={authLogic} pictureUpload={pictureUpload} />}
        />
        <Route path="/hackernews/:userId" 
                exact={true} 
                element={<HackerNews authLogic={authLogic} pictureUpload={pictureUpload} />}
        />
        <Route path="/newsreple/:id" 
                exact={true} 
                element={<HackerNewsReple />}
        />
      </Routes>
    </>
  );
}

export default App;
