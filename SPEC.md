# FleetFlow - Modular Fleet & Logistics Management System

## 1. Project Overview

**Project Name:** FleetFlow
**Type:** Single Page Web Application (SPA)
**Core Functionality:** A centralized, rule-based digital hub that optimizes the lifecycle of a delivery fleet, monitors driver safety, and tracks financial performance.
**Target Users:** Fleet Managers, Dispatchers, Safety Officers, Financial Analysts

---

## 2. UI/UX Specification

### 2.1 Layout Structure

**Main Layout:**
- Fixed sidebar navigation (280px width)
- Main content area with header bar
- Responsive: Sidebar collapses to hamburger menu on mobile (<768px)

**Page Sections:**
- **Sidebar:** Logo, navigation menu, user profile section
- **Header:** Page title, search bar, notifications, user avatar
- **Content Area:** Dynamic content based on selected page
- **Modals:** For forms and confirmations

### 2.2 Visual Design

**Color Palette:**
- Primary: `#0F172A` (Dark navy - sidebar background)
- Secondary: `#1E293B` (Slate - cards/panels)
- Accent: `#F59E0B` (Amber - CTAs, highlights)
- Success: `#10B981` (Emerald - available, completed)
- Warning: `#F97316` (Orange - alerts, pending)
- Danger: `#EF4444` (Red - errors, suspended)
- Info: `#3B82F6` (Blue - information)
- Background: `#F1F5F9` (Light gray - main bg)
- Surface: `#FFFFFF` (White - cards)
- Text Primary: `#1E293B`
- Text Secondary: `#64748B`
- Text Muted: `#94A3B8`

**Typography:**
- Font Family: `'DM Sans', sans-serif` (headings), `'IBM Plex Sans', sans-serif` (body)
- Headings: 
  - H1: 32px, 700 weight
  - H2: 24px, 600 weight
  - H3: 20px, 600 weight
  - H4: 16px, 600 weight
- Body: 14px, 400 weight
- Small: 12px, 400 weight

**Spacing System:**
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px

**Visual Effects:**
- Card shadows: `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)`
- Hover shadows: `0 10px 15px -3px rgba(0,0,0,0.1)`
- Border radius: 8px (cards), 6px (buttons), 4px (inputs)
- Transitions: 200ms ease-in-out

### 2.3 Components

**Status Pills:**
- Available: Green background (`#D1FAE5`), green text (`#065F46`)
- On Trip: Blue background (`#DBEAFE`), blue text (`#1E40AF`)
- In Shop: Orange background (`#FED7AA`), orange text (`#9A3412`)
- Retired: Gray background (`#F1F5F9`), gray text (`#475569`)
- Suspended: Red background (`#FEE2E2`), red text (`#991B1B`)
- Draft: Gray background, muted text

**Data Tables:**
- Striped rows (alternate `#F8FAFC`)
- Hover effect on rows
- Sortable columns
- Pagination controls
- Action buttons (view, edit, delete)

**Forms:**
- Floating labels
- Validation states (error, success)
- Select dropdowns with search
- Date pickers
- Number inputs with increment/decrement

**Buttons:**
- Primary: Amber background, dark text
- Secondary: White background, dark border
- Danger: Red background
- Icon buttons: 40px square
- Loading state with spinner

**Cards:**
- White background
- 8px border radius
- Subtle shadow
- Padding: 24px

---

## 3. Functionality Specification

### 3.1 Pages & Features

#### Page 1: Login & Authentication
- Email input field
- Password input field with show/hide toggle
- "Forgot Password" link
- Role selector (Manager, Dispatcher, Safety Officer, Financial Analyst)
- Login button
- Demo credentials display
- Role-Based Access Control (RBAC) - different menu items per role

#### Page 2: Command Center (Dashboard)
- **KPI Cards:**
  - Active Fleet (count of vehicles "On Trip")
  - Maintenance Alerts (vehicles "In Shop")
  - Utilization Rate (percentage)
  - Pending Cargo (shipments waiting)
- **Charts:**
  - Fleet Status Distribution (donut chart)
  - Weekly Trip Trends (bar chart)
- **Quick Actions:**
  - Create New Trip button
  - Add Vehicle button
  - Add Driver button
- **Recent Activity Feed:**
  - Last 10 activities with timestamps
- **Filters:**
  - Vehicle Type (Truck, Van, Bike)
  - Status
  - Region

#### Page 3: Vehicle Registry
- **Data Table Columns:**
  - Vehicle ID (auto-generated)
  - Name/Model
  - License Plate (unique)
  - Type (Truck, Van, Bike)
  - Max Load Capacity (kg)
  - Current Odometer (km)
  - Status
  - Actions
- **Features:**
  - Add New Vehicle button → Modal form
  - Edit vehicle inline
  - Delete with confirmation
  - Toggle "Out of Service" (retire)
  - Search and filter
  - Export to CSV

#### Page 4: Trip Dispatcher
- **Trip Creation Form:**
  - Select Vehicle (dropdown - only available vehicles)
  - Select Driver (dropdown - only available drivers)
  - Origin location
  - Destination location
  - Cargo Weight (kg)
  - Cargo Description
  - Scheduled Date/Time
- **Validation:**
  - Check: CargoWeight > MaxCapacity → Show error
  - Check: Driver license valid for vehicle type
