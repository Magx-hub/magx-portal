<!-- PS C:\Users\KING\Documents\2025.08\web\magx-portal> yarn lint
yarn run v1.22.22
warning ..\..\..\..\package.json: No license field
$ eslint .

C:\Users\KING\Documents\2025.08\web\magx-portal\dev-dist\sw.js
  34:13  error  'importScripts' is not defined  no-undef
  70:1   error  'define' is not defined         no-undef

C:\Users\KING\Documents\2025.08\web\magx-portal\dev-dist\workbox-44305a99.js
     1:1   error    'define' is not defined                                                         no-undef
     5:37  error    '_' is not defined                                                              no-undef
     6:14  error    'e' is defined but never used                                                   no-unused-vars
     6:17  error    Empty block statement                                                           no-empty
    52:7   error    Definition for rule '@typescript-eslint/ban-types' was not found                @typescript-eslint/ban-types
   419:5   error    Definition for rule '@typescript-eslint/ban-types' was not found                @typescript-eslint/ban-types
   435:5   warning  Unused eslint-disable directive (no problems were reported)
   458:40  error    '_' is not defined                                                              no-undef
   459:14  error    'e' is defined but never used                                                   no-unused-vars
   459:17  error    Empty block statement                                                           no-empty
   752:11  error    Definition for rule '@typescript-eslint/no-unsafe-member-access' was not found  @typescript-eslint/no-unsafe-member-access
   754:13  error    Definition for rule '@typescript-eslint/no-unsafe-assignment' was not found     @typescript-eslint/no-unsafe-assignment
   948:11  error    Definition for rule '@typescript-eslint/no-unsafe-assignment' was not found     @typescript-eslint/no-unsafe-assignment
   964:13  error    Definition for rule '@typescript-eslint/no-unsafe-assignment' was not found     @typescript-eslint/no-unsafe-assignment
   970:13  warning  Unused eslint-disable directive (no problems were reported)
  1197:53  error    'registration' is not defined                                                   no-undef
  1257:5   error    Definition for rule '@typescript-eslint/ban-types' was not found                @typescript-eslint/ban-types
  1275:5   error    Definition for rule '@typescript-eslint/ban-types' was not found                @typescript-eslint/ban-types
  1291:14  error    '_extends' is a function                                                        no-func-assign
  1545:43  error    '_' is not defined                                                              no-undef
  1546:14  error    'e' is defined but never used                                                   no-unused-vars
  1546:17  error    Empty block statement                                                           no-empty
  1967:22  error    'error' is defined but never used                                               no-unused-vars
  2139:43  error    '_' is not defined                                                              no-undef
  2140:14  error    'e' is defined but never used                                                   no-unused-vars
  2140:17  error    Empty block statement                                                           no-empty
  2365:56  error    'ExtendableEvent' is not defined                                                no-undef
  2404:61  error    'FetchEvent' is not defined                                                     no-undef
  2439:15  error    Unexpected constant condition                                                   no-constant-condition
  2631:35  warning  Unused eslint-disable directive (no problems were reported)
  2730:16  error    Expected a conditional expression and instead saw an assignment                 no-cond-assign
  2901:32  error    'FetchEvent' is not defined                                                     no-undef
  2969:18  error    'error' is defined but never used                                               no-unused-vars
  3359:43  error    '_' is not defined                                                              no-undef
  3360:14  error    'e' is defined but never used                                                   no-unused-vars
  3360:17  error    Empty block statement                                                           no-empty
  3493:11  warning  Unused eslint-disable directive (no problems were reported)
  3608:20  error    'error' is defined but never used                                               no-unused-vars
  4013:9   error    Definition for rule '@typescript-eslint/no-unsafe-return' was not found         @typescript-eslint/no-unsafe-return
  4060:9   error    Definition for rule '@typescript-eslint/no-unsafe-return' was not found         @typescript-eslint/no-unsafe-return

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\BottomNav.jsx
  1:19  error  'useLocation' is defined but never used  no-unused-vars
  1:32  error  'useNavigate' is defined but never used  no-unused-vars

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\EnhancedBottomNav.jsx
   1:8   error  'React' is defined but never used                 no-unused-vars
   3:22  error  'MoreHorizontal' is defined but never used        no-unused-vars
   6:30  error  'navItems' is missing in props validation         react/prop-types
  30:36  error  'navItems.slice' is missing in props validation   react/prop-types
  31:33  error  'navItems.length' is missing in props validation  react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\EnhancedMobileLayout.jsx
   7:3  error  'children' is missing in props validation           react/prop-types
   8:3  error  'defaultTab' is missing in props validation         react/prop-types
   9:3  error  'onTabChange' is missing in props validation        react/prop-types
  10:3  error  'customTabs' is missing in props validation         react/prop-types
  11:3  error  'showStats' is missing in props validation          react/prop-types
  12:3  error  'showSearch' is missing in props validation         react/prop-types
  13:3  error  'showNotifications' is missing in props validation  react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\EnhancedSideNav.jsx
   1:8   error  'React' is defined but never used              no-unused-vars
   6:28  error  'navItems' is missing in props validation      react/prop-types
  56:21  error  'navItems.map' is missing in props validation  react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\Interface.jsx
   1:8   error  'React' is defined but never used           no-unused-vars
   4:23  error  'variant' is missing in props validation    react/prop-types
   4:38  error  'color' is missing in props validation      react/prop-types
   4:55  error  'className' is missing in props validation  react/prop-types
   4:71  error  'children' is missing in props validation   react/prop-types
  29:21  error  'className' is missing in props validation  react/prop-types
  29:37  error  'children' is missing in props validation   react/prop-types
  40:3   error  'color' is missing in props validation      react/prop-types
  41:3   error  'shadow' is missing in props validation     react/prop-types
  42:3   error  'className' is missing in props validation  react/prop-types
  43:3   error  'children' is missing in props validation   react/prop-types
  65:24  error  'icon' is missing in props validation       react/prop-types
  65:30  error  'title' is missing in props validation      react/prop-types
  65:37  error  'children' is missing in props validation   react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\MobileDrawer.jsx
    1:8   error  'React' is defined but never used              no-unused-vars
    1:17  error  'useState' is defined but never used           no-unused-vars
    3:13  error  'Menu' is defined but never used               no-unused-vars
    3:19  error  'Users' is defined but never used              no-unused-vars
    3:26  error  'Calendar' is defined but never used           no-unused-vars
    3:36  error  'WalletCards' is defined but never used        no-unused-vars
    3:49  error  'ForkKnife' is defined but never used          no-unused-vars
    3:60  error  'BarChart3' is defined but never used          no-unused-vars
    3:71  error  'GraduationCap' is defined but never used      no-unused-vars
    6:25  error  'isOpen' is missing in props validation        react/prop-types
    6:33  error  'onClose' is missing in props validation       react/prop-types
    6:42  error  'navItems' is missing in props validation      react/prop-types
  123:23  error  'navItems.map' is missing in props validation  react/prop-types -->

