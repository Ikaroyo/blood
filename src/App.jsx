import React, { useState, useEffect } from 'react';
import { parseInput } from './utils/parser';
import PressureTable from './components/PressureTable';
import PressureChart from './components/PressureChart';

const initialInput = `[23:08, 5/2/2025] Enfermero1: 152/100
[10:01, 6/2/2025] Enfermero2: 138/99
[10:58, 6/2/2025] Enfermero3: 157/112
[12:03, 6/2/2025] Enfermero4: 148/85`;

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState('');

  useEffect(() => {
    // Initial data load
    loadData(initialInput);
  }, []);

  const handleInputChange = (event) => {
    setInput(event.target.value);
    setError(''); // Clear error on manual input change
  };

  const loadData = (text) => {
    const parsedData = parseInput(text);
    if (parsedData.length === 0) {
      setError('El formato de los datos no es válido.');
      return false;
    } else {
      setError('');
      setData(parsedData);
      return true;
    }
  };

  const pasteAndLoadData = () => {
    const text = input;

    // More robust format check using regex
    const formatRegex = /^\[\d{1,2}:\d{2}, \d{1,2}\/\d{1,2}\/\d{4}\] .*?: \d+\/\d+$/gm;
    if (!formatRegex.test(text)) {
      setError('El formato del texto no es válido. Asegúrate de que cada línea tenga el formato "[hh:mm, d/m/yyyy] Nombre: sistólica/diastólica".');
      return;
    }
    setError("");

    // Parse and sort by date
    const lines = text.trim().split('\n');
    const parsedLines = lines.map(line => {
      const match = line.match(/\[(.*?), (.*?)\] .*?: (.*?)\/(.*?)$/);
      if (match) {
        const [, time, date, systolic, diastolic] = match;
        const [hour, minute] = time.split(':').map(Number);
        const [day, month, year] = date.split('/').map(Number);
        const parsedDate = new Date(year, month - 1, day, hour, minute);
        return { date: parsedDate, line };
      }
      return { date: null, line }; // Keep track of original lines
    }).filter(item => item.date !== null); // Remove lines with invalid dates

    parsedLines.sort((a, b) => a.date - b.date);

    const sortedText = parsedLines.map(item => item.line).join('\n');
    setInput(sortedText);

    // Load data after successful paste and sort
    loadData(sortedText);
  };

  // Calculate max values for systolic and diastolic
  const maxSystolic = data.length > 0 ? Math.max(...data.map(item => item.systolic)) : null;
  const maxDiastolic = data.length > 0 ? Math.max(...data.map(item => item.diastolic)) : null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Monitor de Presión Arterial</h1>

      <div className="mb-4">
        <textarea
          className="w-full h-40 p-2 bg-gray-200 text-gray-700 rounded"
          value={input}
          onChange={handleInputChange}
          placeholder="Pega tus datos de presión arterial aquí..."
        />
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={pasteAndLoadData}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Pegar y Cargar Datos
      </button>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Tabla</h2>
          <PressureTable data={data} maxSystolic={maxSystolic} maxDiastolic={maxDiastolic} />
        </div>
        <div className='w-full'>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Gráfico</h2>
          <div className="h-[400px] md:h-[500px]">
            <PressureChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
