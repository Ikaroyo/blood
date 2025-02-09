import React from 'react';

const PressureTable = ({ data, maxSystolic, maxDiastolic }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sistólica
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Diastólica
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((entry, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {entry.date.toLocaleString('es-ES', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false, // Use 24-hour format
                })}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${entry.systolic === maxSystolic ? 'font-bold text-red-500' : 'text-gray-900'}`}>
                {entry.systolic}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${entry.diastolic === maxDiastolic ? 'font-bold text-blue-500' : 'text-gray-900'}`}>
                {entry.diastolic}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PressureTable;
