export default function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => setInput(input + value);
  const clear = () => setInput("");
  const calculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  const btnStyle = {
    flex: 1,
    padding: "12px",
    margin: "4px",
    borderRadius: "8px",
    border: "none",
    background: "#222",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer"
  };

  return (
    <div>

      {/* DISPLAY */}
      <div style={{
        background: "#000",
        color: "#0f0",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "10px",
        textAlign: "right",
        fontSize: "20px",
        minHeight: "40px"
      }}>
        {input || "0"}
      </div>

      {/* BUTTONS */}
      {[
        ["7","8","9","/"],
        ["4","5","6","*"],
        ["1","2","3","-"],
        ["C","0","=","+"]
      ].map((row, i) => (
        <div key={i} style={{ display: "flex" }}>
          {row.map((btn) => (
            <button
              key={btn}
              onClick={() => {
                if (btn === "=") calculate();
                else if (btn === "C") clear();
                else handleClick(btn);
              }}
              style={{
                ...btnStyle,
                background:
                  btn === "=" ? "#16a34a" :
                  btn === "C" ? "#dc3545" :
                  btn === "+" || btn === "-" || btn === "*" || btn === "/" 
                    ? "#f59e0b"
                    : "#222"
              }}
            >
              {btn}
            </button>
          ))}
        </div>
      ))}

    </div>
  );
        }
