
// # utils/calculations.js
export function computePayments(input) {
  // input: { total_amount, welfare_amount, office_percent, kitchen_percent, num_teachers, jhs_extra_classes, num_jhs_teachers }
  const total_amount = Number(input.total_amount);
  const welfare = Number(input.welfare_amount);
  const office_percent = Number(input.office_percent) / 100;
  const kitchen_percent = Number(input.kitchen_percent) / 100;
  const num_teachers = Number(input.num_teachers);
  const jhs_extra_classes = Number(input.jhs_extra_classes);
  const num_jhs_teachers = Number(input.num_jhs_teachers);

  if (!total_amount || !num_teachers || !num_jhs_teachers) {
    throw new Error("Total amount and teacher counts must be positive numbers");
  }
  if (num_jhs_teachers > num_teachers) {
    throw new Error("Number of JHS teachers cannot exceed total teachers");
  }

  const balance_after_welfare = total_amount - welfare;
  const office_deduction = balance_after_welfare * office_percent;
  const balance_after_office = balance_after_welfare - office_deduction;
  const kitchen_deduction = balance_after_office * kitchen_percent;
  const balance_after_kitchen = balance_after_office - kitchen_deduction;
  const per_teacher = balance_after_kitchen / num_teachers;
  const special_per_jhs_teacher = jhs_extra_classes / num_jhs_teachers;
  const total_deductions = welfare + office_deduction + kitchen_deduction;

  return {
    total_amount,
    welfare,
    office_percent,
    kitchen_percent,
    num_teachers,
    jhs_extra_classes,
    num_jhs_teachers,
    balance_after_welfare,
    office_deduction,
    balance_after_office,
    kitchen_deduction,
    balance_after_kitchen,
    per_teacher,
    special_per_jhs_teacher,
    total_deductions
  };
}
