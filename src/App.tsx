import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';

export function App() {
  return (
    <>
      <div className="frame" aria-hidden="true">
        <div className="frame-edge top" />
        <div className="frame-edge bottom" />
      </div>
      <Nav />
      <main>
        <Hero />
        <div className="shell">
          <About />
          <Projects />
        </div>
      </main>
      <Footer />
    </>
  );
}
