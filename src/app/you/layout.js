import Header from "@/components/Header";
import YouLayoutGrid from "@/components/layouts/YouLayoutGrid";

function YouLayout({ children }) {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-30">
        <Header />
      </div>
      <YouLayoutGrid>{children}</YouLayoutGrid>
    </div>
  );
}

export default YouLayout;
