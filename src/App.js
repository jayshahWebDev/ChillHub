import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import { Provider } from "react-redux";
import store from "./utils/store";
import ChannelPage from "./components/ChannelPage";
import WatchVideo from "./components/WatchVideo";
import VideoContainer from "./components/VideoContainer";

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
