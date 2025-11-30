import React, { useState, useEffect } from "react";
import styled from "styled-components";

// -------------------- THEMES --------------------
const themes = {
  light: {
    pageBg: "#FAFAF9",
    card: "rgba(255, 255, 255, 0.85)",
    cardSolid: "#ffffff",
    border: "rgba(0,0,0,0.05)",
    accent: "#FF8BA7", // pastel pink
    accentSoft: "rgba(255, 139, 167, 0.16)",
    text: "#111827",
    softText: "#6b7280",
    shadow: "0 10px 32px rgba(15,23,42,0.12)",
  },
  dark: {
    pageBg: "#020617",
    card: "rgba(15,23,42,0.9)",
    cardSolid: "#020617",
    border: "rgba(148,163,184,0.26)",
    accent: "#A7F3D0", // mint
    accentSoft: "rgba(52,211,153,0.18)",
    text: "#F9FAFB",
    softText: "#9CA3AF",
    shadow: "0 14px 40px rgba(0,0,0,0.75)",
  },
};

// -------------------- STYLED COMPONENTS --------------------
const Page = styled.div`
  min-height: 100vh;
  width: 100%;
  background: ${({ themeMode }) => themes[themeMode].pageBg};
  display: flex;
  justify-content: center;
  padding: 28px 18px;
  font-family: "Poppins", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  transition: background 0.25s ease;
`;

const Grid = styled.div`
  width: 100%;
  max-width: 1120px;
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 26px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${({ themeMode }) => themes[themeMode].card};
  backdrop-filter: blur(16px);
  border-radius: 24px;
  padding: 26px 26px 22px;
  border: 1px solid ${({ themeMode }) => themes[themeMode].border};
  box-shadow: ${({ themeMode }) => themes[themeMode].shadow};
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  color: ${({ themeMode }) => themes[themeMode].text};
`;

const Subtitle = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: ${({ themeMode }) => themes[themeMode].softText};
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
`;

const ThemeButton = styled.button`
  border-radius: 999px;
  padding: 7px 13px;
  border: 1px solid ${({ themeMode }) => themes[themeMode].border};
  background: ${({ themeMode }) => themes[themeMode].cardSolid};
  color: ${({ themeMode }) => themes[themeMode].text};
  font-size: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
`;

const WordBox = styled.div`
  margin-top: 30px;
  text-align: center;
  font-size: 46px;
  font-weight: 700;
  letter-spacing: 0.28em;
  color: ${({ themeMode }) => themes[themeMode].accent};
`;

const Input = styled.input`
  width: 100%;
  margin-top: 22px;
  padding: 14px 18px;
  font-size: 17px;
  border-radius: 18px;
  border: 1px solid ${({ themeMode }) => themes[themeMode].border};
  background: ${({ themeMode }) => themes[themeMode].cardSolid};
  color: ${({ themeMode }) => themes[themeMode].text};
  outline: none;

  &::placeholder {
    color: ${({ themeMode }) => themes[themeMode].softText};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${({ themeMode }) => themes[themeMode].accentSoft};
    border-color: ${({ themeMode }) => themes[themeMode].accent};
  }
`;

const TopRow = styled.div`
  display: flex;
  margin-top: 22px;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const SelectWrapper = styled.div`
  flex: 1;
`;

const Label = styled.div`
  font-size: 12px;
  color: ${({ themeMode }) => themes[themeMode].softText};
  margin-bottom: 6px;
`;

const Select = styled.select`
  width: 100%;
  padding: 9px 11px;
  border-radius: 999px;
  border: 1px solid ${({ themeMode }) => themes[themeMode].border};
  background: ${({ themeMode }) => themes[themeMode].cardSolid};
  color: ${({ themeMode }) => themes[themeMode].text};
  font-size: 13px;
  outline: none;
  cursor: pointer;
`;

const StatsGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div`
  padding: 14px 14px 12px;
  border-radius: 20px;
  background: ${({ themeMode }) => themes[themeMode].cardSolid};
  border: 1px solid ${({ themeMode }) => themes[themeMode].border};
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: ${({ themeMode }) => themes[themeMode].softText};
`;

const StatValue = styled.div`
  margin-top: 4px;
  font-weight: 700;
  font-size: 20px;
  color: ${({ themeMode }) => themes[themeMode].text};
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 22px;
`;

