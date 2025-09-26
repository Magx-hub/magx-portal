// # src/components/InputGrid.jsx

export default function InputGrid({ form, setForm, onCalculate, onSave }) {
  const onChange = (key) => (e) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-white rounded shadow">
      <div>
        <label className="text-sm">Total Amount (GHS)</label>
        <input value={form.total_amount} onChange={onChange("total_amount")} className="w-full border rounded px-2 py-1"/>
      </div>
      <div>
        <label className="text-sm">Welfare Deduction (GHS)</label>
        <input value={form.welfare_amount} onChange={onChange("welfare_amount")} className="w-full border rounded px-2 py-1"/>
      </div>
      <div>
        <label className="text-sm">Office Deduction (%)</label>
        <input value={form.office_percent} onChange={onChange("office_percent")} className="w-full border rounded px-2 py-1"/>
      </div>
      <div>
        <label className="text-sm">Kitchen Deduction (%)</label>
        <input value={form.kitchen_percent} onChange={onChange("kitchen_percent")} className="w-full border rounded px-2 py-1"/>
      </div>
      <div>
        <label className="text-sm">Total Number of Teachers</label>
        <input value={form.num_teachers} onChange={onChange("num_teachers")} className="w-full border rounded px-2 py-1"/>
      </div>
      <div>
        <label className="text-sm">JHS Extra Classes (GHS)</label>
        <input value={form.jhs_extra_classes} onChange={onChange("jhs_extra_classes")} className="w-full border rounded px-2 py-1"/>
      </div>
      <div>
        <label className="text-sm">Number of JHS Teachers</label>
        <input value={form.num_jhs_teachers} onChange={onChange("num_jhs_teachers")} className="w-full border rounded px-2 py-1"/>
      </div>

      <div className="col-span-full flex gap-2 mt-2">
        <button onClick={onCalculate} className="bg-green-600 text-white px-3 py-2 rounded">Calculate</button>
        <button onClick={onSave} className="bg-blue-600 text-white px-3 py-2 rounded">Save Week</button>
      </div>
    </div>
  );
}
