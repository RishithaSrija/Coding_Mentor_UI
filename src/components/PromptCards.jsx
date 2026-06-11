const prompts = [
  "Explain Binary Search",
  "Solve Two Sum Problem",
  "Write React Login Form",
  "Explain Dynamic Programming",
  "Build Todo App",
];

function PromptCards({ setMessage }) {
  return (
    <div className="prompt-container">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          className="prompt-card"
          onClick={() => setMessage(prompt)}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}

export default PromptCards;