function Sidebar({ history }) {
  return (
    <div className="sidebar">
      <h2>📜 History</h2>

      {history.length === 0 ? (
        <p>No chats yet</p>
      ) : (
        history.map((item, index) => (
          <div key={index} className="history-item">
            {item}
          </div>
        ))
      )}
    </div>
  );
}

export default Sidebar;