import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import About from './pages/About';
import BecomeInstructor from './pages/BecomeInstructor';
import Resources from './pages/Resources';
import Instructors from './pages/Instructors';
import InstructorLogin from './pages/InstructorLogin';
import InstructorDashboard from './pages/InstructorDashboard';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/instructors', label: 'Instructors' },
  { to: '/become-instructor', label: 'Become Instructor' },
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/login', label: 'Instructor Login' },
  { to: '/instructor-dashboard', label: 'Dashboard' },
];

function App() {
  return (
    <div className="app">
      <header>
        <h1>Moto Ohio</h1>
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'active-nav' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/become-instructor" element={<BecomeInstructor />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/login" element={<InstructorLogin />} />
          <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