const Button = styled.button`
  padding: 11px 18px;
  border-radius: 999px;
  border: ${({ primary, themeMode }) =>
    primary
      ? "none"
      : `1px solid ${themes[themeMode].border}`};
  background: ${({ primary, themeMode }) =>
    primary ? themes[themeMode].accent : themes[themeMode].cardSolid};
  color: ${({ primary }) => (primary ? "#111827" : "inherit")};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const GameOverBox = styled.div`
  margin-top: 10px;
  padding: 10px 11px;
  border-radius: 16px;
  background: ${({ themeMode }) => themes[themeMode].accentSoft};
  font-size: 13px;
  color: ${({ themeMode }) => themes[themeMode].text};
`;

const LeaderboardTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: ${({ themeMode }) => themes[themeMode].text};
`;

const SmallText = styled.p`
  font-size: 12px;
  color: ${({ themeMode }) => themes[themeMode].softText};
  margin-top: 4px;
`;

const LeaderList = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LeaderItem = styled.div`
  padding: 10px 12px;
  border-radius: 18px;
  background: ${({ themeMode }) => themes[themeMode].cardSolid};
  border: 1px solid ${({ themeMode }) => themes[themeMode].border};
  display: flex;
  justify-content: space-between;
  font-size: 12px;
`;

// -------------------- GAME DATA --------------------
const words = [
  "react",
  "coding",
  "frontend",
  "javascript",
  "pinterest",
  "developer",
  "keyboard",
  "project",
  "design",
  "state",
  "hook",
  "context",
];

const difficulties = {
  easy: { label: "Easy", baseTime: 40, bonus: 5 },
  medium: { label: "Medium", baseTime: 25, bonus: 3 },
  hard: { label: "Hard", baseTime: 18, bonus: 2 },
};

