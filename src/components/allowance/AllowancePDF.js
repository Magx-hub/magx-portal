
import toast from 'react-hot-toast';
import { getAllowanceRecords, getWelfareRecords, getAllowanceRecordByWeek } from '../../services/allowanceService';

// ===================== PDF Generation Logic =======================

export const generatePdfReport = async (setLoadingState) => {
  setLoadingState(true);

  try {
    // Get all calculations
    const { records: calculations } = await getAllowanceRecords();

    // Get welfare payments
    const { records: welfarePayments } = await getWelfareRecords();

    // Create HTML content for the PDF
    let htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #2c3e50; text-align: center; }
            h2 { color: #34495e; border-bottom: 1px solid #eee; padding-bottom: 8px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .total-row { font-weight: bold; }
            .section { margin-bottom: 30px; }
          </style>
        </head>
        <body>
          <h1>Friday Allowance Report</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>

          <div class="section">
            <h2>Summary</h2>
            <p>Total Calculations: ${calculations.length}</p>
            <p>Total Amount: GHS ${calculations.reduce((sum, calc) => sum + (calc.totalSum || 0), 0).toFixed(2)}</p>
          </div>

          <div class="section">
            <h2>Recent Calculations</h2>
            <table>
              <tr>
                <th>Week</th>
                <th>Date</th>
                <th>Total</th>
                <th>Each Teacher</th>
                <th>Each JHS Teacher</th>
              </tr>
              ${calculations.slice(0, 5).map(calc => `
                <tr>
                  <td>${calc.weekNumber}</td>
                  <td>${calc.createdAt ? new Date(calc.createdAt.toDate ? calc.createdAt.toDate() : calc.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td>GHS ${(calc.totalSum || 0).toFixed(2)}</td>
                  <td>GHS ${(calc.eachTeacher || 0).toFixed(2)}</td>
                  <td>GHS ${(calc.eachJHSTeacher || 0).toFixed(2)}</td>
                </tr>
              `).join('')}
            </table>
          </div>

          <div class="section">
            <h2>Welfare Payments</h2>
            <table>
              <tr>
                <th>Week</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
              ${welfarePayments.slice(0, 5).map(payment => `
                <tr>
                  <td>${payment.weekNumber}</td>
                  <td>GHS ${(payment.welfare || 0).toFixed(2)}</td>
                  <td>${payment.datePaid || 'N/A'}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="2">Total Welfare Payments</td>
                <td>GHS ${welfarePayments.reduce((sum, payment) => sum + (payment.welfare || 0), 0).toFixed(2)}</td>
              </tr>
            </table>
          </div>
        </body>
      </html>
    `;

    // For web environment, we'll use a different approach since Print and shareAsync are for React Native
    // Create a blob and download it
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `allowance-report-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Report downloaded successfully!');
  } catch (error) {
    console.error('Error generating report:', error);
    toast.error('Failed to generate report');
  } finally {
    setLoadingState(false);
  }
};

// Generate weekly report PDF
export const generateWeeklyPdf = async (weekNumber, setLoadingState) => {
  if (!weekNumber) {
    toast.error('Please enter a week number');
    return;
  }

  setLoadingState(true);

  try {
    const record = await getAllowanceRecordByWeek(parseInt(weekNumber, 10));

    if (!record) {
      toast.error('No data found for the specified week');
      return;
    }

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #2c3e50; text-align: center; }
            h2 { color: #34495e; border-bottom: 1px solid #eee; padding-bottom: 8px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .total-row { font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>Weekly Allowance Report</h1>
          <h2>Week ${record.weekNumber}</h2>

          <table>
            <tr>
              <th>Description</th>
              <th>Amount (GHS)</th>
            </tr>
            <tr>
              <td>Total Sum</td>
              <td>${(record.totalSum || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Welfare</td>
              <td>${(record.welfare || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Office (5%)</td>
              <td>${(record.office || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Kitchen (5%)</td>
              <td>${(record.kitchen || 0).toFixed(2)}</td>
            </tr>
            <tr class="total-row">
              <td>Balance After Deductions</td>
              <td>${(record.balanceAfterKitchen || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Each Teacher (${record.numberOfTeachers || 0})</td>
              <td>${(record.eachTeacher || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Each JHS Teacher (${record.numberOfJHSTeachers || 0})</td>
              <td>${(record.eachJHSTeacher || 0).toFixed(2)}</td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `weekly-report-week-${weekNumber}-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Weekly report downloaded successfully!');
  } catch (error) {
    console.error('Error generating weekly report:', error);
    toast.error('Failed to generate weekly report');
  } finally {
    setLoadingState(false);
  }
};

// Generate date range report PDF
export const generateDateRangePdf = async (startDate, endDate, setLoadingState) => {
  if (!startDate || !endDate) {
    toast.error('Please select both start and end dates');
    return;
  }

  setLoadingState(true);

  try {
    const allRecords = await getAllowanceRecords();
    const records = allRecords.records.filter(record => {
      if (!record.createdAt) return false;
      const recordDate = record.createdAt.toDate ? record.createdAt.toDate() : new Date(record.createdAt);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return recordDate >= start && recordDate <= end;
    });

    if (!records || records.length === 0) {
      toast.error('No data found for the specified date range');
      return;
    }

    const totalSum = records.reduce((sum, record) => sum + (record.totalSum || 0), 0);
    const totalWelfare = records.reduce((sum, record) => sum + (record.welfare || 0), 0);
    const totalOffice = records.reduce((sum, record) => sum + (record.office || 0), 0);
    const totalKitchen = records.reduce((sum, record) => sum + (record.kitchen || 0), 0);
    const totalBalance = records.reduce((sum, record) => sum + (record.balanceAfterKitchen || 0), 0);

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #2c3e50; text-align: center; }
            h2 { color: #34495e; border-bottom: 1px solid #eee; padding-bottom: 8px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .total-row { font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>Date Range Allowance Report</h1>
          <h2>${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}</h2>

          <table>
            <tr>
              <th>Week</th>
              <th>Date</th>
              <th>Total Sum</th>
              <th>Each Teacher</th>
              <th>Each JHS Teacher</th>
            </tr>
            ${records.map(record => `
              <tr>
                <td>${record.weekNumber}</td>
                <td>${record.createdAt ? (record.createdAt.toDate ? record.createdAt.toDate() : new Date(record.createdAt)).toLocaleDateString() : 'N/A'}</td>
                <td>${(record.totalSum || 0).toFixed(2)}</td>
                <td>${(record.eachTeacher || 0).toFixed(2)}</td>
                <td>${(record.eachJHSTeacher || 0).toFixed(2)}</td>
              </tr>
            `).join('')}
            <tr class="total-row">
              <td colspan="2">Totals</td>
              <td>${totalSum.toFixed(2)}</td>
              <td colspan="2"></td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `date-range-report-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Date range report downloaded successfully!');
  } catch (error) {
    console.error('Error generating date range report:', error);
    toast.error('Failed to generate date range report');
  } finally {
    setLoadingState(false);
  }
};

// Generate detailed report PDF for individual record
export const generateDetailPdf = async (record, setLoadingState) => {
  if (!record) return;

  setLoadingState(true);

  try {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #2c3e50; text-align: center; }
            h2 { color: #34495e; border-bottom: 1px solid #eee; padding-bottom: 8px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .total-row { font-weight: bold; }
            .section { margin-bottom: 30px; }
          </style>
        </head>
        <body>
          <h1>Friday Allowance Report</h1>
          <h2>Week ${record.weekNumber} - ${record.createdAt ? (record.createdAt.toDate ? record.createdAt.toDate() : new Date(record.createdAt)).toLocaleDateString() : 'N/A'}</h2>

          <div class="section">
            <h3>Class Contributions</h3>
            <table>
              <tr>
                <th>Class</th>
                <th>Amount (GHS)</th>
              </tr>
              <tr><td>Creche</td><td>${(record.creche || 0).toFixed(2)}</td></tr>
              <tr><td>Nursery 1</td><td>${(record.nursery1 || 0).toFixed(2)}</td></tr>
              <tr><td>Nursery 2</td><td>${(record.nursery2 || 0).toFixed(2)}</td></tr>
              <tr><td>KG 1</td><td>${(record.kg1 || 0).toFixed(2)}</td></tr>
              <tr><td>KG 2</td><td>${(record.kg2 || 0).toFixed(2)}</td></tr>
              <tr><td>Basic 1</td><td>${(record.basic1 || 0).toFixed(2)}</td></tr>
              <tr><td>Basic 2</td><td>${(record.basic2 || 0).toFixed(2)}</td></tr>
              <tr><td>Basic 3</td><td>${(record.basic3 || 0).toFixed(2)}</td></tr>
              <tr><td>Basic 4</td><td>${(record.basic4 || 0).toFixed(2)}</td></tr>
              <tr><td>Basic 5</td><td>${(record.basic5 || 0).toFixed(2)}</td></tr>
              <tr><td>Basic 6</td><td>${(record.basic6 || 0).toFixed(2)}</td></tr>
              <tr><td>Basic 7 (General)</td><td>${(record.basic7General || 0).toFixed(2)}</td></tr>
              <tr><td>Basic 7 (JHS)</td><td>${(record.basic7JHS || 0).toFixed(2)}</td></tr>
              <tr><td>Basic 8 (General)</td><td>${(record.basic8General || 0).toFixed(2)}</td></tr>
              <tr><td>Basic 8 (JHS)</td><td>${(record.basic8JHS || 0).toFixed(2)}</td></tr>
              <tr><td>Basic 9 (General)</td><td>${(record.basic9General || 0).toFixed(2)}</td></tr>
              <tr><td>Basic 9 (JHS)</td><td>${(record.basic9JHS || 0).toFixed(2)}</td></tr>
              <tr class="total-row">
                <td>Total Sum</td>
                <td>${(record.totalSum || 0).toFixed(2)}</td>
              </tr>
            </table>
          </div>

          <div class="section">
            <h3>Deductions</h3>
            <table>
              <tr>
                <th>Item</th>
                <th>Amount (GHS)</th>
                <th>Balance After</th>
              </tr>
              <tr>
                <td>Welfare</td>
                <td>${(record.welfare || 0).toFixed(2)}</td>
                <td>${(record.balanceAfterWelfare || 0).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Office (5%)</td>
                <td>${(record.office || 0).toFixed(2)}</td>
                <td>${(record.balanceAfterOffice || 0).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Kitchen (5%)</td>
                <td>${(record.kitchen || 0).toFixed(2)}</td>
                <td>${(record.balanceAfterKitchen || 0).toFixed(2)}</td>
              </tr>
            </table>
          </div>

          <div class="section">
            <h3>Teacher Payments</h3>
            <table>
              <tr>
                <th>Description</th>
                <th>Amount (GHS)</th>
              </tr>
              <tr>
                <td>Regular Teachers (${record.numberOfTeachers || 0})</td>
                <td>${(record.eachTeacher || 0).toFixed(2)} each</td>
              </tr>
              <tr>
                <td>JHS Teachers (${record.numberOfJHSTeachers || 0})</td>
                <td>${(record.eachJHSTeacher || 0).toFixed(2)} each</td>
              </tr>
            </table>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `detail-report-week-${record.weekNumber}-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Detailed report downloaded successfully!');
  } catch (error) {
    console.error('Error generating detailed report:', error);
    toast.error('Failed to generate detailed report');
  } finally {
    setLoadingState(false);
  }
};