<!-- C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\MobileTabLayout.jsx
  1:8   error  'React' is defined but never used            no-unused-vars
  5:28  error  'children' is missing in props validation    react/prop-types
  5:38  error  'defaultTab' is missing in props validation  react/prop-types -->

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\StudentSearch.jsx
  4:26  error  'onSearch' is missing in props validation   react/prop-types
  4:36  error  'searching' is missing in props validation  react/prop-types
  4:47  error  'results' is missing in props validation    react/prop-types
  4:56  error  'onClear' is missing in props validation    react/prop-types
  4:65  error  'onEdit' is missing in props validation     react/prop-types
  4:73  error  'onDelete' is missing in props validation   react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\StudentStats.jsx
    7:3   error  'studentStats' is missing in props validation              react/prop-types
    8:3   error  'departmentStats' is missing in props validation           react/prop-types
    9:3   error  'genderStats' is missing in props validation               react/prop-types
   10:3   error  'summary' is missing in props validation                   react/prop-types
   11:3   error  'loading' is missing in props validation                   react/prop-types
   12:3   error  'onRefresh' is missing in props validation                 react/prop-types
   97:83  error  'studentStats.total' is missing in props validation        react/prop-types
  105:86  error  'studentStats.male' is missing in props validation         react/prop-types
  113:86  error  'studentStats.female' is missing in props validation       react/prop-types
  121:88  error  'studentStats.other' is missing in props validation        react/prop-types
  136:75  error  'summary.totalStudents' is missing in props validation     react/prop-types
  140:78  error  'summary.maleCount' is missing in props validation         react/prop-types
  144:78  error  'summary.femaleCount' is missing in props validation       react/prop-types
  148:79  error  'summary.totalDepartments' is missing in props validation  react/prop-types
  165:47  error  'departmentStats.length' is missing in props validation    react/prop-types
  167:32  error  'departmentStats.map' is missing in props validation       react/prop-types
  202:39  error  'genderStats.length' is missing in props validation        react/prop-types
  204:28  error  'genderStats.map' is missing in props validation           react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\Typography.js
  1:8   error  'React' is defined but never used           no-unused-vars
  4:30  error  'variant' is missing in props validation    react/prop-types
  4:45  error  'color' is missing in props validation      react/prop-types
  4:62  error  'className' is missing in props validation  react/prop-types
  4:78  error  'children' is missing in props validation   react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\allowance\AllowanceDashboard.jsx
   4:31  error  'summary' is missing in props validation               react/prop-types
   4:40  error  'allowances' is missing in props validation            react/prop-types
   4:52  error  'loading' is missing in props validation               react/prop-types
   4:61  error  'showCalculator' is missing in props validation        react/prop-types
   4:77  error  'setShowCalculator' is missing in props validation     react/prop-types
   4:96  error  'generatePdfReport' is missing in props validation     react/prop-types
  12:73  error  'summary.totalRecords' is missing in props validation  react/prop-types
  16:79  error  'summary.totalAmount' is missing in props validation   react/prop-types
  66:25  error  'allowances.slice' is missing in props validation      react/prop-types
  87:25  error  'allowances.length' is missing in props validation     react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\allowance\AllowanceHistory.jsx
   5:29  error  'allowances' is missing in props validation         react/prop-types
   5:41  error  'loading' is missing in props validation            react/prop-types
  11:23  error  'allowances.filter' is missing in props validation  react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\allowance\AllowancePDF.js
  226:11  error  'totalWelfare' is assigned a value but never used  no-unused-vars
  227:11  error  'totalOffice' is assigned a value but never used   no-unused-vars
  228:11  error  'totalKitchen' is assigned a value but never used  no-unused-vars
  229:11  error  'totalBalance' is assigned a value but never used  no-unused-vars

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\allowance\AllowanceReports.jsx
    6:29  error  'allowances' is missing in props validation         react/prop-types
    6:41  error  'loading' is missing in props validation            react/prop-types
  152:25  error  'allowances.slice' is missing in props validation   react/prop-types
  181:25  error  'allowances.length' is missing in props validation  react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\attendance\ActionButtons.jsx
  2:8   error  'React' is defined but never used                no-unused-vars
  5:26  error  'showAddForm' is missing in props validation     react/prop-types
  5:39  error  'setShowAddForm' is missing in props validation  react/prop-types
  5:55  error  'handleExport' is missing in props validation    react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\attendance\AnalyticsView.jsx
  1:8  error  'React' is defined but never used  no-unused-vars

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\attendance\AttendanceForm.jsx
   2:8   error  'React' is defined but never used                   no-unused-vars
   5:27  error  'form' is missing in props validation               react/prop-types
   5:33  error  'setForm' is missing in props validation            react/prop-types
   5:42  error  'teachers' is missing in props validation           react/prop-types
   5:52  error  'handleAdd' is missing in props validation          react/prop-types
  12:23  error  'form.weekNum' is missing in props validation       react/prop-types
  20:23  error  'form.teacherId' is missing in props validation     react/prop-types
  25:21  error  'teachers.map' is missing in props validation       react/prop-types
  31:25  error  'form.checkInTime' is missing in props validation   react/prop-types
  38:25  error  'form.checkOutTime' is missing in props validation  react/prop-types
  46:23  error  'form.status' is missing in props validation        react/prop-types
  58:23  error  'form.remarks' is missing in props validation       react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\attendance\AttendanceTabs.jsx
  2:8   error  'React' is defined but never used               no-unused-vars
  4:27  error  'activeView' is missing in props validation     react/prop-types
  4:39  error  'setActiveView' is missing in props validation  react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\attendance\EnhancedAnalyticsView.jsx
    1:8   error  'React' is defined but never used                       no-unused-vars
    6:3   error  'Calendar' is defined but never used                    no-unused-vars
   11:3   error  'XCircle' is defined but never used                     no-unused-vars
   16:34  error  'stats' is defined but never used                       no-unused-vars
   16:34  error  'stats' is missing in props validation                  react/prop-types
   16:41  error  'records' is missing in props validation                react/prop-types
   16:50  error  'loading' is missing in props validation                react/prop-types
   18:10  error  'selectedMetric' is assigned a value but never used     no-unused-vars
   18:26  error  'setSelectedMetric' is assigned a value but never used  no-unused-vars
   22:29  error  'records.length' is missing in props validation         react/prop-types
   36:43  error  'records.map' is missing in props validation            react/prop-types
   37:34  error  'records.filter' is missing in props validation         react/prop-types
   38:33  error  'records.filter' is missing in props validation         react/prop-types
   39:31  error  'records.filter' is missing in props validation         react/prop-types
   40:36  error  'records.length' is missing in props validation         react/prop-types
   40:84  error  'records.length' is missing in props validation         react/prop-types
   41:36  error  'records.reduce' is missing in props validation         react/prop-types
   42:34  error  'records.length' is missing in props validation         react/prop-types
   42:72  error  'records.length' is missing in props validation         react/prop-types
   45:37  error  'records.reduce' is missing in props validation         react/prop-types
   72:23  error  'title' is missing in props validation                  react/prop-types
   72:30  error  'value' is missing in props validation                  react/prop-types
   72:37  error  'subtitle' is missing in props validation               react/prop-types
   72:47  error  'icon' is missing in props validation                   react/prop-types
   72:59  error  'color' is missing in props validation                  react/prop-types
   72:75  error  'trend' is missing in props validation                  react/prop-types
  209:36  error  'stats.total' is missing in props validation            react/prop-types
  209:66  error  'stats.present' is missing in props validation          react/prop-types
  209:82  error  'stats.total' is missing in props validation            react/prop-types
  210:40  error  'stats.total' is missing in props validation            react/prop-types
  210:59  error  'stats.workHours' is missing in props validation        react/prop-types
  210:77  error  'stats.total' is missing in props validation            react/prop-types
  217:80  error  'stats.total' is missing in props validation            react/prop-types
  219:75  error  'stats.present' is missing in props validation          react/prop-types
  222:73  error  'stats.absent' is missing in props validation           react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\attendance\EnhancedAttendanceForm.jsx
    1:8   error  'React' is defined but never used               no-unused-vars
    2:55  error  'CheckCircle' is defined but never used         no-unused-vars
    6:3   error  'isOpen' is missing in props validation         react/prop-types
    7:3   error  'onClose' is missing in props validation        react/prop-types
    8:3   error  'onSubmit' is missing in props validation       react/prop-types
    9:3   error  'editingRecord' is missing in props validation  react/prop-types
   10:3   error  'teachers' is missing in props validation       react/prop-types
   11:3   error  'loading' is missing in props validation        react/prop-types
  111:9   error  Unexpected lexical declaration in case block    no-case-declarations

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\attendance\EnhancedAttendanceList.jsx
   1:8   error  'React' is defined but never used                                no-unused-vars
   5:35  error  'filtered' is missing in props validation                        react/prop-types
   5:45  error  'loading' is missing in props validation                         react/prop-types
   5:54  error  'error' is missing in props validation                           react/prop-types
   5:61  error  'getStatusColor' is missing in props validation                  react/prop-types
  20:68  error  `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`  react/no-unescaped-entities
  46:77  error  `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`  react/no-unescaped-entities
  47:59  error  'filtered.length' is missing in props validation                 react/prop-types
  50:17  error  'filtered.length' is missing in props validation                 react/prop-types
  58:21  error  'filtered.map' is missing in props validation                    react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\attendance\EnhancedSearchAndFilters.jsx
   1:8  error  'React' is defined but never used                 no-unused-vars
   6:3  error  'searchTerm' is missing in props validation       react/prop-types
   7:3  error  'setSearchTerm' is missing in props validation    react/prop-types
   8:3  error  'selectedDate' is missing in props validation     react/prop-types
   9:3  error  'setSelectedDate' is missing in props validation  react/prop-types
  10:3  error  'onExport' is missing in props validation         react/prop-types
  11:3  error  'totalRecords' is missing in props validation     react/prop-types
  12:3  error  'filteredCount' is missing in props validation    react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\attendance\SearchAndFilters.jsx
  2:8   error  'React' is defined but never used                no-unused-vars
  5:29  error  'date' is missing in props validation            react/prop-types
  5:35  error  'setDate' is missing in props validation         react/prop-types
  5:44  error  'search' is missing in props validation          react/prop-types
  5:52  error  'setSearch' is missing in props validation       react/prop-types
  5:63  error  'showFilters' is missing in props validation     react/prop-types
  5:76  error  'setShowFilters' is missing in props validation  react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\attendance\TeacherSummaryCard.jsx
   2:8   error  'React' is defined but never used                        no-unused-vars
   4:31  error  'summary' is missing in props validation                 react/prop-types
   5:40  error  'summary.totalDays' is missing in props validation       react/prop-types
   5:66  error  'summary.presentDays' is missing in props validation     react/prop-types
   5:88  error  'summary.totalDays' is missing in props validation       react/prop-types
   6:28  error  'summary.totalDays' is missing in props validation       react/prop-types
   6:53  error  'summary.totalWorkHours' is missing in props validation  react/prop-types
   6:78  error  'summary.presentDays' is missing in props validation     react/prop-types
  21:69  error  'summary.absentCount' is missing in props validation     react/prop-types
  25:72  error  'summary.lateCount' is missing in props validation       react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\attendance\TeacherSummaryRow.jsx
  1:8  error  'React' is defined but never used  no-unused-vars

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\canteen\DashboardTab.jsx
    1:8   error  'React' is defined but never used                                no-unused-vars
   15:3   error  'selectedDate' is missing in props validation                    react/prop-types
   16:3   error  'onDateChange' is missing in props validation                    react/prop-types
   17:3   error  'dailySummary' is missing in props validation                    react/prop-types
   18:3   error  'unpaidStudents' is missing in props validation                  react/prop-types
   19:3   error  'dailyPayments' is missing in props validation                   react/prop-types
   20:3   error  'onShowPaymentModal' is missing in props validation              react/prop-types
   21:3   error  'onSelectStudent' is missing in props validation                 react/prop-types
   22:3   error  'onSetActiveTab' is missing in props validation                  react/prop-types
   46:32  error  'dailySummary.totalPayments' is missing in props validation      react/prop-types
   53:37  error  'dailySummary.totalAmount' is missing in props validation        react/prop-types
   60:32  error  'dailySummary.uniqueStudents' is missing in props validation     react/prop-types
   61:38  error  'dailySummary.studentsNotPaid' is missing in props validation    react/prop-types
   67:32  error  'dailySummary.totalStudents' is missing in props validation      react/prop-types
   68:43  error  'dailySummary.uniqueStudents' is missing in props validation     react/prop-types
   68:73  error  'dailySummary.totalStudents' is missing in props validation      react/prop-types
   96:23  error  'unpaidStudents.length' is missing in props validation           react/prop-types
  103:33  error  'unpaidStudents.length' is missing in props validation           react/prop-types
  109:31  error  'unpaidStudents.slice' is missing in props validation            react/prop-types
  126:31  error  'unpaidStudents.length' is missing in props validation           react/prop-types
  131:44  error  'unpaidStudents.length' is missing in props validation           react/prop-types
  142:52  error  `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`  react/no-unescaped-entities
  146:28  error  'dailyPayments.slice' is missing in props validation             react/prop-types
  158:28  error  'dailyPayments.length' is missing in props validation            react/prop-types
  166:28  error  'dailyPayments.length' is missing in props validation            react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\canteen\FeeStructureModal.jsx
  1:8  error  'React' is defined but never used                  no-unused-vars
  5:3  error  'isOpen' is missing in props validation            react/prop-types
  6:3  error  'onClose' is missing in props validation           react/prop-types
  7:3  error  'onSubmit' is missing in props validation          react/prop-types
  8:3  error  'editingStructure' is missing in props validation  react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\canteen\FeesTab.jsx
   1:8   error  'React' is defined but never used                      no-unused-vars
   5:3   error  'feeStructures' is missing in props validation         react/prop-types
   6:3   error  'onShowFeeModal' is missing in props validation        react/prop-types
   7:3   error  'onEditFeeStructure' is missing in props validation    react/prop-types
   8:3   error  'onDeleteFeeStructure' is missing in props validation  react/prop-types
  26:24  error  'feeStructures.length' is missing in props validation  react/prop-types
  27:25  error  'feeStructures.map' is missing in props validation     react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\canteen\PaymentModal.jsx
    1:8   error  'React' is defined but never used                     no-unused-vars
    5:3   error  'isOpen' is missing in props validation               react/prop-types
    6:3   error  'onClose' is missing in props validation              react/prop-types
    7:3   error  'onSubmit' is missing in props validation             react/prop-types
    8:3   error  'studentsNotPaid' is missing in props validation      react/prop-types
    9:3   error  'selectedStudent' is missing in props validation      react/prop-types
   10:3   error  'calculateFee' is missing in props validation         react/prop-types
  104:32  error  'studentsNotPaid.map' is missing in props validation  react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\canteen\PaymentsTab.jsx
   1:8   error  'React' is defined but never used                                no-unused-vars
   5:3   error  'dailyPayments' is missing in props validation                   react/prop-types
   6:3   error  'searchTerm' is missing in props validation                      react/prop-types
   7:3   error  'onSearchChange' is missing in props validation                  react/prop-types
   8:3   error  'filterDepartment' is missing in props validation                react/prop-types
   9:3   error  'onFilterChange' is missing in props validation                  react/prop-types
  10:3   error  'onShowPaymentModal' is missing in props validation              react/prop-types
  11:3   error  'onEditPayment' is missing in props validation                   react/prop-types
  12:3   error  'onDeletePayment' is missing in props validation                 react/prop-types
  15:42  error  'dailyPayments.filter' is missing in props validation            react/prop-types
  16:81  error  'searchTerm.toLowerCase' is missing in props validation          react/prop-types
  17:86  error  'searchTerm.toLowerCase' is missing in props validation          react/prop-types
  23:49  error  'dailyPayments.map' is missing in props validation               react/prop-types
  64:18  error  `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`  react/no-unescaped-entities

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\canteen\ReportsTab.jsx
    1:8   error  'React' is defined but never used                                no-unused-vars
    5:3   error  'dailySummary' is missing in props validation                    react/prop-types
    6:3   error  'departmentSummary' is missing in props validation               react/prop-types
    7:3   error  'selectedDate' is missing in props validation                    react/prop-types
    8:3   error  'onFetchPaymentHistory' is missing in props validation           react/prop-types
    9:3   error  'onFetchAggregatedPayments' is missing in props validation       react/prop-types
   96:83  error  'dailySummary.totalAmount' is missing in props validation        react/prop-types
  105:82  error  'dailySummary.uniqueStudents' is missing in props validation     react/prop-types
  115:35  error  'dailySummary.totalStudents' is missing in props validation      react/prop-types
  116:50  error  'dailySummary.uniqueStudents' is missing in props validation     react/prop-types
  116:80  error  'dailySummary.totalStudents' is missing in props validation      react/prop-types
  132:65  error  'dailySummary.totalClassesFee' is missing in props validation    react/prop-types
  136:65  error  'dailySummary.totalCanteenFee' is missing in props validation    react/prop-types
  140:65  error  'dailySummary.totalBreakfastFee' is missing in props validation  react/prop-types
  144:65  error  'dailySummary.totalOtherFee' is missing in props validation      react/prop-types
  149:41  error  'dailySummary.totalAmount' is missing in props validation        react/prop-types
  158:63  error  'dailySummary.totalPayments' is missing in props validation      react/prop-types
  162:63  error  'dailySummary.uniqueStudents' is missing in props validation     react/prop-types
  166:63  error  'dailySummary.studentsNotPaid' is missing in props validation    react/prop-types
  170:63  error  'dailySummary.totalStudents' is missing in props validation      react/prop-types
  179:57  error  'departmentSummary.length' is missing in props validation        react/prop-types
  208:36  error  'departmentSummary.map' is missing in props validation           react/prop-types
  231:44  error  'departmentSummary.length' is missing in props validation        react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\canteen\StatCard.jsx
  1:8   error  'React' is defined but never used          no-unused-vars
  3:21  error  'title' is missing in props validation     react/prop-types
  3:28  error  'value' is missing in props validation     react/prop-types
  3:35  error  'subtitle' is missing in props validation  react/prop-types
  3:45  error  'icon' is missing in props validation      react/prop-types
  3:57  error  'color' is missing in props validation     react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\ui\Button.jsx
   1:8   error  'React' is defined but never used              no-unused-vars
   2:10  error  'designSystem' is defined but never used       no-unused-vars
   5:3   error  'variant' is missing in props validation       react/prop-types
   6:3   error  'size' is missing in props validation          react/prop-types
   7:3   error  'disabled' is missing in props validation      react/prop-types
   8:3   error  'loading' is missing in props validation       react/prop-types
   9:3   error  'icon' is missing in props validation          react/prop-types
  10:3   error  'iconPosition' is missing in props validation  react/prop-types
  11:3   error  'fullWidth' is missing in props validation     react/prop-types
  12:3   error  'children' is missing in props validation      react/prop-types
  13:3   error  'className' is missing in props validation     react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\ui\Card.jsx
   1:8   error  'React' is defined but never used           no-unused-vars
   4:3   error  'variant' is missing in props validation    react/prop-types
   5:3   error  'padding' is missing in props validation    react/prop-types
   6:3   error  'shadow' is missing in props validation     react/prop-types
   7:3   error  'rounded' is missing in props validation    react/prop-types
   8:3   error  'border' is missing in props validation     react/prop-types
   9:3   error  'hover' is missing in props validation      react/prop-types
  10:3   error  'children' is missing in props validation   react/prop-types
  11:3   error  'className' is missing in props validation  react/prop-types
  69:23  error  'children' is missing in props validation   react/prop-types
  69:33  error  'className' is missing in props validation  react/prop-types
  75:21  error  'children' is missing in props validation   react/prop-types
  75:31  error  'className' is missing in props validation  react/prop-types
  81:23  error  'children' is missing in props validation   react/prop-types
  81:33  error  'className' is missing in props validation  react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\ui\Input.jsx
   1:8  error  'React' is defined but never used             no-unused-vars
   4:3  error  'type' is missing in props validation         react/prop-types
   5:3  error  'size' is missing in props validation         react/prop-types
   6:3  error  'variant' is missing in props validation      react/prop-types
   7:3  error  'error' is missing in props validation        react/prop-types
   8:3  error  'disabled' is missing in props validation     react/prop-types
   9:3  error  'fullWidth' is missing in props validation    react/prop-types
  10:3  error  'label' is missing in props validation        react/prop-types
  11:3  error  'helperText' is missing in props validation   react/prop-types
  12:3  error  'errorText' is missing in props validation    react/prop-types
  13:3  error  'leftIcon' is missing in props validation     react/prop-types
  14:3  error  'rightIcon' is missing in props validation    react/prop-types
  15:3  error  'placeholder' is missing in props validation  react/prop-types
  16:3  error  'className' is missing in props validation    react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\ui\Modal.jsx
    1:8   error  'React' is defined but never used                 no-unused-vars
    6:3   error  'isOpen' is missing in props validation           react/prop-types
    7:3   error  'onClose' is missing in props validation          react/prop-types
    8:3   error  'title' is missing in props validation            react/prop-types
    9:3   error  'size' is missing in props validation             react/prop-types
   10:3   error  'showCloseButton' is missing in props validation  react/prop-types
   11:3   error  'closeOnBackdrop' is missing in props validation  react/prop-types
   12:3   error  'closeOnEscape' is missing in props validation    react/prop-types
   13:3   error  'children' is missing in props validation         react/prop-types
   14:3   error  'className' is missing in props validation        react/prop-types
   99:24  error  'children' is missing in props validation         react/prop-types
   99:34  error  'className' is missing in props validation        react/prop-types
  105:22  error  'children' is missing in props validation         react/prop-types
  105:32  error  'className' is missing in props validation        react/prop-types
  111:24  error  'children' is missing in props validation         react/prop-types
  111:34  error  'className' is missing in props validation        react/prop-types
  119:3   error  'isOpen' is missing in props validation           react/prop-types
  120:3   error  'onClose' is missing in props validation          react/prop-types
  121:3   error  'onConfirm' is missing in props validation        react/prop-types
  122:3   error  'title' is missing in props validation            react/prop-types
  123:3   error  'message' is missing in props validation          react/prop-types
  124:3   error  'confirmText' is missing in props validation      react/prop-types
  125:3   error  'cancelText' is missing in props validation       react/prop-types
  126:3   error  'variant' is missing in props validation          react/prop-types
  127:3   error  'loading' is missing in props validation          react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\ui\Skeleton.jsx
    1:8   error  'React' is defined but never used           no-unused-vars
    4:3   error  'variant' is missing in props validation    react/prop-types
    5:3   error  'width' is missing in props validation      react/prop-types
    6:3   error  'height' is missing in props validation     react/prop-types
    7:3   error  'rounded' is missing in props validation    react/prop-types
    8:3   error  'animate' is missing in props validation    react/prop-types
    9:3   error  'className' is missing in props validation  react/prop-types
   52:25  error  'lines' is missing in props validation      react/prop-types
   52:36  error  'className' is missing in props validation  react/prop-types
   64:25  error  'className' is missing in props validation  react/prop-types
   77:26  error  'rows' is missing in props validation       react/prop-types
   77:36  error  'columns' is missing in props validation    react/prop-types
   77:49  error  'className' is missing in props validation  react/prop-types
  105:26  error  'count' is missing in props validation      react/prop-types
  105:37  error  'className' is missing in props validation  react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\components\ui\Toast.jsx
    1:8   error    'React' is defined but never used                                                                                               no-unused-vars
    5:3   error    'type' is missing in props validation                                                                                           react/prop-types
    6:3   error    'title' is missing in props validation                                                                                          react/prop-types
    7:3   error    'message' is missing in props validation                                                                                        react/prop-types
    8:3   error    'duration' is missing in props validation                                                                                       react/prop-types
    9:3   error    'onClose' is missing in props validation                                                                                        react/prop-types
   10:3   error    'position' is missing in props validation                                                                                       react/prop-types
   11:3   error    'showIcon' is missing in props validation                                                                                       react/prop-types
   12:3   error    'closable' is missing in props validation                                                                                       react/prop-types
   25:6   warning  React Hook useEffect has a missing dependency: 'handleClose'. Either include it or remove the dependency array                  react-hooks/exhaustive-deps
  122:27  error    'toasts' is missing in props validation                                                                                         react/prop-types
  122:40  error    'removeToast' is missing in props validation                                                                                    react/prop-types
  138:14  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