// -------------------- MAIN COMPONENT --------------------
export default function App() {
  const [themeMode, setThemeMode] = useState("light");
  const [difficulty, setDifficulty] = useState("medium");

  const [word, setWord] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(difficulties["medium"].baseTime);
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);

  const [leaderboard, setLeaderboard] = useState([]);

  // Initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("typingTheme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setThemeMode(savedTheme);
    }

    const savedBoard = localStorage.getItem("typingLeaderboard");
    if (savedBoard) {
      try {
        setLeaderboard(JSON.parse(savedBoard));
      } catch {
        // ignore
      }
    }

    pickWord();
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.style.backgroundColor = themes[themeMode].pageBg;
    document.body.style.color = themes[themeMode].text;
    localStorage.setItem("typingTheme", themeMode);
  }, [themeMode]);

  // Timer
  useEffect(() => {
    if (!started || gameOver) return;

    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [started, gameOver]);

  // Save to leaderboard on game over
  useEffect(() => {
    if (!gameOver || elapsedSeconds === 0) return;

    const minutes = elapsedSeconds / 60 || 1 / 60;
    const wpm = Math.round(score / minutes) || 0;
    const accuracy =
      totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

    const entry = {
      id: Date.now(),
      score,
      wpm,
      accuracy,
      difficulty,
      date: new Date().toLocaleDateString(),
    };

    setLeaderboard((prev) => {
      const updated = [...prev, entry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      localStorage.setItem("typingLeaderboard", JSON.stringify(updated));
      return updated;
    });
  }, [gameOver, elapsedSeconds, score, totalChars, correctChars, difficulty]);

  // Helpers
  function pickWord() {
    setWord(words[Math.floor(Math.random() * words.length)]);
  }

  function handleInput(e) {
    const val = e.target.value;
    if (!started && !gameOver) setStarted(true);

    if (val.length > input.length) {
      setTotalChars((prev) => prev + (val.length - input.length));
    }

    setInput(val);

    if (val === word) {
      setScore((s) => s + 1);
      setCorrectChars((c) => c + word.length);
      setInput("");
      pickWord();
      setTimeLeft((t) => t + difficulties[difficulty].bonus);
    }
  }

  function resetAll(level = difficulty) {
    setStarted(false);
    setGameOver(false);
    setScore(0);
    setInput("");
    setElapsedSeconds(0);
    setTotalChars(0);
    setCorrectChars(0);
    setTimeLeft(difficulties[level].baseTime);
    pickWord();
  }

  function handleDifficultyChange(e) {
    const level = e.target.value;
    setDifficulty(level);
    resetAll(level);
  }

  function toggleTheme() {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  }

  const minutes = elapsedSeconds / 60 || 1 / 60;
  const wpm = Math.round(score / minutes) || 0;
  const accuracy =
    totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

  return (
    <Page themeMode={themeMode}>
      <Grid>
        {/* LEFT: GAME */}
        <Card themeMode={themeMode}>
          <HeaderRow>
            <div>
              <Title themeMode={themeMode}>Typing Game</Title>
              <Subtitle themeMode={themeMode}>
                Pastel · Minimal · Dark / Light
              </Subtitle>
            </div>

            <ThemeButton themeMode={themeMode} onClick={toggleTheme}>
              {themeMode === "light" ? "🌙 Dark mode" : "☀ Light mode"}
            </ThemeButton>
          </HeaderRow>

          <WordBox themeMode={themeMode}>{word}</WordBox>

          <Input
            themeMode={themeMode}
            placeholder={
              gameOver
                ? "Game over — press Restart to play again."
                : "Type the word here…"
            }
            value={input}
            onChange={handleInput}
            disabled={gameOver}
            autoFocus
          />

          <TopRow>
            <SelectWrapper>
              <Label themeMode={themeMode}>Difficulty</Label>
              <Select
                themeMode={themeMode}
                value={difficulty}
                onChange={handleDifficultyChange}
                disabled={started && !gameOver}
              >
                {Object.entries(difficulties).map(([key, cfg]) => (
                  <option key={key} value={key}>
                    {cfg.label}
                  </option>
                ))}
              </Select>
            </SelectWrapper>
            <SelectWrapper>
              <Label themeMode={themeMode}>Bonus per correct word</Label>
              <div
                style={{
                  padding: "9px 12px",
                  borderRadius: "999px",
                  border: `1px solid ${themes[themeMode].border}`,
                  background: themes[themeMode].cardSolid,
                  fontSize: 13,
                }}
              >
                +{difficulties[difficulty].bonus}s
              </div>
            </SelectWrapper>
          </TopRow>

          <StatsGrid>
            <StatCard themeMode={themeMode}>
              <StatLabel themeMode={themeMode}>Time</StatLabel>
              <StatValue themeMode={themeMode}>{timeLeft}s</StatValue>
            </StatCard>
            <StatCard themeMode={themeMode}>
              <StatLabel themeMode={themeMode}>Score</StatLabel>
              <StatValue themeMode={themeMode}>{score}</StatValue>
            </StatCard>
            <StatCard themeMode={themeMode}>
              <StatLabel themeMode={themeMode}>WPM</StatLabel>
              <StatValue themeMode={themeMode}>{isFinite(wpm) ? wpm : 0}</StatValue>
            </StatCard>
            <StatCard themeMode={themeMode}>
              <StatLabel themeMode={themeMode}>Accuracy</StatLabel>
              <StatValue themeMode={themeMode}>
                {accuracy || 0}%
              </StatValue>
            </StatCard>
          </StatsGrid>

          <ButtonRow>
            <Button themeMode={themeMode} onClick={() => resetAll(difficulty)}>
              Reset all
            </Button>
            <Button
              themeMode={themeMode}
              primary
              onClick={() => resetAll(difficulty)}
            >
              {gameOver ? "Play again" : "Restart"}
            </Button>
          </ButtonRow>

          {gameOver && (
            <GameOverBox themeMode={themeMode}>
              <strong>Game over!</strong> Score <b>{score}</b> · {wpm} WPM ·{" "}
              {accuracy || 0}% accuracy on{" "}
              {difficulties[difficulty].label}.
            </GameOverBox>
          )}
        </Card>

        {/* RIGHT: LEADERBOARD */}
        <Card themeMode={themeMode}>
          <LeaderboardTitle themeMode={themeMode}>🏆 Leaderboard</LeaderboardTitle>
          <SmallText themeMode={themeMode}>
            Top 5 runs are stored in your browser.
          </SmallText>

          <LeaderList>
            {leaderboard.length === 0 && (
              <SmallText themeMode={themeMode}>
                No scores yet. Play a round!
              </SmallText>
            )}

            {leaderboard.map((entry, index) => (
              <LeaderItem key={entry.id} themeMode={themeMode}>
                <div>
                  <strong>#{index + 1}</strong> ·{" "}
                  {difficulties[entry.difficulty].label}
                  <div>
                    <SmallText themeMode={themeMode}>{entry.date}</SmallText>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div>
                    <strong>{entry.score}</strong> pts
                  </div>
                  <SmallText themeMode={themeMode}>
                    {entry.wpm} WPM · {entry.accuracy}%
                  </SmallText>
                </div>
              </LeaderItem>
            ))}
          </LeaderList>
        </Card>
      </Grid>
    </Page>
  );
}
