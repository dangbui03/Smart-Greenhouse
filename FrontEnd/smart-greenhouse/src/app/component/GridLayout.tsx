import Navbar from "./Navbar";
import ChartSection from "./ChartSection";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";

export default function GridLayout() {
  return (
    <main className=" grid gridLayout h-screen">
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
  );
}
