function ThemeToggle({
  darkMode,
  setDarkMode,
}) {
  return (
    <button
      className="theme-btn"
      onClick={() =>
        setDarkMode(!darkMode)
      }
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeToggle;