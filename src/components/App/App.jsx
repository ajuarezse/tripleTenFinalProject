import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import About from "../About/About";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ItemModal from "../ItemModal/ItemModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [likedSongs, setLikedSongs] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);

  const navigate = useNavigate();

  const handleCardClick = (song) => {
    setSelectedSong(song);
    setActiveModal("view");
  };
  const handleRegisterModal = (e) => {
    e.preventDefault();
    setActiveModal("register");
  };

  const handleLoginModal = (e) => {
    e.preventDefault();
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedSong(null);
  };

  const handleEscape = useCallback((e) => {
    if (e.key === "Escape") {
      closeActiveModal();
    }
  }, []);

  const handleBookmarkSaved = (songId) => {
    setLikedSongs((prev) => ({
      ...prev,
      [songId]: !prev[songId],
    }));
  };

  useEffect(() => {
    if (activeModal) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeModal, handleEscape]);

  const handleOverlayClick = (e, modalContentRef) => {
    if (modalContentRef && !modalContentRef.contains(e.target)) {
      closeActiveModal();
    }
  };

  const handleSignUp = () => {
    //temp for simulating login
    //todo: pass real user objects for backend stage
    setCurrentUser(true);
    closeActiveModal();
  };

  const handleLogIn = () => {
    //temp for simulating login
    //todo: pass real user objects for backend stage
    setCurrentUser(true);
    closeActiveModal();
  };

  const handleLike = (id) => {
    setLikedSongs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLogOut = () => {
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <div className="app__content">
            <Header
              handleRegisterModal={handleRegisterModal}
              handleLoginModal={handleLoginModal}
              handleLogOut={handleLogOut}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    handleCardClick={handleCardClick}
                    likedSongs={likedSongs}
                    onLike={handleLike}
                  />
                }
              />
              <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
          </div>

          <ItemModal
            onClose={closeActiveModal}
            activeModal={activeModal}
            song={selectedSong}
            likedSongs={likedSongs}
            handleBookmarkSaved={handleBookmarkSaved}
            handleOverlayClick={handleOverlayClick}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onSignUp={handleSignUp}
            handleLoginModal={handleLoginModal}
            handleOverlayClick={handleOverlayClick}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            handleRegisterModal={handleRegisterModal}
            onLogIn={handleLogIn}
            handleOverlayClick={handleOverlayClick}
          />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
