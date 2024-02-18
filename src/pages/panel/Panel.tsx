// components
import Header from "../../components/header/Header";
import Table from "../../pages/table/Tables";

export default function Panel() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-start items-center">
      <Header />
      <Table />
    </section>
  );
}
