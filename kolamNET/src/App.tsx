import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Workspace from "./pages/Workspace";
import NotFound from "./pages/NotFound";
import DevModeNotice from "./components/DevModeNotice";

const App = () => (
  <BrowserRouter>
    <DevModeNotice />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/workspace" element={<Workspace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
