// // # src/services/dbService.js
// import Dexie from "dexie";

// const db = new Dexie("teacher_payments_db");
// db.version(1).stores({
//   // week_number as primary key (unique)
//   weekly_payments: "week_number, total_amount, created_at, updated_at"
// });

// export const saveWeek = async (week_number, payload) => {
//   const now = new Date().toISOString();
//   const record = {
//     ...payload,
//     week_number: Number(week_number),
//     updated_at: now,
//     created_at: payload.created_at || now
//   };
//   // put will insert or update by primary key (week_number)
//   await db.weekly_payments.put(record);
//   return record;
// };

// export const loadWeek = async (week_number) => {
//   return await db.weekly_payments.get(Number(week_number));
// };

// export const getAllWeeks = async () => {
//   return await db.weekly_payments.orderBy("week_number").toArray();
// };

// export const deleteWeek = async (week_number) => {
//   return await db.weekly_payments.delete(Number(week_number));
// };

// export const exportCSV = async () => {
//   const rows = await getAllWeeks();
//   const header = [
//     "Week",
//     "Total Amount",
//     "Welfare",
//     "Office Percent",
//     "Kitchen Percent",
//     "Num Teachers",
//     "JHS Extra Classes",
//     "Num JHS Teachers",
//     "Per Teacher",
//     "Special Per JHS Teacher",
//     "Total Deductions",
//     "Created At",
//     "Updated At"
//   ];
//   const csv = [
//     header.join(","),
//     ...rows.map((r) =>
//       [
//         r.week_number,
//         r.total_amount,
//         r.welfare_amount,
//         r.office_percent,
//         r.kitchen_percent,
//         r.num_teachers,
//         r.jhs_extra_classes,
//         r.num_jhs_teachers,
//         r.per_teacher,
//         r.special_per_jhs_teacher,
//         r.total_deductions,
//         r.created_at,
//         r.updated_at
//       ].join(",")
//     )
//   ].join("\n");

//   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = `weekly_payments_${new Date().toISOString().slice(0,10)}.csv`;
//   a.click();
//   URL.revokeObjectURL(url);
// };
