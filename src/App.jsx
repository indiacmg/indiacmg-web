import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaChess,
  FaTrophy,
  FaUsers,
  FaGraduationCap,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function App() {
  const targetDate = new Date("2026-04-01T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_number: "",
    message: "Hey I'm interested in your upcoming project/initiative"
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    contact_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ show: false, type: '', message: '' });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => !phone || /^[0-9]{10}$/.test(phone);
  const validateName = (name) => name.trim().length >= 2;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { name: "", email: "", contact_number: "" };

    if (!validateName(formData.name))
      newErrors.name = "Name must be at least 2 characters";
    if (!validateEmail(formData.email))
      newErrors.email = "Invalid email address";
    if (!validatePhone(formData.contact_number))
      newErrors.contact_number = "Phone must be 10 digits";

    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;

    setLoading(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID_CONTACT,
        {
          name: formData.name,
          email: formData.email,
          contact_number: formData.contact_number || "Not provided",
          message: formData.message,
        },
        import.meta.env.VITE_EMAIL_PUBLIC_KEY,
      );

      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID_AUTOREPLY,
        { name: formData.name, title: "", email: formData.email },
        import.meta.env.VITE_EMAIL_PUBLIC_KEY,
      );

      setModal({ show: true, type: 'success', message: "Thank you! We'll get back to you soon." });
      setFormData({ name: "", email: "", contact_number: "", message: "Hey I'm interested in your upcoming project/initiative" });
    } catch (error) {
      console.error('Email send error:', error);
      setModal({ show: true, type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const pieces = ["♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛"];
  const [positions] = useState(() =>
    Array.from({ length: 25 }, (_, i) => ({
      top: Math.random() * 90,
      left: Math.random() * 90,
      size: ["text-6xl", "text-7xl", "text-8xl", "text-9xl"][
        Math.floor(Math.random() * 4)
      ],
      piece: pieces[Math.floor(Math.random() * pieces.length)],
      delay: i % 2 === 0,
    })),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#083C5D] via-[#0a4d75] to-[#083C5D] text-white relative overflow-hidden">
      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setModal({ show: false, type: '', message: '' })}>
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              {modal.type === 'success' ? (
                <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
              ) : (
                <FaTimesCircle className="text-6xl text-red-500 mx-auto mb-4" />
              )}
              <h3 className={`text-2xl font-bold mb-2 ${modal.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {modal.type === 'success' ? 'Success!' : 'Error!'}
              </h3>
              <p className="text-gray-700 mb-6">{modal.message}</p>
              <button
                onClick={() => setModal({ show: false, type: '', message: '' })}
                className="px-6 py-2 bg-gradient-to-r from-[#083C5D] to-[#0a4d75] text-white rounded-lg hover:scale-105 transition-transform"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-gradient-to-bl from-cyan-300/15 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-400/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 left-20 w-[250px] h-[250px] bg-gradient-to-tr from-blue-300/15 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-[200px] h-[200px] bg-gradient-to-br from-cyan-500/12 to-transparent rounded-full blur-xl"></div>
      <div className="absolute top-2/3 right-1/4 w-[350px] h-[350px] bg-gradient-to-tl from-blue-400/15 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute top-10 left-1/3 w-[150px] h-[150px] bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-1/3 w-[180px] h-[180px] bg-gradient-to-tr from-blue-500/12 to-transparent rounded-full blur-xl"></div>

      {/* Animated Chess Pieces Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {positions.map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos.size} ${pos.delay ? "animate-float-delayed" : "animate-float"} transition-all duration-1000`}
            style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
          >
            {pos.piece}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto mb-4 px-4">
          <img
            src="/indiaCmgLogo.png"
            alt="India Chess Mind Group - Premier Chess Platform"
            className="w-40 md:w-56 rounded-full mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 -mt-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Title */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent leading-tight">
              India Chess Mind Group
            </h1>
            <p className="text-xl md:text-3xl font-light bg-gradient-to-r from-gray-200 to-blue-200 bg-clip-text text-transparent">
              India's Premier Chess Platform
            </p>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Connecting chess enthusiasts, players, coaches, and academies across
            India. Discover tournaments, coaching, scholarships, and grow your
            chess journey with us.
          </p>

          {/* Countdown Timer */}
          <div className="py-8">
            <p className="text-sm md:text-base text-gray-400 mb-4 uppercase tracking-widest">
              Launching In
            </p>
            <div className="flex justify-center gap-3 md:gap-6">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Minutes" },
                { value: timeLeft.seconds, label: "Seconds" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white/10 to-blue-500/10 backdrop-blur-md border border-white/20 rounded-xl p-4 md:p-6 min-w-[70px] md:min-w-[100px] hover:from-white/20 hover:to-blue-500/20 transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  <div className="text-3xl md:text-5xl font-bold text-white">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-xs md:text-sm text-gray-300 mt-2 uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-8">
            {[
              { icon: FaChess, text: "Tournaments" },
              { icon: FaGraduationCap, text: "Academy" },
              { icon: FaTrophy, text: "Scholarships" },
              { icon: FaUsers, text: "Community" },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/5 to-blue-500/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 md:p-6 hover:from-white/10 hover:to-blue-500/10 transition-all duration-300 hover:scale-105 group"
              >
                <feature.icon className="text-3xl md:text-4xl mx-auto mb-2 text-gray-300 group-hover:text-white transition-colors" />
                <p className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>

          {/* Get Notified Form */}
          <div className="pt-6">
            <p className="text-gray-400 text-sm md:text-base mb-6 text-center">
              Stay updated! Get notified when we launch.
            </p>
            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto space-y-5 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-lg"
            >
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name *"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email *"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type="tel"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  placeholder="Contact Number (Optional)"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                />
                {errors.contact_number && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.contact_number}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#ffff] text-[#083C5D] font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Notify Me"}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-black/30 backdrop-blur-md border-t border-white/10 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm mx-auto text-gray-400">
              © 2026 India Chess Mind Group. All rights reserved.
            </div>
            {/* <div className="flex gap-6">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform"
              >
                <FaInstagram className="text-2xl" />
              </a>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
