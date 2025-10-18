import Footer from "./components/Footer";
import Form from "./components/Form";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col pb-24">
        <Navbar />
        <Form />
        <Footer />
      </div>
    </>
  );
}

export default App;
