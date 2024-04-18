import Navbar from "./Navbar";
import Chart from "./Chart";
import Sidebar from "./Sidebar";

export default function GridLayout() {
  return (
    <main className=" grid gridLayout h-screen">
      <Navbar />
      <Chart />
      <Sidebar />
    </main>
  );
}
