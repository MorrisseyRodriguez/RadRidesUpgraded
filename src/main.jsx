import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import CarDetail from './components/CarDetail.jsx'
import Layout from './components/Layout.jsx'
import FAQ from './components/FAQ.jsx'
import About from './components/About.jsx'
import OtherRentals from './components/OtherRentals.jsx'
import RequestCar from './components/RequestCar.jsx'
import PrivacyPolicy from './components/PrivacyPolicy.jsx'
import InsurancePolicy from './components/InsurancePolicy.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import { carsData } from './data/cars.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Layout />
      </>
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/cars/:carId",
        element: <CarDetail />,
        loader: ({ params }) => {
          const car = carsData[params.carId];
          if (!car) {
            throw new Error('Car not found');
          }
          return car;
        },
      },
      {
        path: "/faqs",
        element: <FAQ />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/other-rentals",
        element: <OtherRentals />,
      },
      {
        path: "/request-car",
        element: <RequestCar />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/insurance-policy",
        element: <InsurancePolicy />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)