import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import { lazy, Suspense } from "react";
import Loading from "./components/loading";
import HomeDetails from "./pages/homedetails";
const Home = lazy(() => import("./pages/home"));
const Business = lazy(() => import("./pages/business"));
const Entertainment = lazy(() => import("./pages/entertainment/index"));
const General = lazy(() => import("./pages/general"));
const Health = lazy(() => import("./pages/health"));
const Science = lazy(() => import("./pages/science"));
const Sports = lazy(() => import("./pages/sports"));
const Technology = lazy(() => import("./pages/technology"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path=":id" element={<HomeDetails />} />
            <Route path="business" element={<Business />} />
            <Route path="entertainment" element={<Entertainment />} />
            <Route path="general" element={<General />} />
            <Route path="health" element={<Health />} />
            <Route path="science" element={<Science />} />
            <Route path="sports" element={<Sports />} />
            <Route path="technology" element={<Technology />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
