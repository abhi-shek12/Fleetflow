// ========================================
// FleetFlow - Page Rendering
// ========================================

const Pages = (function() {
    'use strict';

    // Icon SVG paths
    const icons = {
        dashboard: '<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>',
        truck: '<path d="M1 3h15v13H1zM16 8h4l3 4v5h-7V8zM5 8v9h6v-9H5zM14 13h2v3h-2v-3z"/>',
        route: '<path d="M3 17h4v-4H3v4zM10 7h4v4h-4V7zm7 10h4v-4h-4v4zM3 7h4v4H3V7zm17 0h-4v4h4V7zm-7-5h-4v4h4V2zM3 2h4v4H3V2zm17 0h-4v4h4V2z"/>',
        tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
        fuel: '<path d="M3 4h18v11H3V4zm3 2v7h12V6H6zm3 9h2v2H9v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM6 10h2v2H6v-2zm4 0h2v2h-2v-2zm-4 4h2v2H6v-2zm4 0h2v2h-2v-2z"/>',
        users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 10v-2a4 4 0 0 0-3-3.87M23 21v-2a4 4 0 0 0-2-3.87"/>',
        chart: '<path d="M18 20V10M12 20V4M6 20v-6"/>',
        search: '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>',
        plus: '<path d="M12 5v14M5 12h14"/>',
        edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
        trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
        eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
        check: '<path d="M20 6L9 17l-5-5"/>',
        x: '<path d="M18 6L6 18M6 6l12 12"/>',
        alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
        calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
        filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
        download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
        printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
        chevronDown: '<polyline points="6 9 12 15 18 9"/>',
        chevronUp: '<polyline points="18 15 12 9 6 15"/>',
        chevronLeft: '<polyline points="15 18 9 12 15 6"/>',
        chevronRight: '<polyline points="9 18 15 12 9 6"/>',
        info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
        clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
        mapPin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'
    };

    // Helper to render icon
    function icon(name, size = 20) {
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icons[name] || ''}</svg>`;
    }

    // Render icon button
    function iconBtn(iconName, onclick, title = '', className = '') {
        return `<button class="btn-icon ${className}" onclick="${onclick}" title="${title}">${icon(iconName)}</button>`;
    }

    // ======================
    // DASHBOARD PAGE
    // ======================
    function renderDashboard() {
        const stats = FleetFlow.getDashboardStats();
        const trips = FleetFlow.getTrips();
        const vehicles = FleetFlow.getVehicles();
        
        // Get recent activity
        const recentTrips = trips
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);

        return `
            <div class="page-content">
                <!-- KPI Cards -->
                <div class="dashboard-grid">
                    <div class="kpi-card">
                        <div class="kpi-icon blue">
                            ${icon('truck')}
                        </div>
                        <div class="kpi-content">
                            <div class="kpi-label">Active Fleet</div>
                            <div class="kpi-value">${stats.activeFleet}</div>
                            <div class="kpi-change up">
                                ${icon('chevronUp')} On Trip
                            </div>
                        </div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-icon orange">
                            ${icon('tool')}
                        </div>
                        <div class="kpi-content">
                            <div class="kpi-label">Maintenance Alerts</div>
                            <div class="kpi-value">${stats.maintenanceAlerts}</div>
                            <div class="kpi-change down">
                                ${icon('chevronDown')} In Shop
                            </div>
                        </div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-icon green">
                            ${icon('chart')}
                        </div>
                        <div class="kpi-content">
                            <div class="kpi-label">Utilization Rate</div>
                            <div class="kpi-value">${stats.utilizationRate}%</div>
                            <div class="kpi-change up">
                                ${icon('chevronUp')} Fleet Active
                            </div>
                        </div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-icon purple">
                            ${icon('route')}
                        </div>
                        <div class="kpi-content">
                            <div class="kpi-label">Pending Cargo</div>
                            <div class="kpi-value">${stats.pendingCargo}</div>
                            <div class="kpi-change">
                                Draft Trips
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="quick-actions">
                    <button class="btn btn-primary" onclick="renderAndSetPage('trips'); openModal('trip-modal')">
                        ${icon('plus')} New Trip
                    </button>
                    <button class="btn btn-secondary" onclick="renderAndSetPage('vehicles'); openModal('vehicle-modal')">
                        ${icon('plus')} Add Vehicle
                    </button>
                    <button class="btn btn-secondary" onclick="renderAndSetPage('drivers'); openModal('driver-modal')">
                        ${icon('plus')} Add Driver
                    </button>
                </div>

                <!-- Charts -->
                <div class="dashboard-charts">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h3 class="chart-title">Weekly Trip Trends</h3>
                        </div>
                        <div class="chart-container" id="trip-trends-chart"></div>
                    </div>
                    <div class="chart-card">
                        <div class="chart-header">
                            <h3 class="chart-title">Fleet Status</h3>
                        </div>
                        <div class="chart-container" id="fleet-status-chart"></div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="activity-card">
                    <div class="data-card-header">
                        <h3 class="data-card-title">Recent Activity</h3>
                        <button class="btn btn-sm btn-secondary" onclick="renderAndSetPage('trips')">View All</button>
                    </div>
                    <ul class="activity-list">
                        ${recentTrips.map(trip => {
                            const vehicle = FleetFlow.getVehicle(trip.vehicleId);
                            const driver = FleetFlow.getDriver(trip.driverId);
                            return `
                                <li class="activity-item">
                                    <div class="activity-icon" style="background: ${getStatusColor(trip.status)}20; color: ${getStatusColor(trip.status)};">
                                        ${icon('truck')}
                                    </div>
                                    <div class="activity-content">
                                        <div class="activity-text">
                                            <strong>${vehicle?.name || 'Unknown'}</strong> - ${trip.origin} to ${trip.destination}
                                        </div>
                                        <div class="activity-time">${Utils.formatDateTime(trip.createdAt)} • ${driver?.name || 'Unassigned'}</div>
                                    </div>
                                    <span class="status-pill ${trip.status}">${trip.status}</span>
                                </li>
                            `;
                        }).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    // ======================
    // VEHICLES PAGE
    // ======================
    function renderVehicles() {
        const vehicles = FleetFlow.getVehicles();
        
        return `
            <div class="data-card">
                <div class="data-card-header">
                    <h3 class="data-card-title">Vehicle Registry</h3>
                    <div class="data-card-actions">
                        <div class="search-input">
                            ${icon('search')}
                            <input type="text" placeholder="Search vehicles..." id="vehicle-search" onkeyup="filterVehicles()">
                        </div>
                        <select class="filter-select" id="vehicle-type-filter" onchange="filterVehicles()">
                            <option value="">All Types</option>
                            <option value="Truck">Truck</option>
                            <option value="Van">Van</option>
                            <option value="Bike">Bike</option>
                        </select>
                        <select class="filter-select" id="vehicle-status-filter" onchange="filterVehicles()">
                            <option value="">All Status</option>
                            <option value="available">Available</option>
                            <option value="on-trip">On Trip</option>
                            <option value="in-shop">In Shop</option>
                            <option value="retired">Retired</option>
                        </select>
                        <button class="btn btn-primary btn-sm" onclick="openModal('vehicle-modal')">
                            ${icon('plus')} Add Vehicle
                        </button>
                    </div>
                </div>
                <div class="table-container">
                    <table class="data-table" id="vehicles-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name/Model</th>
                                <th>License Plate</th>
                                <th>Type</th>
                                <th>Capacity (kg)</th>
                                <th>Odometer (km)</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${vehicles.map(vehicle => `
                                <tr data-vehicle-id="${vehicle.id}">
                                    <td><strong>${vehicle.id}</strong></td>
                                    <td>${vehicle.name}<br><span class="text-muted">${vehicle.model}</span></td>
                                    <td><code>${vehicle.licensePlate}</code></td>
                                    <td>${vehicle.type}</td>
                                    <td>${vehicle.maxCapacity.toLocaleString()}</td>
                                    <td>${vehicle.currentOdometer.toLocaleString()}</td>
                                    <td><span class="status-pill ${vehicle.status}">${formatStatus(vehicle.status)}</span></td>
                                    <td class="table-actions">
                                        ${iconBtn('eye', `viewVehicle('${vehicle.id}')`, 'View')}
                                        ${iconBtn('edit', `editVehicle('${vehicle.id}')`, 'Edit')}
                                        ${iconBtn('trash', `deleteVehicle('${vehicle.id}')`, 'Delete', 'text-danger')}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // ======================
    // TRIPS PAGE
    // ======================
    function renderTrips() {
        const trips = FleetFlow.getTrips();
        const vehicles = FleetFlow.getVehicles().filter(v => v.status !== 'retired');
        const drivers = FleetFlow.getDrivers();

        const tripsByStatus = {
            draft: trips.filter(t => t.status === 'draft'),
            dispatched: trips.filter(t => t.status === 'dispatched'),
            completed: trips.filter(t => t.status === 'completed'),
            cancelled: trips.filter(t => t.status === 'cancelled')
        };

        return `
            <div class="page-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                    <h2>Trip Dispatcher</h2>
                    <button class="btn btn-primary" onclick="openModal('trip-modal')">
                        ${icon('plus')} Create Trip
                    </button>
                </div>

                <!-- Kanban Board -->
                <div class="kanban-board">
                    ${Object.entries(tripsByStatus).map(([status, statusTrips]) => `
                        <div class="kanban-column">
                            <div class="kanban-header">
                                <span class="kanban-title">
                                    ${formatStatus(status)} 
                                    <span class="kanban-count">${statusTrips.length}</span>
                                </span>
                            </div>
                            <div class="kanban-cards">
                                ${statusTrips.map(trip => {
                                    const vehicle = FleetFlow.getVehicle(trip.vehicleId);
                                    const driver = FleetFlow.getDriver(trip.driverId);
                                    return `
                                        <div class="kanban-card ${trip.status}" onclick="viewTrip('${trip.id}')">
                                            <div class="kanban-card-title">Trip ${trip.id}</div>
                                            <div class="kanban-card-info">
                                                <span>${icon('truck')} ${vehicle?.name || 'Unassigned'}</span>
                                                <span>${icon('users')} ${driver?.name || 'Unassigned'}</span>
                                                <span>${icon('mapPin')} ${trip.origin.substring(0, 20)}...</span>
                                                <span>${icon('calendar')} ${Utils.formatDate(trip.scheduledDate)}</span>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                                ${statusTrips.length === 0 ? '<p class="text-muted" style="text-align: center; padding: 20px;">No trips</p>' : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // ======================
    // MAINTENANCE PAGE
    // ======================
    function renderMaintenance() {
        const services = FleetFlow.getServices();
        const vehicles = FleetFlow.getVehicles();

        return `
            <div class="data-card">
                <div class="data-card-header">
                    <h3 class="data-card-title">Maintenance & Service Logs</h3>
                    <div class="data-card-actions">
                        <button class="btn btn-primary btn-sm" onclick="openModal('service-modal')">
                            ${icon('plus')} Add Service Log
                        </button>
                    </div>
                </div>
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Service ID</th>
                                <th>Vehicle</th>
                                <th>Service Type</th>
                                <th>Description</th>
                                <th>Cost</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${services.map(service => {
                                const vehicle = FleetFlow.getVehicle(service.vehicleId);
                                return `
                                    <tr>
                                        <td><strong>${service.id}</strong></td>
                                        <td>${vehicle?.name || 'Unknown'}</td>
                                        <td>${service.serviceType}</td>
                                        <td>${service.description}</td>
                                        <td>${Utils.formatCurrency(service.cost)}</td>
                                        <td>${Utils.formatDate(service.date)}</td>
                                        <td><span class="status-pill ${service.status === 'completed' ? 'completed' : 'in-shop'}">${formatStatus(service.status)}</span></td>
                                        <td class="table-actions">
                                            ${iconBtn('eye', `viewService('${service.id}')`, 'View')}
                                            ${iconBtn('trash', `deleteService('${service.id}')`, 'Delete', 'text-danger')}
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // ======================
    // EXPENSES PAGE
    // ======================
    function renderExpenses() {
        const expenses = FleetFlow.getExpenses();
        const vehicles = FleetFlow.getVehicles();

        const fuelTotal = expenses.filter(e => e.type === 'fuel').reduce((sum, e) => sum + e.cost, 0);
        const maintenanceTotal = expenses.filter(e => e.type === 'maintenance').reduce((sum, e) => sum + e.cost, 0);
        const totalOperational = fuelTotal + maintenanceTotal;

        return `
            <div class="page-content">
                <!-- Expense Summary -->
                <div class="expense-summary">
                    <div class="expense-card">
                        <div class="expense-card-header">
                            <div class="expense-card-icon fuel">
                                ${icon('fuel')}
                            </div>
                            <div>
                                <div class="expense-card-value">${Utils.formatCurrency(fuelTotal)}</div>
                                <div class="expense-card-label">Total Fuel Cost</div>
                            </div>
                        </div>
                    </div>
                    <div class="expense-card">
                        <div class="expense-card-header">
                            <div class="expense-card-icon maintenance">
                                ${icon('tool')}
                            </div>
                            <div>
                                <div class="expense-card-value">${Utils.formatCurrency(maintenanceTotal)}</div>
                                <div class="expense-card-label">Total Maintenance</div>
                            </div>
                        </div>
                    </div>
                    <div class="expense-card">
                        <div class="expense-header">
                            <div class="expense-card-icon total">
                                ${icon('chart')}
                            </div>
                            <div>
                                <div class="expense-card-value">${Utils.formatCurrency(totalOperational)}</div>
                                <div class="expense-card-label">Operational Cost</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="data-card">
                    <div class="data-card-header">
                        <h3 class="data-card-title">Fuel & Expense Logs</h3>
                        <div class="data-card-actions">
                            <button class="btn btn-primary btn-sm" onclick="openModal('expense-modal')">
                                ${icon('plus')} Add Expense
                            </button>
                        </div>
                    </div>
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Vehicle</th>
                                    <th>Type</th>
                                    <th>Liters</th>
                                    <th>Cost</th>
                                    <th>Date</th>
                                    <th>Odometer</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${expenses.map(expense => {
                                    const vehicle = FleetFlow.getVehicle(expense.vehicleId);
                                    return `
                                        <tr>
                                            <td><strong>${expense.id}</strong></td>
                                            <td>${vehicle?.name || 'Unknown'}</td>
                                            <td><span class="status-pill ${expense.type}">${expense.type}</span></td>
                                            <td>${expense.liters || '-'}</td>
                                            <td>${Utils.formatCurrency(expense.cost)}</td>
                                            <td>${Utils.formatDate(expense.date)}</td>
                                            <td>${expense.odometer?.toLocaleString() || '-'}</td>
                                            <td>${expense.notes || '-'}</td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    // ======================
    // DRIVERS PAGE
    // ======================
    function renderDrivers() {
        const drivers = FleetFlow.getDrivers();

        return `
            <div class="page-content">
                <div class="data-card-header" style="background: white; border-radius: 8px; margin-bottom: 24px; padding: 24px;">
                    <h3 class="data-card-title">Driver Profiles</h3>
                    <button class="btn btn-primary btn-sm" onclick="openModal('driver-modal')">
                        ${icon('plus')} Add Driver
                    </button>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px;">
                    ${drivers.map(driver => {
                        const licenseStatus = getLicenseStatus(driver.licenseExpiry);
                        const completionRate = driver.totalTrips > 0 ? Math.round((driver.completedTrips / driver.totalTrips) * 100) : 0;
                        
                        return `
                            <div class="driver-card">
                                <div class="driver-header">
                                    <div class="driver-avatar">${driver.avatar}</div>
                                    <div class="driver-info">
                                        <h3>${driver.name}</h3>
                                        <p>${driver.email}</p>
                                        <p>${driver.phone}</p>
                                    </div>
                                </div>
                                
                                ${licenseStatus !== 'valid' ? `
                                    <div class="license-warning ${licenseStatus === 'expired' ? 'license-error' : ''}">
                                        ${icon('alert')}
                                        License ${licenseStatus === 'expired' ? 'expired' : 'expiring soon'} on ${Utils.formatDate(driver.licenseExpiry)}
                                    </div>
                                ` : ''}
                                
                                <div class="driver-stats">
                                    <div class="driver-stat">
                                        <div class="driver-stat-value">${driver.totalTrips}</div>
                                        <div class="driver-stat-label">Total Trips</div>
                                    </div>
                                    <div class="driver-stat">
                                        <div class="driver-stat-value">${completionRate}%</div>
                                        <div class="driver-stat-label">Completion Rate</div>
                                    </div>
                                    <div class="driver-stat">
                                        <div class="driver-stat-value">${driver.safetyScore}</div>
                                        <div class="driver-stat-label">Safety Score</div>
                                    </div>
                                </div>
                                
                                <div style="display: flex; gap: 8px; margin-bottom: 16px;">
                                    <span class="status-pill ${driver.status}">${formatStatus(driver.status)}</span>
                                    <span class="status-pill">${driver.licenseCategory}</span>
                                </div>
                                
                                <div class="driver-actions">
                                    <button class="btn btn-sm btn-secondary" onclick="editDriver('${driver.id}')">
                                        ${icon('edit')} Edit
                                    </button>
                                    <button class="btn btn-sm btn-danger" onclick="deleteDriver('${driver.id}')">
                                        ${icon('trash')} Delete
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    // ======================
    // ANALYTICS PAGE
    // ======================
    function renderAnalytics() {
        const stats = FleetFlow.getDashboardStats();

        return `
            <div class="page-content">
                <!-- Date Range & Export -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                    <div class="date-range-picker">
                        <button class="date-range-btn active">7 Days</button>
                        <button class="date-range-btn">30 Days</button>
                        <button class="date-range-btn">90 Days</button>
                        <button class="date-range-btn">Custom</button>
                    </div>
                    <div class="export-buttons">
                        <button class="export-btn" onclick="exportToCSV()">
                            ${icon('download')} CSV
                        </button>
                        <button class="export-btn" onclick="window.print()">
                            ${icon('printer')} Print
                        </button>
                    </div>
                </div>

                <!-- Analytics Stats -->
                <div class="analytics-stats">
                    <div class="analytics-stat">
                        <div class="analytics-stat-value">${stats.totalVehicles}</div>
                        <div class="analytics-stat-label">Total Vehicles</div>
                    </div>
                    <div class="analytics-stat">
                        <div class="analytics-stat-value">${stats.completedTrips}</div>
                        <div class="analytics-stat-label">Completed Trips</div>
                    </div>
                    <div class="analytics-stat">
                        <div class="analytics-stat-value">${Utils.formatCurrency(stats.totalFuelCost)}</div>
                        <div class="analytics-stat-label">Total Fuel Cost</div>
                    </div>
                    <div class="analytics-stat">
                        <div class="analytics-stat-value">${stats.utilizationRate}%</div>
                        <div class="analytics-stat-label">Utilization Rate</div>
                    </div>
                </div>

                <!-- Charts Grid -->
                <div class="analytics-grid">
                    <div class="analytics-card">
                        <div class="analytics-header">
                            <h3 class="analytics-title">Fuel Efficiency by Vehicle</h3>
                        </div>
                        <div class="chart-container" id="fuel-efficiency-chart" style="height: 250px;"></div>
                    </div>
                    
                    <div class="analytics-card">
                        <div class="analytics-header">
                            <h3 class="analytics-title">Cost Breakdown</h3>
                        </div>
                        <div class="chart-container" id="cost-breakdown-chart" style="height: 250px;"></div>
                    </div>
                    
                    <div class="analytics-card full-width">
                        <div class="analytics-header">
                            <h3 class="analytics-title">Vehicle ROI</h3>
                        </div>
                        <div class="chart-container" id="vehicle-roi-chart" style="height: 250px;"></div>
                    </div>
                </div>
            </div>
        `;
    }

    // ======================
    // MODALS
    // ======================

    // Vehicle Modal
    function renderVehicleModal(vehicle = null) {
        const isEdit = !!vehicle;
        return `
            <div class="modal-overlay" id="vehicle-modal-overlay" onclick="closeModalOnOverlay(event, 'vehicle-modal')">
                <div class="modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3 class="modal-title">${isEdit ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
                        <button class="modal-close" onclick="closeModal('vehicle-modal')">${icon('x')}</button>
                    </div>
                    <form class="modal-body" onsubmit="saveVehicle(event, '${vehicle?.id || ''}')">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Vehicle Name <span class="required">*</span></label>
                                <input type="text" name="name" value="${vehicle?.name || ''}" required placeholder="e.g., Ford Transit">
                            </div>
                            <div class="form-group">
                                <label>Model</label>
                                <input type="text" name="model" value="${vehicle?.model || ''}" placeholder="e.g., Transit 350L">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>License Plate <span class="required">*</span></label>
                                <input type="text" name="licensePlate" value="${vehicle?.licensePlate || ''}" required placeholder="e.g., ABC-1234">
                            </div>
                            <div class="form-group">
                                <label>Vehicle Type <span class="required">*</span></label>
                                <select name="type" required>
                                    <option value="">Select Type</option>
                                    <option value="Truck" ${vehicle?.type === 'Truck' ? 'selected' : ''}>Truck</option>
                                    <option value="Van" ${vehicle?.type === 'Van' ? 'selected' : ''}>Van</option>
                                    <option value="Bike" ${vehicle?.type === 'Bike' ? 'selected' : ''}>Bike</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Max Capacity (kg) <span class="required">*</span></label>
                                <input type="number" name="maxCapacity" value="${vehicle?.maxCapacity || ''}" required min="0" placeholder="e.g., 1500">
                            </div>
                            <div class="form-group">
                                <label>Current Odometer (km)</label>
                                <input type="number" name="currentOdometer" value="${vehicle?.currentOdometer || ''}" min="0" placeholder="e.g., 45000">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Fuel Type</label>
                                <select name="fuelType">
                                    <option value="Diesel" ${vehicle?.fuelType === 'Diesel' ? 'selected' : ''}>Diesel</option>
                                    <option value="Petrol" ${vehicle?.fuelType === 'Petrol' ? 'selected' : ''}>Petrol</option>
                                    <option value="Electric" ${vehicle?.fuelType === 'Electric' ? 'selected' : ''}>Electric</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Region</label>
                                <select name="region">
                                    <option value="North" ${vehicle?.region === 'North' ? 'selected' : ''}>North</option>
                                    <option value="South" ${vehicle?.region === 'South' ? 'selected' : ''}>South</option>
                                    <option value="East" ${vehicle?.region === 'East' ? 'selected' : ''}>East</option>
                                    <option value="West" ${vehicle?.region === 'West' ? 'selected' : ''}>West</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row single">
                            <div class="form-group">
                                <label>Status</label>
                                <select name="status">
                                    <option value="available" ${vehicle?.status === 'available' ? 'selected' : ''}>Available</option>
                                    <option value="in-shop" ${vehicle?.status === 'in-shop' ? 'selected' : ''}>In Shop</option>
                                    <option value="retired" ${vehicle?.status === 'retired' ? 'selected' : ''}>Retired</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onclick="closeModal('vehicle-modal')">Cancel</button>
                            <button type="submit" class="btn btn-primary">${isEdit ? 'Update' : 'Add'} Vehicle</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    // Trip Modal
    function renderTripModal() {
        const vehicles = FleetFlow.getVehicles().filter(v => v.status !== 'retired' && v.status !== 'in-shop');
        const drivers = FleetFlow.getDrivers().filter(d => d.status !== 'suspended');

        return `
            <div class="modal-overlay" id="trip-modal-overlay" onclick="closeModalOnOverlay(event, 'trip-modal')">
                <div class="modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3 class="modal-title">Create New Trip</h3>
                        <button class="modal-close" onclick="closeModal('trip-modal')">${icon('x')}</button>
                    </div>
                    <form class="modal-body" onsubmit="saveTrip(event)">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Vehicle <span class="required">*</span></label>
                                <select name="vehicleId" id="trip-vehicle" required onchange="checkVehicleCapacity()">
                                    <option value="">Select Vehicle</option>
                                    ${vehicles.map(v => `
                                        <option value="${v.id}" data-capacity="${v.maxCapacity}">${v.name} (${v.licensePlate}) - ${v.maxCapacity}kg</option>
                                    `).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Driver <span class="required">*</span></label>
                                <select name="driverId" id="trip-driver" required>
                                    <option value="">Select Driver</option>
                                    ${drivers.map(d => `
                                        <option value="${d.id}" data-license="${d.licenseCategory}">${d.name} (${d.licenseCategory})</option>
                                    `).join('')}
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Origin <span class="required">*</span></label>
                                <input type="text" name="origin" required placeholder="e.g., Warehouse A - North">
                            </div>
                            <div class="form-group">
                                <label>Destination <span class="required">*</span></label>
                                <input type="text" name="destination" required placeholder="e.g., Customer Site - Downtown">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Cargo Weight (kg) <span class="required">*</span></label>
                                <input type="number" name="cargoWeight" id="cargo-weight" required min="0" placeholder="e.g., 500" onchange="checkVehicleCapacity()">
                                <div class="form-help" id="capacity-warning"></div>
                            </div>
                            <div class="form-group">
                                <label>Scheduled Date <span class="required">*</span></label>
                                <input type="date" name="scheduledDate" required>
                            </div>
                        </div>
                        <div class="form-row single">
                            <div class="form-group">
                                <label>Cargo Description</label>
                                <textarea name="cargoDescription" rows="2" placeholder="e.g., Electronics - 15 boxes"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onclick="closeModal('trip-modal')">Cancel</button>
                            <button type="submit" class="btn btn-primary">Create Trip</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    // Driver Modal
    function renderDriverModal(driver = null) {
        const isEdit = !!driver;
        return `
            <div class="modal-overlay" id="driver-modal-overlay" onclick="closeModalOnOverlay(event, 'driver-modal')">
                <div class="modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3 class="modal-title">${isEdit ? 'Edit Driver' : 'Add New Driver'}</h3>
                        <button class="modal-close" onclick="closeModal('driver-modal')">${icon('x')}</button>
                    </div>
                    <form class="modal-body" onsubmit="saveDriver(event, '${driver?.id || ''}')">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Full Name <span class="required">*</span></label>
                                <input type="text" name="name" value="${driver?.name || ''}" required placeholder="e.g., John Smith">
                            </div>
                            <div class="form-group">
                                <label>Email <span class="required">*</span></label>
                                <input type="email" name="email" value="${driver?.email || ''}" required placeholder="e.g., john@fleetflow.com">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Phone <span class="required">*</span></label>
                                <input type="tel" name="phone" value="${driver?.phone || ''}" required placeholder="e.g., +1 (555) 123-4567">
                            </div>
                            <div class="form-group">
                                <label>License Number <span class="required">*</span></label>
                                <input type="text" name="licenseNumber" value="${driver?.licenseNumber || ''}" required placeholder="e.g., DL00123456">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>License Category <span class="required">*</span></label>
                                <select name="licenseCategory" required>
                                    <option value="">Select Category</option>
                                    <option value="A" ${driver?.licenseCategory === 'A' ? 'selected' : ''}>A (Motorcycle)</option>
                                    <option value="B" ${driver?.licenseCategory === 'B' ? 'selected' : ''}>B (Car/Van)</option>
                                    <option value="C" ${driver?.licenseCategory === 'C' ? 'selected' : ''}>C (Large Goods)</option>
                                    <option value="D" ${driver?.licenseCategory === 'D' ? 'selected' : ''}>D (Bus)</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>License Expiry <span class="required">*</span></label>
                                <input type="date" name="licenseExpiry" value="${driver?.licenseExpiry || ''}" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Hire Date</label>
                                <input type="date" name="hireDate" value="${driver?.hireDate || ''}">
                            </div>
                            <div class="form-group">
                                <label>Status</label>
                                <select name="status">
                                    <option value="on-duty" ${driver?.status === 'on-duty' ? 'selected' : ''}>On Duty</option>
                                    <option value="off-duty" ${driver?.status === 'off-duty' ? 'selected' : ''}>Off Duty</option>
                                    <option value="suspended" ${driver?.status === 'suspended' ? 'selected' : ''}>Suspended</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onclick="closeModal('driver-modal')">Cancel</button>
                            <button type="submit" class="btn btn-primary">${isEdit ? 'Update' : 'Add'} Driver</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    // Service Modal
    function renderServiceModal() {
        const vehicles = FleetFlow.getVehicles();
        
        return `
            <div class="modal-overlay" id="service-modal-overlay" onclick="closeModalOnOverlay(event, 'service-modal')">
                <div class="modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3 class="modal-title">Add Service Log</h3>
                        <button class="modal-close" onclick="closeModal('service-modal')">${icon('x')}</button>
                    </div>
                    <form class="modal-body" onsubmit="saveService(event)">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Vehicle <span class="required">*</span></label>
                                <select name="vehicleId" required onchange="updateVehicleStatus(this)">
                                    <option value="">Select Vehicle</option>
                                    ${vehicles.map(v => `
                                        <option value="${v.id}">${v.name} (${v.licensePlate})</option>
                                    `).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Service Type <span class="required">*</span></label>
                                <select name="serviceType" required>
                                    <option value="">Select Type</option>
                                    <option value="Oil Change">Oil Change</option>
                                    <option value="Tire Rotation">Tire Rotation</option>
                                    <option value="Brake Service">Brake Service</option>
                                    <option value="Air Filter">Air Filter</option>
                                    <option value="Transmission Service">Transmission Service</option>
                                    <option value="Annual Inspection">Annual Inspection</option>
                                    <option value="Battery Replacement">Battery Replacement</option>
                                    <option value="General Service">General Service</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Cost <span class="required">*</span></label>
                                <input type="number" name="cost" required min="0" step="0.01" placeholder="e.g., 250">
                            </div>
                            <div class="form-group">
                                <label>Service Date <span class="required">*</span></label>
                                <input type="date" name="date" required>
                            </div>
                        </div>
                        <div class="form-row single">
                            <div class="form-group">
                                <label>Description</label>
                                <textarea name="description" rows="2" placeholder="Describe the service performed..."></textarea>
                            </div>
                        </div>
                        <div class="form-row single">
                            <div class="form-group">
                                <label>Next Service Due</label>
                                <input type="date" name="nextServiceDue">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onclick="closeModal('service-modal')">Cancel</button>
                            <button type="submit" class="btn btn-primary">Add Service Log</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    // Expense Modal
    function renderExpenseModal() {
        const vehicles = FleetFlow.getVehicles();
        
        return `
            <div class="modal-overlay" id="expense-modal-overlay" onclick="closeModalOnOverlay(event, 'expense-modal')">
                <div class="modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3 class="modal-title">Add Expense</h3>
                        <button class="modal-close" onclick="closeModal('expense-modal')">${icon('x')}</button>
                    </div>
                    <form class="modal-body" onsubmit="saveExpense(event)">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Vehicle <span class="required">*</span></label>
                                <select name="vehicleId" required>
                                    <option value="">Select Vehicle</option>
                                    ${vehicles.map(v => `
                                        <option value="${v.id}">${v.name} (${v.licensePlate})</option>
                                    `).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Expense Type <span class="required">*</span></label>
                                <select name="type" id="expense-type" required onchange="toggleFuelFields()">
                                    <option value="">Select Type</option>
                                    <option value="fuel">Fuel</option>
                                    <option value="maintenance">Maintenance</option>
                                    <option value="insurance">Insurance</option>
                                    <option value="permits">Permits</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div id="fuel-fields" style="display: none;">
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Liters</label>
                                    <input type="number" name="liters" min="0" step="0.01" placeholder="e.g., 45">
                                </div>
                                <div class="form-group">
                                    <label>Fuel Type</label>
                                    <select name="fuelType">
                                        <option value="Diesel">Diesel</option>
                                        <option value="Petrol">Petrol</option>
                                        <option value="Electric">Electric</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Cost <span class="required">*</span></label>
                                <input type="number" name="cost" required min="0" step="0.01" placeholder="e.g., 72">
                            </div>
                            <div class="form-group">
                                <label>Date <span class="required">*</span></label>
                                <input type="date" name="date" required>
                            </div>
                        </div>
                        <div class="form-row single">
                            <div class="form-group">
                                <label>Odometer Reading</label>
                                <input type="number" name="odometer" min="0" placeholder="e.g., 45230">
                            </div>
                        </div>
                        <div class="form-row single">
                            <div class="form-group">
                                <label>Notes</label>
                                <textarea name="notes" rows="2" placeholder="Additional notes..."></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onclick="closeModal('expense-modal')">Cancel</button>
                            <button type="submit" class="btn btn-primary">Add Expense</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    // Helper functions
    function getStatusColor(status) {
        const colors = {
            'available': '#10B981',
            'on-trip': '#3B82F6',
            'in-shop': '#F97316',
            'retired': '#64748B',
            'completed': '#10B981',
            'dispatched': '#3B82F6',
            'draft': '#64748B',
            'cancelled': '#EF4444',
            'suspended': '#EF4444',
            'on-duty': '#10B981',
            'off-duty': '#64748B',
            'fuel': '#F97316',
            'maintenance': '#3B82F6',
            'insurance': '#8B5CF6',
            'permits': '#10B981',
            'other': '#64748B'
        };
        return colors[status] || '#64748B';
    }

    function formatStatus(status) {
        return status ? status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '-';
    }

    function getLicenseStatus(expiryDate) {
        if (!expiryDate) return 'unknown';
        const expiry = new Date(expiryDate);
        const now = new Date();
        const daysUntilExpiry = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
        
        if (daysUntilExpiry < 0) return 'expired';
        if (daysUntilExpiry < 30) return 'warning';
        return 'valid';
    }

    // Export public API
    return {
        renderDashboard,
        renderVehicles,
        renderTrips,
        renderMaintenance,
        renderExpenses,
        renderDrivers,
        renderAnalytics,
        renderVehicleModal,
        renderTripModal,
        renderDriverModal,
        renderServiceModal,
        renderExpenseModal,
        icon
    };
})();
