// ========================================
// FleetFlow - Main Application
// ========================================

(function() {
    'use strict';

    // Application State
    let currentUser = null;
    let currentPage = 'dashboard';
    let navigation = [];

    // Initialize Application
    function init() {
        // Check for saved user session
        const savedUser = FleetFlow.getUser();
        if (savedUser) {
            currentUser = savedUser;
            showApp();
        }

        // Setup login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }

        // Update login page stats
        updateLoginStats();
    }

    // Handle Login
    function handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const role = document.getElementById('login-role').value;

        // Simple validation (demo purposes)
        if (!email || !password) {
            showToast('error', 'Error', 'Please enter email and password');
            return;
        }

        // Create user object
        currentUser = {
            email,
            role,
            name: getRoleName(role),
            avatar: getRoleName(role).charAt(0)
        };

        // Save session
        FleetFlow.saveUser(currentUser);

        // Show app
        showApp();
        showToast('success', 'Welcome!', `Logged in as ${getRoleName(role)}`);
    }

    // Show Main App
    function showApp() {
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');

        // Setup navigation based on role
        setupNavigation();

        // Update user info
        document.getElementById('user-name').textContent = currentUser.name;
        document.getElementById('user-role').textContent = getRoleName(currentUser.role);
        document.getElementById('user-avatar').textContent = currentUser.avatar;

        // Render initial page
        renderPage('dashboard');
    }

    // Setup Navigation
    function setupNavigation() {
        navigation = FleetFlow.getNavigationByRole(currentUser.role);
        
        const navMenu = document.getElementById('nav-menu');
        navMenu.innerHTML = navigation.map(item => `
            <li class="nav-item">
                <a href="#" class="nav-link ${item.page === currentPage ? 'active' : ''}" 
                   onclick="renderAndSetPage('${item.page}')">
                    ${Pages.icon(item.icon)}
                    <span>${item.label}</span>
                </a>
            </li>
        `).join('');
    }

    // Get Role Display Name
    function getRoleName(role) {
        const roles = {
            'manager': 'Fleet Manager',
            'dispatcher': 'Dispatcher',
            'safety': 'Safety Officer',
            'finance': 'Financial Analyst'
        };
        return roles[role] || 'User';
    }

    // Render Page
    function renderPage(page) {
        currentPage = page;
        
        // Update navigation active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.onclick && link.onclick.toString().includes(page)) {
                link.classList.add('active');
            }
        });

        // Update page title
        const navItem = navigation.find(n => n.page === page);
        document.getElementById('page-title').textContent = navItem ? navItem.label : 'Dashboard';

        // Render content
        const content = document.getElementById('page-content');
        
        let html = '';
        switch (page) {
            case 'dashboard':
                html = Pages.renderDashboard();
                // Render charts after DOM is updated
                setTimeout(() => {
                    Charts.renderFleetStatusChart('fleet-status-chart');
                    Charts.renderTripTrendsChart('trip-trends-chart');
                }, 100);
                break;
            case 'vehicles':
                html = Pages.renderVehicles();
                break;
            case 'trips':
                html = Pages.renderTrips();
                break;
            case 'maintenance':
                html = Pages.renderMaintenance();
                break;
            case 'expenses':
                html = Pages.renderExpenses();
                break;
            case 'drivers':
                html = Pages.renderDrivers();
                break;
            case 'analytics':
                html = Pages.renderAnalytics();
                // Render analytics charts
                setTimeout(() => {
                    Charts.renderFuelEfficiencyChart('fuel-efficiency-chart');
                    Charts.renderCostBreakdownChart('cost-breakdown-chart');
                    Charts.renderVehicleROIChart('vehicle-roi-chart');
                }, 100);
                break;
            default:
                html = Pages.renderDashboard();
        }

        content.innerHTML = html;
    }

    // Render and Set Page (for onclick handlers)
    window.renderAndSetPage = function(page) {
        renderPage(page);
    };

    // Toggle Password Visibility
    window.togglePassword = function() {
        const input = document.getElementById('login-password');
        const btn = document.querySelector('.toggle-password svg');
        if (input.type === 'password') {
            input.type = 'text';
            btn.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/>';
        } else {
            input.type = 'password';
            btn.innerHTML = '<path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>';
        }
    };

    // Toggle Sidebar (Mobile)
    window.toggleSidebar = function() {
        document.querySelector('.sidebar').classList.toggle('active');
    };

    // Logout
    window.logout = function() {
        FleetFlow.clearUser();
        currentUser = null;
        document.getElementById('app').classList.add('hidden');
        document.getElementById('login-page').classList.remove('hidden');
        showToast('info', 'Logged Out', 'You have been logged out successfully');
    };

    // Modal Functions
    window.openModal = function(modalId) {
        const modalContainer = document.getElementById('modal-container');
        let html = '';
        
        switch (modalId) {
            case 'vehicle-modal':
                html = Pages.renderVehicleModal();
                break;
            case 'trip-modal':
                html = Pages.renderTripModal();
                break;
            case 'driver-modal':
                html = Pages.renderDriverModal();
                break;
            case 'service-modal':
                html = Pages.renderServiceModal();
                break;
            case 'expense-modal':
                html = Pages.renderExpenseModal();
                break;
        }
        
        modalContainer.innerHTML = html;
        
        // Add animation class
        setTimeout(() => {
            const overlay = document.getElementById(`${modalId}-overlay`);
            if (overlay) overlay.classList.add('active');
        }, 10);
    };

    window.closeModal = function(modalId) {
        const overlay = document.getElementById(`${modalId}-overlay`);
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => {
                document.getElementById('modal-container').innerHTML = '';
            }, 200);
        }
    };

    window.closeModalOnOverlay = function(e, modalId) {
        if (e.target.id === `${modalId}-overlay`) {
            closeModal(modalId);
        }
    };

    // Vehicle Functions
    window.saveVehicle = function(e, id) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const vehicle = Object.fromEntries(formData.entries());
        
        if (id) {
            vehicle.id = id;
            FleetFlow.saveVehicle(vehicle);
            showToast('success', 'Success', 'Vehicle updated successfully');
        } else {
            FleetFlow.saveVehicle(vehicle);
            showToast('success', 'Success', 'Vehicle added successfully');
        }
        
        closeModal('vehicle-modal');
        renderPage('vehicles');
    };

    window.editVehicle = function(id) {
        const vehicle = FleetFlow.getVehicle(id);
        if (vehicle) {
            document.getElementById('modal-container').innerHTML = Pages.renderVehicleModal(vehicle);
            setTimeout(() => {
                document.getElementById('vehicle-modal-overlay').classList.add('active');
            }, 10);
        }
    };

    window.deleteVehicle = function(id) {
        if (confirm('Are you sure you want to delete this vehicle?')) {
            FleetFlow.deleteVehicle(id);
            showToast('success', 'Deleted', 'Vehicle deleted successfully');
            renderPage('vehicles');
        }
    };

    window.viewVehicle = function(id) {
        const vehicle = FleetFlow.getVehicle(id);
        if (vehicle) {
            alert(`Vehicle Details:\n\nName: ${vehicle.name}\nModel: ${vehicle.model}\nLicense: ${vehicle.licensePlate}\nType: ${vehicle.type}\nCapacity: ${vehicle.maxCapacity}kg\nOdometer: ${vehicle.currentOdometer}km\nStatus: ${vehicle.status}`);
        }
    };

    window.filterVehicles = function() {
        const search = document.getElementById('vehicle-search').value.toLowerCase();
        const typeFilter = document.getElementById('vehicle-type-filter').value;
        const statusFilter = document.getElementById('vehicle-status-filter').value;
        
        const rows = document.querySelectorAll('#vehicles-table tbody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const type = row.cells[3].textContent;
            const status = row.cells[6].textContent.toLowerCase().replace(' ', '-');
            
            let show = text.includes(search);
            if (typeFilter && type !== typeFilter) show = false;
            if (statusFilter && !status.includes(statusFilter)) show = false;
            
            row.style.display = show ? '' : 'none';
        });
    };

    // Trip Functions
    window.saveTrip = function(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const trip = Object.fromEntries(formData.entries());
        
        // Validate cargo weight
        const vehicleSelect = form.querySelector('[name="vehicleId"]');
        const selectedOption = vehicleSelect.options[vehicleSelect.selectedIndex];
        const maxCapacity = parseInt(selectedOption.dataset.capacity);
        const cargoWeight = parseInt(trip.cargoWeight);
        
        if (cargoWeight > maxCapacity) {
            showToast('error', 'Validation Error', `Cargo weight (${cargoWeight}kg) exceeds vehicle capacity (${maxCapacity}kg)`);
            return;
        }
        
        // Check driver license
        const driverId = trip.driverId;
        const vehicleType = selectedOption.textContent.includes('Truck') ? 'C' : 
                          selectedOption.textContent.includes('Van') ? 'B' : 'A';
        
        // Generate trip ID
        const trips = FleetFlow.getTrips();
        trip.id = 'T' + String(trips.length + 1).padStart(3, '0');
        trip.status = 'draft';
        trip.createdAt = new Date().toISOString();
        
        FleetFlow.saveTrip(trip);
        showToast('success', 'Success', 'Trip created successfully');
        
        closeModal('trip-modal');
        renderPage('trips');
    };

    window.viewTrip = function(id) {
        const trip = FleetFlow.getTrip(id);
        if (trip) {
            const vehicle = FleetFlow.getVehicle(trip.vehicleId);
            const driver = FleetFlow.getDriver(trip.driverId);
            alert(`Trip Details:\n\nID: ${trip.id}\nVehicle: ${vehicle?.name || 'N/A'}\nDriver: ${driver?.name || 'N/A'}\nFrom: ${trip.origin}\nTo: ${trip.destination}\nWeight: ${trip.cargoWeight}kg\nStatus: ${trip.status}\nDate: ${trip.scheduledDate}`);
        }
    };

    window.checkVehicleCapacity = function() {
        const vehicleSelect = document.getElementById('trip-vehicle');
        const cargoInput = document.getElementById('cargo-weight');
        const warningEl = document.getElementById('capacity-warning');
        
        if (!vehicleSelect.value || !cargoInput.value) {
            warningEl.textContent = '';
            return;
        }
        
        const selectedOption = vehicleSelect.options[vehicleSelect.selectedIndex];
        const maxCapacity = parseInt(selectedOption.dataset.capacity);
        const cargoWeight = parseInt(cargoInput.value);
        
        if (cargoWeight > maxCapacity) {
            warningEl.textContent = `⚠️ Warning: Cargo exceeds capacity (${maxCapacity}kg max)`;
            warningEl.style.color = '#EF4444';
        } else {
            warningEl.textContent = `✓ Capacity: ${maxCapacity - cargoWeight}kg remaining`;
            warningEl.style.color = '#10B981';
        }
    };

    // Driver Functions
    window.saveDriver = function(e, id) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const driver = Object.fromEntries(formData.entries());
        
        // Generate avatar initials
        driver.avatar = driver.name.split(' ').map(n => n[0]).join('').toUpperCase();
        
        // Initialize stats for new driver
        if (!id) {
            driver.safetyScore = 10;
            driver.totalTrips = 0;
            driver.completedTrips = 0;
        }
        
        if (id) {
            driver.id = id;
            FleetFlow.saveDriver(driver);
            showToast('success', 'Success', 'Driver updated successfully');
        } else {
            FleetFlow.saveDriver(driver);
            showToast('success', 'Success', 'Driver added successfully');
        }
        
        closeModal('driver-modal');
        renderPage('drivers');
    };

    window.editDriver = function(id) {
        const driver = FleetFlow.getDriver(id);
        if (driver) {
            document.getElementById('modal-container').innerHTML = Pages.renderDriverModal(driver);
            setTimeout(() => {
                document.getElementById('driver-modal-overlay').classList.add('active');
            }, 10);
        }
    };

    window.deleteDriver = function(id) {
        if (confirm('Are you sure you want to delete this driver?')) {
            FleetFlow.deleteDriver(id);
            showToast('success', 'Deleted', 'Driver deleted successfully');
            renderPage('drivers');
        }
    };

    // Service Functions
    window.saveService = function(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const service = Object.fromEntries(formData.entries());
        
        // Generate ID
        const services = FleetFlow.getServices();
        service.id = 'S' + String(services.length + 1).padStart(3, '0');
        service.status = 'in-progress';
        service.createdAt = new Date().toISOString();
        
        // Update vehicle status to in-shop
        if (service.vehicleId) {
            const vehicle = FleetFlow.getVehicle(service.vehicleId);
            if (vehicle) {
                vehicle.status = 'in-shop';
                FleetFlow.saveVehicle(vehicle);
            }
        }
        
        FleetFlow.saveService(service);
        showToast('success', 'Success', 'Service log added. Vehicle status updated to In Shop.');
        
        closeModal('service-modal');
        renderPage('maintenance');
    };

    window.viewService = function(id) {
        const service = FleetFlow.getService(id);
        if (service) {
            const vehicle = FleetFlow.getVehicle(service.vehicleId);
            alert(`Service Details:\n\nID: ${service.id}\nVehicle: ${vehicle?.name || 'N/A'}\nType: ${service.serviceType}\nDescription: ${service.description}\nCost: $${service.cost}\nDate: ${service.date}\nStatus: ${service.status}`);
        }
    };

    window.deleteService = function(id) {
        if (confirm('Are you sure you want to delete this service log?')) {
            FleetFlow.deleteService(id);
            showToast('success', 'Deleted', 'Service log deleted');
            renderPage('maintenance');
        }
    };

    window.updateVehicleStatus = function(select) {
        // This is handled in saveService
    };

    // Expense Functions
    window.saveExpense = function(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const expense = Object.fromEntries(formData.entries());
        
        // Generate ID
        const expenses = FleetFlow.getExpenses();
        expense.id = 'E' + String(expenses.length + 1).padStart(3, '0');
        
        // Parse numbers
        expense.cost = parseFloat(expense.cost);
        expense.liters = expense.liters ? parseFloat(expense.liters) : 0;
        expense.odometer = expense.odometer ? parseInt(expense.odometer) : null;
        
        FleetFlow.saveExpense(expense);
        showToast('success', 'Success', 'Expense added successfully');
        
        closeModal('expense-modal');
        renderPage('expenses');
    };

    window.toggleFuelFields = function() {
        const type = document.getElementById('expense-type').value;
        const fuelFields = document.getElementById('fuel-fields');
        fuelFields.style.display = type === 'fuel' ? 'block' : 'none';
    };

    // Export Functions
    window.exportToCSV = function() {
        const trips = FleetFlow.getTrips();
        let csv = 'Trip ID,Vehicle,Driver,Origin,Destination,Weight,Status,Date\n';
        
        trips.forEach(trip => {
            const vehicle = FleetFlow.getVehicle(trip.vehicleId);
            const driver = FleetFlow.getDriver(trip.driverId);
            csv += `${trip.id},${vehicle?.name || ''},${driver?.name || ''},"${trip.origin}","${trip.destination}",${trip.cargoWeight},${trip.status},${trip.scheduledDate}\n`;
        });
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'fleetflow_trips.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        
        showToast('success', 'Exported', 'Data exported to CSV successfully');
    };

    // Notification Functions
    window.showNotifications = function() {
        const stats = FleetFlow.getDashboardStats();
        let message = `Dashboard Stats:\n\n`;
        message += `Active Vehicles: ${stats.activeFleet}\n`;
        message += `Maintenance Alerts: ${stats.maintenanceAlerts}\n`;
        message += `Utilization: ${stats.utilizationRate}%\n`;
        message += `Pending Trips: ${stats.pendingCargo}`;
        
        alert(message);
    };

    // Toast Notifications
    function showToast(type, title, message) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
            error: '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
            warning: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
            info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'
        };
        
        toast.innerHTML = `
            <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${icons[type] || icons.info}
            </svg>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        `;
        
        container.appendChild(toast);
        
        // Auto remove
        setTimeout(() => {
            toast.remove();
        }, 5000);
    }

    // Update Login Page Stats
    function updateLoginStats() {
        const stats = FleetFlow.getDashboardStats();
        animateNumber('stat-vehicles', stats.totalVehicles);
        animateNumber('stat-drivers', stats.totalDrivers);
        animateNumber('stat-trips', stats.totalTrips);
    }

    function animateNumber(elementId, target) {
        const el = document.getElementById(elementId);
        if (!el) return;
        
        let current = 0;
        const increment = target / 20;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current);
        }, 30);
    }

    // Make toast function global
    window.showToast = showToast;

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', init);
})();
