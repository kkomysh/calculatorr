import { useState } from 'react';
import { Trash2 } from 'lucide-react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(String(num));
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op) => {
    const current = parseFloat(display);
    
    if (prevValue === null) {
      setPrevValue(current);
    } else if (operation) {
      const result = calculate(prevValue, current, operation);
      setDisplay(String(result));
      setPrevValue(result);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 'Error';
      default: return b;
    }
  };

  const handleEquals = () => {
    if (operation && prevValue !== null) {
      const current = parseFloat(display);
      const result = calculate(prevValue, current, operation);
      setDisplay(String(result));
      setPrevValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handlePercentage = () => {
    const current = parseFloat(display);
    setDisplay(String(current / 100));
    setNewNumber(true);
  };

  const handleNegate = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const Button = ({ children, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`text-xl font-semibold rounded-2xl transition-all hover:brightness-110 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/10 w-full max-w-sm">
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 mb-6 border border-white/5">
          <div className="text-right">
            <div className="text-purple-400 text-sm mb-1 h-6">
              {operation && prevValue !== null ? `${prevValue} ${operation}` : ''}
            </div>
            <div className="text-white text-5xl font-light break-all">
              {display}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Button
            onClick={handleClear}
            className="bg-gradient-to-b from-red-500 to-red-600 text-white col-span-2"
          >
            <Trash2 className="inline w-5 h-5 mr-1" />
            AC
          </Button>
          <Button
            onClick={handlePercentage}
            className="bg-gradient-to-b from-slate-600 to-slate-700 text-white"
          >
            %
          </Button>
          <Button
            onClick={() => handleOperation('÷')}
            className="bg-gradient-to-b from-purple-500 to-purple-600 text-white"
          >
            ÷
          </Button>

          <Button onClick={() => handleNumber(7)} className="bg-gradient-to-b from-slate-700 to-slate-800 text-white">7</Button>
          <Button onClick={() => handleNumber(8)} className="bg-gradient-to-b from-slate-700 to-slate-800 text-white">8</Button>
          <Button onClick={() => handleNumber(9)} className="bg-gradient-to-b from-slate-700 to-slate-800 text-white">9</Button>
          <Button
            onClick={() => handleOperation('×')}
            className="bg-gradient-to-b from-purple-500 to-purple-600 text-white"
          >
            ×
          </Button>

          <Button onClick={() => handleNumber(4)} className="bg-gradient-to-b from-slate-700 to-slate-800 text-white">4</Button>
          <Button onClick={() => handleNumber(5)} className="bg-gradient-to-b from-slate-700 to-slate-800 text-white">5</Button>
          <Button onClick={() => handleNumber(6)} className="bg-gradient-to-b from-slate-700 to-slate-800 text-white">6</Button>
          <Button
            onClick={() => handleOperation('-')}
            className="bg-gradient-to-b from-purple-500 to-purple-600 text-white"
          >
            −
          </Button>

          <Button onClick={() => handleNumber(1)} className="bg-gradient-to-b from-slate-700 to-slate-800 text-white">1</Button>
          <Button onClick={() => handleNumber(2)} className="bg-gradient-to-b from-slate-700 to-slate-800 text-white">2</Button>
          <Button onClick={() => handleNumber(3)} className="bg-gradient-to-b from-slate-700 to-slate-800 text-white">3</Button>
          <Button
            onClick={() => handleOperation('+')}
            className="bg-gradient-to-b from-purple-500 to-purple-600 text-white"
          >
            +
          </Button>

          <Button
            onClick={handleNegate}
            className="bg-gradient-to-b from-slate-700 to-slate-800 text-white"
          >
            +/−
          </Button>
          <Button onClick={() => handleNumber(0)} className="bg-gradient-to-b from-slate-700 to-slate-800 text-white">0</Button>
          <Button onClick={handleDecimal} className="bg-gradient-to-b from-slate-700 to-slate-800 text-white">.</Button>
          <Button
            onClick={handleEquals}
            className="bg-gradient-to-b from-emerald-500 to-emerald-600 text-white"
          >
            =
          </Button>
        </div>
      </div>
    </div>
  );
}