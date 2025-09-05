# =======================================================================
# ========================== reports.jsx ================================
# ========================== reports.jsx ================================
# =======================================================================

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useColorScheme } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { router } from 'expo-router';
import { getCalculations, getWelfarePayments } from '../../utils/database';


export default function ReportsScreen() {
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();

  const generatePdfReport = async () => {
    setLoading(true);
    
    try {
      // Get all calculations via database.js
      const calculations = await getCalculations();

      // Get welfare payments via database.js
      const welfarePayments = await getWelfarePayments();
      
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
              <p>Total Amount: GHS ${calculations.reduce((sum, calc) => sum + calc.totalSum, 0).toFixed(2)}</p>
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
                    <td>${new Date(calc.createdAt).toLocaleDateString()}</td>
                    <td>GHS ${calc.totalSum.toFixed(2)}</td>
                    <td>GHS ${calc.eachTeacher.toFixed(2)}</td>
                    <td>GHS ${calc.eachJHSTeacher.toFixed(2)}</td>
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
                    <td>GHS ${payment.amount.toFixed(2)}</td>
                    <td>${new Date(payment.createdAt).toLocaleDateString()}</td>
                  </tr>
                `).join('')}
                <tr class="total-row">
                  <td colspan="2">Total Welfare Payments</td>
                  <td>GHS ${welfarePayments.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)}</td>
                </tr>
              </table>
            </div>
          </body>
        </html>
      `;
      
      // Generate PDF
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      
      // Share the PDF
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
        Reports
      </Text>
      
      <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
        <MaterialIcons name="picture-as-pdf" size={48} color={Colors[colorScheme ?? 'light'].tint} />
        <Text style={[styles.cardTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Generate Full Report
        </Text>
        <Text style={[styles.cardDescription, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
          Create a PDF report with all calculations and welfare payments
        </Text>
        
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
          onPress={generatePdfReport}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Generate PDF</Text>
          )}
        </TouchableOpacity>
      </View>
      
      <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
        <MaterialIcons name="history" size={48} color={Colors[colorScheme ?? 'light'].tint} />
        <Text style={[styles.cardTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Weekly Reports
        </Text>
        <Text style={[styles.cardDescription, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
          Generate reports for specific weeks
        </Text>
        
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
          onPress={() => router.push('/weekly-reports')}
        >
          <Text style={styles.buttonText}>View Weekly Reports</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginBottom: 24,
  },
  card: {
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 16,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});


# =======================================================================
# ========================== report_detail.jsx ================================
# ========================== report_detail.jsx ================================
# =======================================================================

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useColorScheme } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function ReportDetailScreen() {
  const { id } = useLocalSearchParams();
  const [calculation, setCalculation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const db = useSQLiteContext();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchCalculation = async () => {
      try {
        const result = await db.getFirstAsync(
          'SELECT * FROM calculations WHERE id = ?',
          [id]
        );
        setCalculation(result);
      } catch (error) {
        console.error('Error fetching calculation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalculation();
  }, [id]);

  const generatePdf = async () => {
    if (!calculation) return;
    
    setGeneratingPdf(true);
    
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
            <h2>Week ${calculation.weekNumber} - ${new Date(calculation.createdAt).toLocaleDateString()}</h2>
            
            <div class="section">
              <h3>Class Contributions</h3>
              <table>
                <tr>
                  <th>Class</th>
                  <th>Amount (GHS)</th>
                </tr>
                <tr><td>Creche</td><td>${calculation.creche.toFixed(2)}</td></tr>
                <tr><td>Nursery 1</td><td>${calculation.nursery1.toFixed(2)}</td></tr>
                <tr><td>Nursery 2</td><td>${calculation.nursery2.toFixed(2)}</td></tr>
                <tr><td>KG 1</td><td>${calculation.kg1.toFixed(2)}</td></tr>
                <tr><td>KG 2</td><td>${calculation.kg2.toFixed(2)}</td></tr>
                <tr><td>Basic 1</td><td>${calculation.basic1.toFixed(2)}</td></tr>
                <tr><td>Basic 2</td><td>${calculation.basic2.toFixed(2)}</td></tr>
                <tr><td>Basic 3</td><td>${calculation.basic3.toFixed(2)}</td></tr>
                <tr><td>Basic 4</td><td>${calculation.basic4.toFixed(2)}</td></tr>
                <tr><td>Basic 5</td><td>${calculation.basic5.toFixed(2)}</td></tr>
                <tr><td>Basic 6</td><td>${calculation.basic6.toFixed(2)}</td></tr>
                <tr><td>Basic 7 (General)</td><td>${calculation.basic7General.toFixed(2)}</td></tr>
                <tr><td>Basic 7 (JHS)</td><td>${calculation.basic7JHS.toFixed(2)}</td></tr>
                <tr><td>Basic 8 (General)</td><td>${calculation.basic8General.toFixed(2)}</td></tr>
                <tr><td>Basic 8 (JHS)</td><td>${calculation.basic8JHS.toFixed(2)}</td></tr>
                <tr><td>Basic 9 (General)</td><td>${calculation.basic9General.toFixed(2)}</td></tr>
                <tr><td>Basic 9 (JHS)</td><td>${calculation.basic9JHS.toFixed(2)}</td></tr>
                <tr class="total-row">
                  <td>Total Sum</td>
                  <td>${calculation.totalSum.toFixed(2)}</td>
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
                  <td>${calculation.welfare.toFixed(2)}</td>
                  <td>${calculation.balanceAfterWelfare.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Office (5%)</td>
                  <td>${calculation.office.toFixed(2)}</td>
                  <td>${calculation.balanceAfterOffice.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Kitchen (5%)</td>
                  <td>${calculation.kitchen.toFixed(2)}</td>
                  <td>${calculation.balanceAfterKitchen.toFixed(2)}</td>
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
                  <td>Regular Teachers (${calculation.numberOfTeachers})</td>
                  <td>${calculation.eachTeacher.toFixed(2)} each</td>
                </tr>
                <tr>
                  <td>JHS Teachers (${calculation.numberOfJHSTeachers})</td>
                  <td>${calculation.eachJHSTeacher.toFixed(2)} each</td>
                </tr>
              </table>
            </div>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF report');
    } finally {
      setGeneratingPdf(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
      </View>
    );
  }

  if (!calculation) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: Colors[colorScheme ?? 'light'].text }]}>
          Calculation not found
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
          Week {calculation.weekNumber} Report
        </Text>
        <Text style={[styles.date, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
          {new Date(calculation.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Class Contributions
        </Text>
        <View style={styles.grid}>
          <View style={styles.gridRow}>
            <Text style={[styles.gridLabel, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>Creche:</Text>
            <Text style={[styles.gridValue, { color: Colors[colorScheme ?? 'light'].text }]}>
              GHS {calculation.creche.toFixed(2)}
            </Text>
          </View>
          <View style={styles.gridRow}>
            <Text style={[styles.gridLabel, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>Nursery 1:</Text>
            <Text style={[styles.gridValue, { color: Colors[colorScheme ?? 'light'].text }]}>
              GHS {calculation.nursery1.toFixed(2)}
            </Text>
          </View>
          {/* Add all other classes similarly */}
          <View style={[styles.gridRow, styles.totalRow]}>
            <Text style={[styles.gridLabel, { color: Colors[colorScheme ?? 'light'].text }]}>Total Sum:</Text>
            <Text style={[styles.gridValue, { color: Colors[colorScheme ?? 'light'].text }]}>
              GHS {calculation.totalSum.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Deductions
        </Text>
        <View style={styles.deductionRow}>
          <Text style={[styles.deductionLabel, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>Welfare:</Text>
          <Text style={[styles.deductionValue, { color: Colors[colorScheme ?? 'light'].text }]}>
            GHS {calculation.welfare.toFixed(2)}
          </Text>
          <Text style={[styles.deductionBalance, { color: Colors[colorScheme ?? 'light'].text }]}>
            Balance: GHS {calculation.balanceAfterWelfare.toFixed(2)}
          </Text>
        </View>
        <View style={styles.deductionRow}>
          <Text style={[styles.deductionLabel, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>Office (5%):</Text>
          <Text style={[styles.deductionValue, { color: Colors[colorScheme ?? 'light'].text }]}>
            GHS {calculation.office.toFixed(2)}
          </Text>
          <Text style={[styles.deductionBalance, { color: Colors[colorScheme ?? 'light'].text }]}>
            Balance: GHS {calculation.balanceAfterOffice.toFixed(2)}
          </Text>
        </View>
        <View style={styles.deductionRow}>
          <Text style={[styles.deductionLabel, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>Kitchen (5%):</Text>
          <Text style={[styles.deductionValue, { color: Colors[colorScheme ?? 'light'].text }]}>
            GHS {calculation.kitchen.toFixed(2)}
          </Text>
          <Text style={[styles.deductionBalance, { color: Colors[colorScheme ?? 'light'].text }]}>
            Balance: GHS {calculation.balanceAfterKitchen.toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Teacher Payments
        </Text>
        <View style={styles.paymentRow}>
          <Text style={[styles.paymentLabel, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
            Each Teacher ({calculation.numberOfTeachers}):
          </Text>
          <Text style={[styles.paymentValue, { color: Colors[colorScheme ?? 'light'].text }]}>
            GHS {calculation.eachTeacher.toFixed(2)}
          </Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={[styles.paymentLabel, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
            Each JHS Teacher ({calculation.numberOfJHSTeachers}):
          </Text>
          <Text style={[styles.paymentValue, { color: Colors[colorScheme ?? 'light'].text }]}>
            GHS {calculation.eachJHSTeacher.toFixed(2)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.pdfButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
        onPress={generatePdf}
        disabled={generatingPdf}
      >
        {generatingPdf ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            <MaterialIcons name="picture-as-pdf" size={20} color="white" />
            <Text style={styles.pdfButtonText}>Generate PDF Report</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  date: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridRow: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  gridLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  gridValue: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 8,
    marginTop: 8,
  },
  deductionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  deductionLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    flex: 2,
  },
  deductionValue: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    flex: 1,
    textAlign: 'right',
  },
  deductionBalance: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    flex: 2,
    textAlign: 'right',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    flex: 2,
  },
  paymentValue: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    flex: 1,
    textAlign: 'right',
  },
  pdfButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  pdfButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 8,
  },
});


# =======================================================================
# ========================== weekly_reports.jsx =========================
# ========================== weekly_reports.jsx =========================
# =======================================================================

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useColorScheme } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Picker } from '@react-native-picker/picker';
import { getCalculationByWeek, getCalculations } from '../../utils/database';

export default function WeeklyReportsScreen() {
  const [weekNumber, setWeekNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('week');
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const colorScheme = useColorScheme();

  const generateWeeklyPdf = async () => {
    if (!weekNumber) {
      Alert.alert('Error', 'Please enter a week number');
      return;
    }

    setGeneratingPdf(true);
    
    try {
      const calculation = await getCalculationByWeek(parseInt(weekNumber, 10));

      if (!calculation) {
        Alert.alert('Error', 'No data found for the specified week');
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
            <h2>Week ${calculation.weekNumber}</h2>
            
            <table>
              <tr>
                <th>Description</th>
                <th>Amount (GHS)</th>
              </tr>
              <tr>
                <td>Total Sum</td>
                <td>${calculation.totalSum.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Welfare</td>
                <td>${calculation.welfare.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Office (5%)</td>
                <td>${calculation.office.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Kitchen (5%)</td>
                <td>${calculation.kitchen.toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                <td>Balance After Deductions</td>
                <td>${calculation.balanceAfterKitchen.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Each Teacher (${calculation.numberOfTeachers})</td>
                <td>${calculation.eachTeacher.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Each JHS Teacher (${calculation.numberOfJHSTeachers})</td>
                <td>${calculation.eachJHSTeacher.toFixed(2)}</td>
              </tr>
            </table>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF report');
    } finally {
      setGeneratingPdf(false);
    }
  };

  const generateDateRangePdf = async () => {
    if (!startDate || !endDate) {
      Alert.alert('Error', 'Please select both start and end dates');
      return;
    }

    setGeneratingPdf(true);
    
    try {
      const all = await getCalculations();
      const calculations = all.filter(
        calc => {
          const d = new Date(calc.createdAt);
          const sd = new Date(startDate);
          const ed = new Date(endDate);
          // normalize to date only
          d.setHours(0,0,0,0);
          sd.setHours(0,0,0,0);
          ed.setHours(0,0,0,0);
          return d >= sd && d <= ed;
        }
      );

      if (!calculations || calculations.length === 0) {
        Alert.alert('Error', 'No data found for the specified date range');
        return;
      }

      const totalSum = calculations.reduce((sum, calc) => sum + calc.totalSum, 0);
      const totalWelfare = calculations.reduce((sum, calc) => sum + calc.welfare, 0);
      const totalOffice = calculations.reduce((sum, calc) => sum + calc.office, 0);
      const totalKitchen = calculations.reduce((sum, calc) => sum + calc.kitchen, 0);
      const totalBalance = calculations.reduce((sum, calc) => sum + calc.balanceAfterKitchen, 0);

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
              ${calculations.map(calc => `
                <tr>
                  <td>${calc.weekNumber}</td>
                  <td>${new Date(calc.createdAt).toLocaleDateString()}</td>
                  <td>${calc.totalSum.toFixed(2)}</td>
                  <td>${calc.eachTeacher.toFixed(2)}</td>
                  <td>${calc.eachJHSTeacher.toFixed(2)}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="2">Totals</td>
                <td>${totalSum.toFixed(2)}</td>
                <td colspan="2"></td>
              </tr>
              <tr class="total-row">
                <td colspan="2">Total Welfare</td>
                <td>${totalWelfare.toFixed(2)}</td>
                <td colspan="2"></td>
              </tr>
              <tr class="total-row">
                <td colspan="2">Total Office (5%)</td>
                <td>${totalOffice.toFixed(2)}</td>
                <td colspan="2"></td>
              </tr>
              <tr class="total-row">
                <td colspan="2">Total Kitchen (5%)</td>
                <td>${totalKitchen.toFixed(2)}</td>
                <td colspan="2"></td>
              </tr>
              <tr class="total-row">
                <td colspan="2">Total Balance</td>
                <td>${totalBalance.toFixed(2)}</td>
                <td colspan="2"></td>
              </tr>
            </table>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF report');
    } finally {
      setGeneratingPdf(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
        Weekly Reports
      </Text>

      <View style={[styles.pickerContainer, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
        <Picker
          selectedValue={reportType}
          onValueChange={(itemValue) => setReportType(itemValue)}
          style={[styles.picker, { color: Colors[colorScheme ?? 'light'].text }]}
          dropdownIconColor={Colors[colorScheme ?? 'light'].text}
        >
          <Picker.Item label="By Week Number" value="week" />
          <Picker.Item label="By Date Range" value="range" />
        </Picker>
      </View>

      {reportType === 'week' ? (
        <View style={[styles.inputContainer, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>
            Week Number (1-16)
          </Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: Colors[colorScheme ?? 'light'].inputBackground,
              color: Colors[colorScheme ?? 'light'].text,
              borderColor: Colors[colorScheme ?? 'light'].inputBorder
            }]}
            placeholder="Enter week number"
            placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
            keyboardType="numeric"
            value={weekNumber}
            onChangeText={setWeekNumber}
          />
        </View>
      ) : (
        <View style={[styles.inputContainer, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>
            Start Date
          </Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: Colors[colorScheme ?? 'light'].inputBackground,
              color: Colors[colorScheme ?? 'light'].text,
              borderColor: Colors[colorScheme ?? 'light'].inputBorder
            }]}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
            value={startDate}
            onChangeText={setStartDate}
          />
          <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text, marginTop: 16 }]}>
            End Date
          </Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: Colors[colorScheme ?? 'light'].inputBackground,
              color: Colors[colorScheme ?? 'light'].text,
              borderColor: Colors[colorScheme ?? 'light'].inputBorder
            }]}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
            value={endDate}
            onChangeText={setEndDate}
          />
        </View>
      )}

      <TouchableOpacity
        style={[styles.pdfButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
        onPress={reportType === 'week' ? generateWeeklyPdf : generateDateRangePdf}
        disabled={generatingPdf}
      >
        {generatingPdf ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            <MaterialIcons name="picture-as-pdf" size={20} color="white" />
            <Text style={styles.pdfButtonText}>
              {reportType === 'week' ? 'Generate Weekly PDF' : 'Generate Date Range PDF'}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginBottom: 24,
  },
  pickerContainer: {
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  inputContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  pdfButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  pdfButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 8,
  },
});

