import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useHashRoute } from './hooks/useHashRoute';

export function App() {
  const route = useHashRoute();
  const isContact = route === '/contact';

  return (
    <>
      <div className="frame" aria-hidden="true">
        <div className="frame-edge top" />
        <div className="frame-edge bottom" />
      </div>
      <Nav />
      <main>
        {isContact ? (
          <Contact />
        ) : (
          <>
            <Hero />
            <div className="shell">
              <About />
              <Projects />
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