C:\Users\KING\Documents\2025.08\web\magx-portal\src\contexts\AuthContext.jsx
   1:8   error    'React' is defined but never used                                                                                               no-unused-vars
   6:14  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components
  14:32  error    'children' is missing in props validation                                                                                       react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\hooks\useAllowance.js
  169:6   warning  React Hook useEffect has missing dependencies: 'fetchAllowances' and 'getSummary'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
  207:10  error    'error' is assigned a value but never used                                                                                             no-unused-vars
  280:6   warning  React Hook useEffect has a missing dependency: 'fetchWelfareRecords'. Either include it or remove the dependency array                 react-hooks/exhaustive-deps

C:\Users\KING\Documents\2025.08\web\magx-portal\src\hooks\useAttendance.js
  16:10  error  'error' is assigned a value but never used  no-unused-vars

C:\Users\KING\Documents\2025.08\web\magx-portal\src\hooks\useCanteen.js
    2:33  error    'useEffect' is defined but never used                                                                                                                                                                                                                       no-unused-vars
   33:10  error    'error' is assigned a value but never used                                                                                                                                                                                                                  no-unused-vars
  289:6   warning  React Hook useCallback has an unnecessary dependency: 'recordDailyPayment'. Either exclude it or remove the dependency array. Outer scope values like 'recordDailyPayment' aren't valid dependencies because mutating them doesn't re-render the component  react-hooks/exhaustive-deps

