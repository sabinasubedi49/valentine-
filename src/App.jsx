import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import './App.css'

const containerVariants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0 }
};

const EntryScene = ({ setCurrentLevel, sparkles }) => (
  <motion.div
    key="entry"
    variants={containerVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="love-container"
  >
    {sparkles.map(sparkle => (
      <div
        key={sparkle.id}
        className="sparkle"
        style={{
          left: `${sparkle.left}%`,
          top: `${sparkle.top}%`,
          animationDelay: `${sparkle.delay}s`
        }}
      />
    ))}
    <motion.div
      className="portal-door"
      onClick={() => setCurrentLevel('wheel')}
    >
      <span style={{ fontSize: '4rem' }}>💕</span>
    </motion.div>
    <h1 className="title-text">Welcome, Aayushi 💕</h1>
    <p className="subtitle-text">You've officially entered a place where feelings exist…</p>
    <button
      className="love-button"
      onClick={() => setCurrentLevel('wheel')}
    >
      Step Inside 💫
    </button>
  </motion.div>
);

const WheelLevel = ({ setCurrentLevel, wheelRotation, spinWheel }) => (
  <motion.div
    key="wheel"
    variants={containerVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="love-container"
  >
    <h2 className="title-text">Wheel of Destiny</h2>
    <div className="wheel-container">
      <div className="wheel-pointer" />
      <div className="wheel" style={{ transform: `rotate(${wheelRotation}deg)` }} />
    </div>
    <button className="love-button" onClick={spinWheel}>
      Spin to Start! 🎡
    </button>
  </motion.div>
);

const QuestionLevel = ({ handleYesClick, handleNoButtonHover, handleNoButtonClick, noButtonPosition }) => (
  <motion.div
    key="question"
    variants={containerVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="love-container"
  >
    <h2 className="title-text">Aayushi, will you be my Valentine? 💘</h2>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
      <button
        className="love-button"
        onClick={handleYesClick}
      >
        YES 💖
      </button>
      <motion.button
        className="love-button no-button"
        onMouseEnter={handleNoButtonHover}
        onClick={handleNoButtonClick}
        animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        NO 🙈
      </motion.button>
    </div>
  </motion.div>
);

const CelebrationLevel = ({ showConfetti, setCurrentLevel }) => (
  <motion.div
    key="celebration"
    variants={containerVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="love-container"
  >
    {showConfetti && <Confetti recycle={true} numberOfPieces={200} gravity={0.15} />}

    <h1 className="celebration-text">SHE SAID YES! 💖</h1>
    <h2 className="title-text">The universe is smiling.</h2>
    <div className="achievement">🏆 Official Valentine Unlocked 💘</div>

    <div style={{ marginTop: '2rem' }}>
      <button className="love-button" onClick={() => setCurrentLevel('rewards')}>
        Open Surprise 🎁
      </button>
    </div>
  </motion.div>
)

const RewardsLevel = ({ setCurrentLevel }) => (
  <motion.div
    key="rewards"
    variants={containerVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="love-container"
  >
    <h2 className="title-text">Secret Rewards 🎁</h2>

    <div className="love-letter">
      <p>
        Dear Aayushi,<br /><br />
        You've made this the most wonderful Valentine's Day ever!
        Your smile lights up my world.<br /><br />
        Thank you for being amazing!<br /><br />
        Forever yours, 💕
      </p>
    </div>

    <div className="polaroid-container">
      <div className="polaroid">
        <div style={{ height: '120px', background: 'linear-gradient(45deg, #ff69b4, #ff1493)', borderRadius: '10px' }} />
        <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Perfect Moment</p>
      </div>
      <div className="polaroid">
        <div style={{ height: '120px', background: 'linear-gradient(45deg, #4361ee, #4cc9f0)', borderRadius: '10px' }} />
        <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Magic Time</p>
      </div>
    </div>

    <button className="love-button" onClick={() => setCurrentLevel('ending')}>
      Final Message 💞
    </button>
  </motion.div>
)

const EndingLevel = () => (
  <motion.div
    key="ending"
    variants={containerVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="love-container"
  >
    <h2 className="title-text">This website will self-destruct...</h2>
    <h3 className="subtitle-text" style={{ color: 'var(--primary-pink)' }}>but our bond won't 💖</h3>

    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
      <button className="love-button" onClick={() => window.location.reload()}>
        Replay 💞
      </button>
      <button className="love-button" style={{ background: 'var(--accent-blue)' }} onClick={() => alert('Moment Captured! 📸')}>
        Save 📸
      </button>
    </div>
  </motion.div>
)

function App() {
  const [currentLevel, setCurrentLevel] = useState('entry')
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [showConfetti, setShowConfetti] = useState(false)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [countdown, setCountdown] = useState(5)
  const [showAchievement, setShowAchievement] = useState(false)
  const [hiddenMessage, setHiddenMessage] = useState('')
  const [idleTime, setIdleTime] = useState(0)
  const [sparkles, setSparkles] = useState([])
  const [noButtonCooldown, setNoButtonCooldown] = useState(false)

  const noButtonMessages = useMemo(() => [
    "Wrong answer detected ❌",
    "This option has retired",
    "Unavailable in your region 😜",
    "Ask again but nicer 😏",
    "Nice try 😏",
    "Error 404: Rejection not found"
  ], [])

  const wheelOptions = useMemo(() => [
    "Free Hug 🤗",
    "Compliment",
    "Romantic Line",
    "Cute Dare",
    "Go Closer to YES 💖"
  ], [])

  // Optimized Sparkles: Generate once or predictably
  useEffect(() => {
    const initialSparkles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5
    }))
    setSparkles(initialSparkles)
  }, [])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'NO' || e.key === 'no') {
        setHiddenMessage("Nice try 😏")
        setTimeout(() => setHiddenMessage(''), 2000)
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [])

  useEffect(() => {
    const idleTimer = setInterval(() => {
      setIdleTime(prev => prev + 1)
    }, 1000)

    if (idleTime > 15 && currentLevel !== 'entry' && currentLevel !== 'ending') {
      setHiddenMessage("Still thinking about YES? 😌")
      setTimeout(() => setHiddenMessage(''), 3000)
      setIdleTime(0)
    }

    return () => clearInterval(idleTimer)
  }, [idleTime, currentLevel])

  const handleNoButtonHover = useCallback(() => {
    if (noButtonCooldown) return;
    setNoButtonCooldown(true);
    const maxX = window.innerWidth / 2 - 100;
    const maxY = window.innerHeight / 2 - 50;

    // Jump to random position but stay visible
    const newX = (Math.random() - 0.5) * maxX * 1.5;
    const newY = (Math.random() - 0.5) * maxY * 1.5;

    setNoButtonPosition({ x: newX, y: newY });

    const randomMessage = noButtonMessages[Math.floor(Math.random() * noButtonMessages.length)];
    setHiddenMessage(randomMessage);
    setTimeout(() => {
      setHiddenMessage('');
      setNoButtonCooldown(false);
    }, 600); // 600ms cooldown
  }, [noButtonMessages, noButtonCooldown])

  const handleNoButtonClick = useCallback((e) => {
    e.preventDefault()
    handleNoButtonHover()
  }, [handleNoButtonHover])

  const spinWheel = useCallback(() => {
    const rotation = 1440 + Math.random() * 720 // More spins for drama
    setWheelRotation(prev => prev + rotation)

    setTimeout(() => {
      setCurrentLevel('question')
    }, 4500)
  }, [])

  const handleYesClick = useCallback(() => {
    setShowConfetti(true)
    setShowAchievement(true)
    setCurrentLevel('celebration') // Jump to celebration
  }, [])

  useEffect(() => {
    if (currentLevel === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (currentLevel === 'countdown' && countdown === 0) {
      setCurrentLevel('celebration')
    }
  }, [currentLevel, countdown])

  const renderLevel = () => {
    switch (currentLevel) {
      case 'entry':
        return <EntryScene setCurrentLevel={setCurrentLevel} sparkles={sparkles} />;
      case 'wheel':
        return <WheelLevel setCurrentLevel={setCurrentLevel} wheelRotation={wheelRotation} spinWheel={spinWheel} />;
      case 'question':
        return <QuestionLevel handleYesClick={handleYesClick} handleNoButtonHover={handleNoButtonHover} handleNoButtonClick={handleNoButtonClick} noButtonPosition={noButtonPosition} />;
      case 'celebration':
        return <CelebrationLevel showConfetti={showConfetti} setCurrentLevel={setCurrentLevel} />;
      case 'rewards':
        return <RewardsLevel setCurrentLevel={setCurrentLevel} />;
      case 'ending':
        return <EndingLevel />;
      default:
        return null;
    }
  }

  return (
    <div className="App">
      {sparkles.map(s => (
        <div
          key={s.id}
          className="sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDelay: `${s.delay}s`
          }}
        />
      ))}

      <AnimatePresence mode="wait">
        {renderLevel()}
      </AnimatePresence>

      <AnimatePresence>
        {hiddenMessage && (
          <motion.div
            className="hidden-message"
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{
              position: 'fixed',
              bottom: '40px',
              left: '50%',
              zIndex: 1000
            }}
          >
            {hiddenMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App