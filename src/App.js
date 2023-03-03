import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/HomePage/Home"
import { Provider } from "react-redux";
import store from "./utils/store";
import ChannelPage from "./components/ChannelPage/ChannelPage";
import WatchVideo from "./components/WatchPage/WatchVideo";
import VideoContainer from "./components/HomePage/VideoContainer";
import SearchVideo from "./components/SearchVideo";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <VideoContainer />,
      },
      {
        path: "/channel/:id",
        element: <ChannelPage />,
      },
      {
        path: "/watch",
        element: <WatchVideo />,
      },
      {
        path: "/search",
        element: <SearchVideo />,
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <>
        <RouterProvider router={appRouter}></RouterProvider>
      </>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
