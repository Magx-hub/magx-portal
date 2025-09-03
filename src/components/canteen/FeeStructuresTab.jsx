import React from 'react';
import FeeStructureForm from './FeeStructureForm';

const FeeStructuresTab = ({ feeStructures, formData, handleInputChange, handleSubmitFeeStructure, setFormData, removeFeeStructure }) => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Fee Structures</h2>
    <FeeStructureForm
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmitFeeStructure={handleSubmitFeeStructure}
    />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {feeStructures.map((fs) => (
        <div key={fs.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="font-bold text-lg mb-2">{fs.department}</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Classes Fee:</span> GH₵{fs.classesFee}</p>
            <p><span className="font-medium">Canteen Fee:</span> GH₵{fs.canteenFee}</p>
            <p><span className="font-medium">Breakfast Fee:</span> GH₵{fs.breakfastFee}</p>
            <p><span className="font-medium">Effective:</span> {fs.effectiveDate instanceof Date ? fs.effectiveDate.toISOString().split('T')[0] : fs.effectiveDate}</p>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setFormData(fs)}
              className="flex-1 bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => removeFeeStructure(fs.id)}
              className="flex-1 bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FeeStructuresTab;
