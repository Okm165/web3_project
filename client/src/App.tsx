import { Component } from 'solid-js';
import { Footer, Loader, Navbar, Services, Transactions, Welcome } from "./components";

const App: Component = () => {
  return (
    <div class="min-h-screen">
      <div class="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
};

export default App;
