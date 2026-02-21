// ========================================
// FleetFlow - Charts
// ========================================

const Charts = (function() {
    'use strict';

    // Chart colors
    const colors = {
        primary: '#F59E0B',
        success: '#10B981',
        warning: '#F97316',
        danger: '#EF4444',
        info: '#3B82F6',
        purple: '#8B5CF6',
        gray: '#64748B'
    };

    // Fleet Status Distribution (Donut Chart)
    function renderFleetStatusChart(containerId) {
        const vehicles = FleetFlow.getVehicles();
        const statusCounts = {
            'available': vehicles.filter(v => v.status === 'available').length,
            'on-trip': vehicles.filter(v => v.status === 'on-trip').length,
            'in-shop': vehicles.filter(v => v.status === 'in-shop').length,
            'retired': vehicles.filter(v => v.status === 'retired').length
        };

        const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);
        const data = [
            { label: 'Available', value: statusCounts.available, color: colors.success },
            { label: 'On Trip', value: statusCounts['on-trip'], color: colors.info },
            { label: 'In Shop', value: statusCounts['in-shop'], color: colors.warning },
            { label: 'Retired', value: statusCounts.retired, color: colors.gray }
        ].filter(d => d.value > 0);

        const container = document.getElementById(containerId);
        if (!container) return;

        // Create donut chart
        const size = 200;
        const thickness = 40;
        const radius = (size - thickness) / 2;
        
        let svg = `<svg viewBox="0 0 ${size} ${size}" style="transform: rotate(-90deg);">`;
        
        let currentAngle = 0;
        data.forEach((item, index) => {
            const percentage = item.value / total;
            const angle = percentage * 2 * Math.PI;
            
            const x1 = size / 2 + radius * Math.cos(currentAngle);
            const y1 = size / 2 + radius * Math.sin(currentAngle);
            const x2 = size / 2 + radius * Math.cos(currentAngle + angle);
            const y2 = size / 2 + radius * Math.sin(currentAngle + angle);
            
            const largeArc = angle > Math.PI ? 1 : 0;
            
            svg += `<path d="M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}" 
                    fill="none" stroke="${item.color}" stroke-width="${thickness}" />`;
            
            currentAngle += angle;
        });
        
        svg += '</svg>';
        
        // Center text
        const centerHtml = `
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                <div style="font-size: 2rem; font-weight: 700; color: #1E293B;">${total}</div>
                <div style="font-size: 0.857rem; color: #64748B;">Total Vehicles</div>
            </div>
        `;

        container.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="position: relative; width: 200px; height: 200px;">
                    ${svg}
                    ${centerHtml}
                </div>
                <div style="flex: 1; padding-left: 24px;">
                    ${data.map(item => `
                        <div style="display: flex; align-items: center; margin-bottom: 12px;">
                            <span style="width: 12px; height: 12px; border-radius: 50%; background: ${item.color}; margin-right: 8px;"></span>
                            <span style="flex: 1; font-size: 0.857rem; color: #64748B;">${item.label}</span>
                            <span style="font-weight: 600; color: #1E293B;">${item.value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Weekly Trip Trends (Bar Chart)
    function renderTripTrendsChart(containerId) {
        const trips = FleetFlow.getTrips();
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const weekData = [0, 0, 0, 0, 0, 0, 0];
        
        // Get current week
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay() + 1);
        
        trips.forEach(trip => {
            if (trip.scheduledDate) {
                const tripDate = new Date(trip.scheduledDate);
                const dayIndex = (tripDate.getDay() + 6) % 7; // Monday = 0
                if (tripDate >= startOfWeek) {
                    weekData[dayIndex]++;
                }
            }
        });

        const maxValue = Math.max(...weekData, 1);
        
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div style="display: flex; align-items: flex-end; justify-content: space-between; height: 220px; padding-top: 20px;">
                ${days.map((day, index) => {
                    const height = (weekData[index] / maxValue) * 180;
                    return `
                        <div style="display: flex; flex-direction: column; align-items: center; flex: 1;">
                            <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                                <div style="width: 40px; height: ${Math.max(height, 4)}px; background: ${weekData[index] > 0 ? colors.primary : '#E2E8F0'}; border-radius: 4px 4px 0 0; transition: height 0.3s ease;"></div>
                            </div>
                            <span style="margin-top: 8px; font-size: 0.786rem; color: #64748B;">${day}</span>
                            <span style="font-weight: 600; color: #1E293B; font-size: 0.857rem;">${weekData[index]}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    // Fuel Efficiency Chart
    function renderFuelEfficiencyChart(containerId) {
        const vehicles = FleetFlow.getVehicles();
        const expenses = FleetFlow.getExpenses();
        
        // Calculate fuel efficiency per vehicle
        const vehicleFuelData = [];
        
        vehicles.filter(v => v.status !== 'retired').slice(0, 5).forEach(vehicle => {
            const fuelExpenses = expenses.filter(e => e.vehicleId === vehicle.id && e.type === 'fuel');
            const totalLiters = fuelExpenses.reduce((sum, e) => sum + (e.liters || 0), 0);
            const totalCost = fuelExpenses.reduce((sum, e) => sum + (e.cost || 0), 0);
            const avgConsumption = totalLiters > 0 && vehicle.currentOdometer > 0 
                ? (vehicle.currentOdometer / totalLiters).toFixed(1) 
                : 0;
            
            vehicleFuelData.push({
                name: vehicle.name,
                efficiency: parseFloat(avgConsumption),
                cost: totalCost
            });
        });

        const container = document.getElementById(containerId);
        if (!container) return;

        const maxEfficiency = Math.max(...vehicleFuelData.map(v => v.efficiency), 1);
        
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 16px;">
                ${vehicleFuelData.map(vehicle => `
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                            <span style="font-size: 0.857rem; color: #64748B;">${vehicle.name}</span>
                            <span style="font-size: 0.857rem; font-weight: 600; color: #1E293B;">${vehicle.efficiency} km/L</span>
                        </div>
                        <div style="height: 8px; background: #E2E8F0; border-radius: 4px; overflow: hidden;">
                            <div style="height: 100%; width: ${(vehicle.efficiency / maxEfficiency) * 100}%; background: ${colors.success}; border-radius: 4px;"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Cost Breakdown (Pie Chart)
    function renderCostBreakdownChart(containerId) {
        const expenses = FleetFlow.getExpenses();
        
        const costByType = {
            'fuel': expenses.filter(e => e.type === 'fuel').reduce((sum, e) => sum + e.cost, 0),
            'maintenance': expenses.filter(e => e.type === 'maintenance').reduce((sum, e) => sum + e.cost, 0),
            'insurance': expenses.filter(e => e.type === 'insurance').reduce((sum, e) => sum + e.cost, 0),
            'permits': expenses.filter(e => e.type === 'permits').reduce((sum, e) => sum + e.cost, 0),
            'other': expenses.filter(e => e.type === 'other').reduce((sum, e) => sum + e.cost, 0)
        };

        const data = [
            { label: 'Fuel', value: costByType.fuel, color: colors.warning },
            { label: 'Maintenance', value: costByType.maintenance, color: colors.info },
            { label: 'Insurance', value: costByType.insurance, color: colors.purple },
            { label: 'Permits', value: costByType.permits, color: colors.success },
            { label: 'Other', value: costByType.other, color: colors.gray }
        ].filter(d => d.value > 0);

        const total = data.reduce((sum, d) => sum + d.value, 0);
        
        const container = document.getElementById(containerId);
        if (!container) return;

        // Create pie chart
        const size = 180;
        const radius = size / 2;
        
        let svg = `<svg viewBox="0 0 ${size} ${size}" style="transform: rotate(-90deg);">`;
        
        let currentAngle = 0;
        data.forEach(item => {
            const percentage = item.value / total;
            const angle = percentage * 2 * Math.PI;
            
            const x1 = radius + (radius - 10) * Math.cos(currentAngle);
            const y1 = radius + (radius - 10) * Math.sin(currentAngle);
            const x2 = radius + (radius - 10) * Math.cos(currentAngle + angle);
            const y2 = radius + (radius - 10) * Math.sin(currentAngle + angle);
            
            const largeArc = angle > Math.PI ? 1 : 0;
            
            svg += `<path d="M ${radius} ${radius} L ${x1} ${y1} A ${radius - 10} ${radius - 10} 0 ${largeArc} 1 ${x2} ${y2} Z" 
                    fill="${item.color}" />`;
            
            currentAngle += angle;
        });
        
        svg += '</svg>';

        container.innerHTML = `
            <div style="display: flex; align-items: center; gap: 24px;">
                <div style="width: 180px; height: 180px;">
                    ${svg}
                </div>
                <div style="flex: 1;">
                    ${data.map(item => `
                        <div style="display: flex; align-items: center; margin-bottom: 8px;">
                            <span style="width: 10px; height: 10px; border-radius: 50%; background: ${item.color}; margin-right: 8px;"></span>
                            <span style="flex: 1; font-size: 0.857rem; color: #64748B;">${item.label}</span>
                            <span style="font-weight: 600; color: #1E293B;">${Utils.formatCurrency(item.value)}</span>
                        </div>
                    `).join('')}
                    <div style="border-top: 1px solid #E2E8F0; padding-top: 8px; margin-top: 8px; display: flex; justify-content: space-between;">
                        <span style="font-weight: 600; color: #1E293B;">Total</span>
                        <span style="font-weight: 700; color: #1E293B;">${Utils.formatCurrency(total)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Vehicle ROI Chart
    function renderVehicleROIChart(containerId) {
        const vehicles = FleetFlow.getVehicles();
        const trips = FleetFlow.getTrips();
        const expenses = FleetFlow.getExpenses();
        
        const vehicleROI = vehicles.filter(v => v.status !== 'retired').slice(0, 5).map(vehicle => {
            const vehicleTrips = trips.filter(t => t.vehicleId === vehicle.id && t.status === 'completed');
            const vehicleExpenses = expenses.filter(e => e.vehicleId === vehicle.id);
            
            const totalRevenue = vehicleTrips.length * 500; // Estimated revenue per trip
            const totalCost = vehicleExpenses.reduce((sum, e) => sum + e.cost, 0);
            const roi = vehicle.acquiredCost > 0 
                ? ((totalRevenue - totalCost) / vehicle.acquiredCost * 100).toFixed(1)
                : 0;
            
            return {
                name: vehicle.name,
                roi: parseFloat(roi)
            };
        });

        const container = document.getElementById(containerId);
        if (!container) return;

        const maxROI = Math.max(...vehicleROI.map(v => v.roi), 1);
        
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 16px;">
                ${vehicleROI.map(vehicle => {
                    const barWidth = Math.min(Math.max((vehicle.roi / maxROI) * 100, 2), 100);
                    const barColor = vehicle.roi >= 0 ? colors.success : colors.danger;
                    
                    return `
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                                <span style="font-size: 0.857rem; color: #64748B;">${vehicle.name}</span>
                                <span style="font-size: 0.857rem; font-weight: 600; color: ${barColor};">${vehicle.roi}%</span>
                            </div>
                            <div style="height: 24px; background: #E2E8F0; border-radius: 4px; overflow: hidden; position: relative;">
                                <div style="height: 100%; width: ${barWidth}%; background: ${barColor}; border-radius: 4px; position: absolute; left: 0;"></div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    // Export public API
    return {
        renderFleetStatusChart,
        renderTripTrendsChart,
        renderFuelEfficiencyChart,
        renderCostBreakdownChart,
        renderVehicleROIChart
    };
})();