- **Trip Lifecycle:**
  - Draft → Dispatched → Completed → Cancelled
- **Kanban Board View:**
  - Columns: Draft, Dispatched, Completed, Cancelled
- **Data Table:**
  - Trip ID, Vehicle, Driver, Origin, Destination, Status, Date, Actions

#### Page 5: Maintenance & Service Logs
- **Service Log Form:**
  - Select Vehicle
  - Service Type (Oil Change, Tire Rotation, Brake Service, etc.)
  - Description
  - Cost
  - Date
  - Next Service Due (optional)
- **Auto-Logic:**
  - Adding service → Status changes to "In Shop"
  - Completing service → Status changes to "Available"
- **Service History Table:**
  - Vehicle, Service Type, Date, Cost, Status, Actions

#### Page 6: Expenses & Fuel Logging
- **Fuel Log Form:**
  - Select Vehicle
  - Liters
  - Cost
  - Date
  - Odometer Reading
  - Fuel Type (Diesel, Petrol, Electric)
- **Expense Categories:**
  - Fuel, Maintenance, Insurance, Permits, Other
- **Calculation:**
  - Total Operational Cost = Fuel + Maintenance per vehicle
  - Cost per km calculation
- **Summary Cards:**
  - Total Fuel Spend
  - Total Maintenance Cost
  - Average Fuel Efficiency (km/L)

#### Page 7: Driver Profiles
- **Driver Form:**
  - Full Name
  - Email
  - Phone
  - License Number
  - License Category (A, B, C, D)
  - License Expiry Date
  - Hire Date
  - Status (On Duty, Off Duty, Suspended)
- **Compliance Features:**
  - License expiry warning (red highlight if expired)
  - License expiry warning (yellow if expiring within 30 days)
  - Block assignment if license expired
- **Performance Metrics:**
  - Total Trips Completed
  - On-Time Delivery Rate
  - Safety Score (1-10)
- **Status Toggle:**
  - On Duty / Off Duty / Suspended

#### Page 8: Analytics & Reports
- **Metrics:**
  - Fleet Utilization over time
  - Fuel Efficiency by vehicle
  - Vehicle ROI calculation
  - Cost breakdown (pie chart)
  - Trip completion trends
- **Export Features:**
  - CSV Export button
  - PDF Report button (print-friendly view)
- **Date Range Picker:**
  - Last 7 days, 30 days, 90 days, Custom

### 3.2 Data Management

**Local Storage:**
- All data stored in browser localStorage
- Pre-seeded with demo data
- Auto-save on changes

**Demo Data:**
- 10 Vehicles (mix of trucks, vans, bikes)
- 8 Drivers
- 15 Trips (various statuses)
- 20 Service Logs
- 30 Fuel Logs

### 3.3 User Interactions

- Smooth page transitions
- Loading states for async operations
- Toast notifications for actions
- Confirmation modals for destructive actions
- Form validation with error messages
- Keyboard navigation support

---

## 4. Technical Implementation

### 4.1 File Structure
```
fleetflow/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   ├── app.js          # Main application logic
│   ├── data.js         # Demo data and storage
│   ├── pages.js        # Page rendering functions
│   ├── utils.js        # Utility functions
│   └── charts.js       # Chart rendering
└── SPEC.md             # This specification
```

### 4.2 Tech Stack
- Vanilla JavaScript (ES6+)
- CSS3 with CSS Variables
- LocalStorage for data persistence
- No external frameworks (lightweight)

---

## 5. Acceptance Criteria

### 5.1 Authentication
- [ ] Login form accepts email/password
- [ ] Role selector works (Manager, Dispatcher, Safety Officer, Financial Analyst)
- [ ] Different navigation items show based on role
- [ ] Demo login works with pre-seeded credentials

### 5.2 Dashboard
- [ ] All 4 KPI cards display correct counts
- [ ] Charts render correctly
- [ ] Quick action buttons navigate to correct pages
- [ ] Recent activity shows latest 10 items

### 5.3 Vehicle Management
- [ ] Can add new vehicle with all fields
- [ ] Can edit existing vehicle
- [ ] Can delete vehicle with confirmation
- [ ] Can toggle retirement status
- [ ] Table sorts and filters work

### 5.4 Trip Management
- [ ] Can create trip with validation
- [ ] Cargo weight validation prevents overweight
- [ ] Driver license validation works
- [ ] Status updates reflect correctly
- [ ] Kanban board shows trips in columns

### 5.5 Maintenance
- [ ] Can add service log
- [ ] Vehicle status auto-updates to "In Shop"
- [ ] Service history displays correctly

### 5.6 Expenses
- [ ] Can log fuel expenses
- [ ] Can log other expenses
- [ ] Calculations are accurate
- [ ] Summary displays correctly

### 5.7 Drivers
- [ ] Can add/edit drivers
- [ ] License expiry warnings display
- [ ] Performance metrics calculate
- [ ] Status toggle works

### 5.8 Analytics
- [ ] Charts render correctly
- [ ] Date range filtering works
- [ ] Export to CSV works
- [ ] Print-friendly view works

### 5.9 General
- [ ] Responsive on mobile/tablet
- [ ] All animations smooth
- [ ] No console errors
- [ ] Data persists after refresh
