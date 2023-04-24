import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/HomePage/Home";
import { Provider } from "react-redux";
import store from "./utils/store";
import WatchVideo from "./components/WatchPage/WatchVideo";
import VideoContainer from "./components/HomePage/VideoContainer";
import HomeSection from "./components/ChannelPage/HomeSection";
import VideosSection from "./components/ChannelPage/VideosSection";
import FeatureChannelSection from "./components/ChannelPage/FeatureChannelSection";
import SearchPageShimmer from "./components/SerachResultPage/SearchPageShimmer";
import NotFoundPage from "./NotFoundPage";

const History = lazy(() =>
  import("./components/HistoryWatchLaterPage/History")
);
const WatchLater = lazy(() =>
  import("./components/HistoryWatchLaterPage/WatchLater")
);
const ChannelPage = lazy(() => import("./components/ChannelPage/ChannelPage"));
const SearchVideo = lazy(() =>
  import("./components/SerachResultPage/SearchVideo")
);

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
        element: (
          <Suspense>
            <ChannelPage />
          </Suspense>
        ),
        children: [
          {
            path: "/channel/:id/home",
            element: <HomeSection />,
          },
          {
            path: "/channel/:id/videos",
            element: <VideosSection />,
          },
          {
            path: "/channel/:id/channels",
            element: <FeatureChannelSection />,
          },
        ],
      },
      {
        path: "/watch",
        element: <WatchVideo />,
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<SearchPageShimmer />}>
            <SearchVideo />
          </Suspense>
        ),
      },
      {
        path: "/history",
        element: (
          <Suspense>
            <History />
          </Suspense>
        ),
      },
      {
        path: "/watchLater",
        element: (
          <Suspense>
            <WatchLater />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
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
