import React from 'react';

const FeeStructureForm = ({ formData, handleInputChange, handleSubmitFeeStructure }) => (
  <form onSubmit={handleSubmitFeeStructure} className="mb-6 space-y-4 bg-white p-4 rounded-lg shadow">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleInputChange}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="number"
        name="classesFee"
        placeholder="Classes Fee"
        value={formData.classesFee}
        onChange={handleInputChange}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="number"
        name="canteenFee"
        placeholder="Canteen Fee"
        value={formData.canteenFee}
        onChange={handleInputChange}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="number"
        name="breakfastFee"
        placeholder="Breakfast Fee"
        value={formData.breakfastFee}
        onChange={handleInputChange}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="date"
        name="effectiveDate"
        value={formData.effectiveDate}
        onChange={handleInputChange}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 md:col-span-2"
        required
      />
    </div>
    <button
      type="submit"
      className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
    >
      {formData.id ? 'Update Fee Structure' : 'Add Fee Structure'}
    </button>
  </form>
);

export default FeeStructureForm;
