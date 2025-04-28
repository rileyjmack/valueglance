import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="p-4">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
        <p className="text-xl">
          Please choose a chart or table to view the data.
        </p>
      </div>
    </div>
  );
}