C:\Users\KING\Documents\2025.08\web\magx-portal\src\hooks\useStudents.js
  195:10  error  'error' is assigned a value but never used  no-unused-vars

C:\Users\KING\Documents\2025.08\web\magx-portal\src\hooks\useTeachers.js
  7:10  error  'error' is assigned a value but never used  no-unused-vars

C:\Users\KING\Documents\2025.08\web\magx-portal\src\screens\CanteenModuleScreen.jsx
   1:8  error  'React' is defined but never used                        no-unused-vars
  11:8  error  'StatCard' is defined but never used                     no-unused-vars
  44:5  error  'modifyDailyPayment' is assigned a value but never used  no-unused-vars

C:\Users\KING\Documents\2025.08\web\magx-portal\src\screens\LoginScreen.jsx
  1:8  error  'React' is defined but never used  no-unused-vars

C:\Users\KING\Documents\2025.08\web\magx-portal\src\screens\PerformanceMonitor.jsx
    1:8   error  'React' is defined but never used            no-unused-vars
  121:24  error  'targetView' is missing in props validation  react/prop-types
  121:36  error  'children' is missing in props validation    react/prop-types
  134:24  error  'targetTab' is missing in props validation   react/prop-types
  134:35  error  'children' is missing in props validation    react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\screens\StudentManagement.jsx
    2:91   error  'Eye' is defined but never used                            no-unused-vars
    2:96   error  'Edit' is defined but never used                           no-unused-vars
    2:102  error  'Trash2' is defined but never used                         no-unused-vars
    5:26   error  'onSearch' is missing in props validation                  react/prop-types
    5:36   error  'searching' is missing in props validation                 react/prop-types
    5:47   error  'results' is missing in props validation                   react/prop-types
    5:56   error  'onClear' is missing in props validation                   react/prop-types
    5:65   error  'onEdit' is missing in props validation                    react/prop-types
    5:73   error  'onDelete' is missing in props validation                  react/prop-types
  144:31   error  'results.length' is missing in props validation            react/prop-types
  146:24   error  'results.length' is missing in props validation            react/prop-types
  146:41   error  'results.length' is missing in props validation            react/prop-types
  151:10   error  'StudentList' is not defined                               react/jsx-no-undef
  165:3    error  'studentStats' is missing in props validation              react/prop-types
  166:3    error  'departmentStats' is missing in props validation           react/prop-types
  167:3    error  'genderStats' is missing in props validation               react/prop-types
  168:3    error  'summary' is missing in props validation                   react/prop-types
  169:3    error  'loading' is missing in props validation                   react/prop-types
  170:3    error  'onRefresh' is missing in props validation                 react/prop-types
  255:86   error  'studentStats.total' is missing in props validation        react/prop-types
  263:86   error  'studentStats.male' is missing in props validation         react/prop-types
  271:86   error  'studentStats.female' is missing in props validation       react/prop-types
  279:88   error  'studentStats.other' is missing in props validation        react/prop-types
  294:78   error  'summary.totalStudents' is missing in props validation     react/prop-types
  298:78   error  'summary.maleCount' is missing in props validation         react/prop-types
  302:78   error  'summary.femaleCount' is missing in props validation       react/prop-types
  306:79   error  'summary.totalDepartments' is missing in props validation  react/prop-types
  323:47   error  'departmentStats.length' is missing in props validation    react/prop-types
  325:32   error  'departmentStats.map' is missing in props validation       react/prop-types
  360:39   error  'genderStats.length' is missing in props validation        react/prop-types
  362:28   error  'genderStats.map' is missing in props validation           react/prop-types

