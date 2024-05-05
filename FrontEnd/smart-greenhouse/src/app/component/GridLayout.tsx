import Navbar from "./Navbar";
import ChartSection from "./ChartSection";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";

export default function GridLayout() {
  return (
    <>
      <main className=" md:grid gridLayout md:h-screen md:items-stretch md:justify-stretch flex flex-col items-center justify-center">
        <Navbar />
        <ChartSection />
        <Sidebar />
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: "",
            duration: 5000,
            style: {
              background: "#22c55e",
              color: "#fff",
            },

            success: {
              duration: 3000,
            },
          }}
        />
      </main>
    </>
  );
}
