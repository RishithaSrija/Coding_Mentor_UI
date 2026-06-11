function VoiceInput({ setMessage }) {

  const startVoice = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech Recognition Not Supported"
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.start();

    recognition.onresult = (
      event
    ) => {
      setMessage(
        event.results[0][0]
          .transcript
      );
    };
  };

  return (
    <button
      onClick={startVoice}
    >
      🎤
    </button>
  );
}

export default VoiceInput;