C:\Users\KING\Documents\2025.08\web\magx-portal\src\screens\TeacherDashboard.jsx
   1:8   error  'React' is defined but never used                                no-unused-vars
   3:50  error  'BookOpen' is defined but never used                             no-unused-vars
   8:11  error  'user' is assigned a value but never used                        no-unused-vars
  51:16  error  `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`  react/no-unescaped-entities

C:\Users\KING\Documents\2025.08\web\magx-portal\src\screens\TeacherModuleScreen.jsx
   10:3  error  'Legend' is defined but never used                   no-unused-vars
   37:5  error  'fetchTeachers' is assigned a value but never used   no-unused-vars
  118:9  error  'departmentData' is assigned a value but never used  no-unused-vars

C:\Users\KING\Documents\2025.08\web\magx-portal\src\services\database.js
  15:3  error  'Timestamp' is defined but never used  no-unused-vars

C:\Users\KING\Documents\2025.08\web\magx-portal\src\utils\attendanceUtils.js
  18:12  error  'error' is defined but never used             no-unused-vars
  37:12  error  'error' is defined but never used             no-unused-vars
  55:12  error  'error' is defined but never used             no-unused-vars
  73:7   error  Unexpected lexical declaration in case block  no-case-declarations
  78:7   error  Unexpected lexical declaration in case block  no-case-declarations