import MatrixCalculator from "@/components/MatrixCalculator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col md:text-2xl items-center px-2 py-3 font-bold text-blue-500">
      <h1 className="lg:text-4xl mb-5">Matrix Calculator</h1>
      <MatrixCalculator />
    </main>
  );
}
