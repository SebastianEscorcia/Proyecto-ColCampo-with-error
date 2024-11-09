import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        Pera
        
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
