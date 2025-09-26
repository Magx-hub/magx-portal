import { useState, useEffect } from "react";
import * as db from "../services/allowanceFirebaseService";
import { computePayments } from "../utils/calculations";
import { toast } from "sonner";

export default function useWeeklyCalculator(initialWeek = 1) {
  const [week, setWeek] = useState(Number(initialWeek));
  const [form, setForm] = useState({
    total_amount: 973,
    welfare_amount: 100,
    office_percent: 5,
    kitchen_percent: 5,
    num_teachers: 16,
    jhs_extra_classes: 200,
    num_jhs_teachers: 6
  });
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  // Validation helper
  const validateForm = (data) => {
    const fields = [
      "total_amount",
      "welfare_amount",
      "office_percent",
      "kitchen_percent",
      "num_teachers",
      "jhs_extra_classes",
      "num_jhs_teachers"
    ];

    for (let key of fields) {
      if (isNaN(data[key]) || Number(data[key]) < 0) {
        throw new Error(`${key.replace(/_/g, " ")} must be a positive number`);
      }
    }
    if (Number(data.num_jhs_teachers) > Number(data.num_teachers)) {
      throw new Error("Number of JHS teachers cannot exceed total teachers");
    }
  };

  useEffect(() => {
    (async () => {
      const data = await db.loadWeek(week).catch(() => null);
      if (data) {
        setForm({
          total_amount: data.total_amount,
          welfare_amount: data.welfare_amount,
          office_percent: data.office_percent,
          kitchen_percent: data.kitchen_percent,
          num_teachers: data.num_teachers,
          jhs_extra_classes: data.jhs_extra_classes,
          num_jhs_teachers: data.num_jhs_teachers
        });
        setMessage(`Data loaded for week ${week}`);
        toast.info(`Loaded week ${week}`);
        try {
          setResult(computePayments(data));
        } catch (e) {
          setMessage(e.message);
        }
      } else {
        setMessage(`No data for week ${week}`);
        try {
          setResult(computePayments(form));
        } catch (e) {
          setResult(null);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [week]);

  const calculate = () => {
    try {
      validateForm(form);
      const res = computePayments(form);
      setResult(res);
      toast.success("Calculation successful");
      return res;
    } catch (e) {
      toast.error(e.message);
      throw e;
    }
  };

  const save = async () => {
    try {
      // First, validate the form data directly.
      validateForm(form);
      
      // If validation passes, then compute the results.
      const calc = computePayments(form);
      
      const payload = {
        ...form,
        office_percent: form.office_percent,
        kitchen_percent: form.kitchen_percent,
        balance_after_welfare: calc.balance_after_welfare,
        office_deduction: calc.office_deduction,
        balance_after_office: calc.balance_after_office,
        kitchen_deduction: calc.kitchen_deduction,
        balance_after_kitchen: calc.balance_after_kitchen,
        per_teacher: calc.per_teacher,
        special_per_jhs_teacher: calc.special_per_jhs_teacher,
        total_deductions: calc.total_deductions
      };
      
      await db.saveWeek(week, payload);
      toast.success(`Saved week ${week} successfully`);
      setMessage(`Saved week ${week}`);
    } catch (e) {
      // Catch validation or save errors.
      toast.error(e.message);
    }
  };

  return {
    week, setWeek,
    form, setForm,
    result,
    message,
    calculate,
    save,
    deleteWeek: async (w) => {
      await db.deleteWeek(w ?? week);
      toast.warning(`Deleted week ${w ?? week}`);
      setMessage(`Deleted week ${w ?? week}`);
    },
    refreshAll: db.getAllWeeks,
    exportCSV: async () => {
      await db.exportCSV();
      toast.success("Exported data to CSV");
    }
  };
}



// // # src/hooks/useWeeklyCalculator.js

// import { useState, useEffect } from "react";
// import * as db from "../services/dbService";
// import { computePayments } from "../utils/calculations";

// export default function useWeeklyCalculator(initialWeek = 1) {
//   const [week, setWeek] = useState(Number(initialWeek));
//   const [form, setForm] = useState({
//     total_amount: 973,
//     welfare_amount: 100,
//     office_percent: 5,
//     kitchen_percent: 5,
//     num_teachers: 16,
//     jhs_extra_classes: 200,
//     num_jhs_teachers: 6
//   });
//   const [result, setResult] = useState(null);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // auto-load week when changed
//     (async () => {
//       const data = await db.loadWeek(week).catch(() => null);
//       if (data) {
//         // load DB fields into form
//         setForm({
//           total_amount: data.total_amount,
//           welfare_amount: data.welfare_amount,
//           office_percent: data.office_percent,
//           kitchen_percent: data.kitchen_percent,
//           num_teachers: data.num_teachers,
//           jhs_extra_classes: data.jhs_extra_classes,
//           num_jhs_teachers: data.num_jhs_teachers
//         });
//         setMessage(`Data loaded for week ${week}`);
//         try {
//           setResult(computePayments({
//             total_amount: data.total_amount,
//             welfare_amount: data.welfare_amount,
//             office_percent: data.office_percent,
//             kitchen_percent: data.kitchen_percent,
//             num_teachers: data.num_teachers,
//             jhs_extra_classes: data.jhs_extra_classes,
//             num_jhs_teachers: data.num_jhs_teachers
//           }));
//         } catch (e) {
//           setMessage(e.message);
//         }
//       } else {
//         setMessage(`No data for week ${week}`);
//         // optional: clear result
//         try {
//           setResult(computePayments(form));
//         } catch (e) {
//           setResult(null);
//         }
//       }
//     })();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [week]);

//   const calculate = () => {
//     try {
//       const res = computePayments(form);
//       setResult(res);
//       setMessage("Calculated");
//       return res;
//     } catch (e) {
//       setMessage(e.message);
//       setResult(null);
//       throw e;
//     }
//   };

//   const save = async () => {
//     const calc = calculate();
//     const payload = {
//       total_amount: calc.total_amount,
//       welfare_amount: calc.welfare,
//       office_percent: calc.office_percent * 100, // to match your original DB storing 5 as 5.0?
//       kitchen_percent: calc.kitchen_percent * 100,
//       num_teachers: calc.num_teachers,
//       jhs_extra_classes: calc.jhs_extra_classes,
//       num_jhs_teachers: calc.num_jhs_teachers,
//       balance_after_welfare: calc.balance_after_welfare,
//       office_deduction: calc.office_deduction,
//       balance_after_office: calc.balance_after_office,
//       kitchen_deduction: calc.kitchen_deduction,
//       balance_after_kitchen: calc.balance_after_kitchen,
//       per_teacher: calc.per_teacher,
//       special_per_jhs_teacher: calc.special_per_jhs_teacher,
//       total_deductions: calc.total_deductions
//     };
//     // store office/kitchen as raw percentages (5 or 10, not 0.05)
//     await db.saveWeek(week, payload);
//     setMessage(`Saved week ${week}`);
//   };

//   return {
//     week, setWeek,
//     form, setForm,
//     result,
//     message,
//     calculate,
//     save,
//     deleteWeek: async (w) => {
//       await db.deleteWeek(w ?? week);
//       setMessage(`Deleted week ${w ?? week}`);
//     },
//     refreshAll: db.getAllWeeks,
//     exportCSV: db.exportCSV
//   };
// }
