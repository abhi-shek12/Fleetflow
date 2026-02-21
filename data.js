// ========================================
// FleetFlow - Data Management
// ========================================

const FleetFlow = (function() {
    'use strict';

    // Data Storage Keys
    const STORAGE_KEYS = {
        VEHICLES: 'fleetflow_vehicles',
        DRIVERS: 'fleetflow_drivers',
        TRIPS: 'fleetflow_trips',
        SERVICES: 'fleetflow_services',
        EXPENSES: 'fleetflow_expenses',
        USER: 'fleetflow_user',
        SETTINGS: 'fleetflow_settings'
    };

    // Initialize demo data
    function initDemoData() {
        if (!localStorage.getItem(STORAGE_KEYS.VEHICLES)) {
            const vehicles = generateVehicles();
            localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
        }

        if (!localStorage.getItem(STORAGE_KEYS.DRIVERS)) {
            const drivers = generateDrivers();
            localStorage.setItem(STORAGE_KEYS.DRIVERS, JSON.stringify(drivers));
        }

        if (!localStorage.getItem(STORAGE_KEYS.TRIPS)) {
            const trips = generateTrips();
            localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(trips));
        }

        if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
            const services = generateServices();
            localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
        }

        if (!localStorage.getItem(STORAGE_KEYS.EXPENSES)) {
            const expenses = generateExpenses();
            localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
        }
    }

    // Generate Vehicles
    function generateVehicles() {
        return [
            {
                id: 'V001',
                name: 'Ford Transit',
                model: 'Transit 350L',
                licensePlate: 'ABC-1234',
                type: 'Van',
                maxCapacity: 1500,
                currentOdometer: 45230,
                status: 'available',
                fuelType: 'Diesel',
                year: 2022,
                acquiredDate: '2022-03-15',
                acquiredCost: 45000,
                lastService: '2024-01-10',
                region: 'North',
                createdAt: '2022-03-15'
            },
            {
                id: 'V002',
                name: 'Mercedes Sprinter',
                model: 'Sprinter 316 CDI',
                licensePlate: 'DEF-5678',
                type: 'Van',
                maxCapacity: 1200,
                currentOdometer: 38450,
                status: 'on-trip',
                fuelType: 'Diesel',
                year: 2021,
                acquiredDate: '2021-08-20',
                acquiredCost: 52000,
                lastService: '2024-01-05',
                region: 'South',
                createdAt: '2021-08-20'
            },
            {
                id: 'V003',
                name: 'Isuzu NPR',
                model: 'NPR 75',
                licensePlate: 'GHI-9012',
                type: 'Truck',
                maxCapacity: 5000,
                currentOdometer: 78900,
                status: 'available',
                fuelType: 'Diesel',
                year: 2020,
                acquiredDate: '2020-05-10',
                acquiredCost: 85000,
                lastService: '2023-12-20',
                region: 'East',
                createdAt: '2020-05-10'
            },
            {
                id: 'V004',
                name: 'Hino 238',
                model: '238 Series',
                licensePlate: 'JKL-3456',
                type: 'Truck',
                maxCapacity: 8000,
                currentOdometer: 125400,
                status: 'in-shop',
                fuelType: 'Diesel',
                year: 2019,
                acquiredDate: '2019-11-01',
                acquiredCost: 95000,
                lastService: '2024-01-15',
                region: 'West',
                createdAt: '2019-11-01'
            },
            {
                id: 'V005',
                name: 'Piaggio Ape',
                model: 'Ape Auto',
                licensePlate: 'MNO-7890',
                type: 'Bike',
                maxCapacity: 300,
                currentOdometer: 23400,
                status: 'available',
                fuelType: 'Petrol',
                year: 2023,
                acquiredDate: '2023-02-28',
                acquiredCost: 12000,
                lastService: '2024-01-08',
                region: 'North',
                createdAt: '2023-02-28'
            },
            {
                id: 'V006',
                name: 'Ford Transit',
                model: 'Transit Connect',
                licensePlate: 'PQR-1234',
                type: 'Van',
                maxCapacity: 800,
                currentOdometer: 28900,
                status: 'on-trip',
                fuelType: 'Petrol',
                year: 2022,
                acquiredDate: '2022-06-15',
                acquiredCost: 35000,
                lastService: '2023-12-15',
                region: 'South',
                createdAt: '2022-06-15'
            },
            {
                id: 'V007',
                name: 'Fuso Canter',
                model: 'Canter FE85',
                licensePlate: 'STU-5678',
                type: 'Truck',
                maxCapacity: 4500,
                currentOdometer: 67800,
                status: 'available',
                fuelType: 'Diesel',
                year: 2021,
                acquiredDate: '2021-04-20',
                acquiredCost: 72000,
                lastService: '2024-01-02',
                region: 'East',
                createdAt: '2021-04-20'
            },
            {
                id: 'V008',
                name: 'TVS King',
                model: 'King Deluxe',
                licensePlate: 'VWX-9012',
                type: 'Bike',
                maxCapacity: 250,
                currentOdometer: 45600,
                status: 'retired',
                fuelType: 'Petrol',
                year: 2018,
                acquiredDate: '2018-09-10',
                acquiredCost: 8000,
                lastService: '2023-06-15',
                region: 'West',
                createdAt: '2018-09-10'
            },
            {
                id: 'V009',
                name: 'Iveco Daily',
                model: 'Daily 35S',
                licensePlate: 'YZA-3456',
                type: 'Truck',
                maxCapacity: 6000,
                currentOdometer: 91200,
                status: 'available',
                fuelType: 'Diesel',
                year: 2020,
                acquiredDate: '2020-07-22',
                acquiredCost: 88000,
                lastService: '2023-12-28',
                region: 'North',
                createdAt: '2020-07-22'
            },
            {
                id: 'V010',
                name: ' Renault Kangoo',
                model: 'Kangoo Z.E.',
                licensePlate: 'BCD-7890',
                type: 'Van',
                maxCapacity: 600,
                currentOdometer: 12300,
                status: 'in-shop',
                fuelType: 'Electric',
                year: 2023,
                acquiredDate: '2023-08-15',
                acquiredCost: 42000,
                lastService: '2024-01-18',
                region: 'South',
                createdAt: '2023-08-15'
            }
        ];
    }

    // Generate Drivers
    function generateDrivers() {
        return [
            {
                id: 'D001',
                name: 'John Smith',
                email: 'john.smith@fleetflow.com',
                phone: '+1 (555) 123-4567',
                licenseNumber: 'DL00123456',
                licenseCategory: 'C',
                licenseExpiry: '2025-08-15',
                hireDate: '2020-03-10',
                status: 'on-duty',
                safetyScore: 9.2,
                totalTrips: 342,
                completedTrips: 338,
                avatar: 'JS'
            },
            {
                id: 'D002',
                name: 'Sarah Johnson',
                email: 'sarah.j@fleetflow.com',
                phone: '+1 (555) 234-5678',
                licenseNumber: 'DL00234567',
                licenseCategory: 'B',
                licenseExpiry: '2024-12-20',
                hireDate: '2021-06-15',
                status: 'on-duty',
                safetyScore: 8.8,
                totalTrips: 215,
                completedTrips: 210,
                avatar: 'SJ'
            },
            {
                id: 'D003',
                name: 'Michael Davis',
                email: 'michael.d@fleetflow.com',
                phone: '+1 (555) 345-6789',
                licenseNumber: 'DL00345678',
                licenseCategory: 'C',
                licenseExpiry: '2024-03-25',
                hireDate: '2019-11-20',
                status: 'suspended',
                safetyScore: 6.5,
                totalTrips: 456,
                completedTrips: 445,
                avatar: 'MD'
            },
            {
                id: 'D004',
                name: 'Emily Wilson',
                email: 'emily.w@fleetflow.com',
                phone: '+1 (555) 456-7890',
                licenseNumber: 'DL00456789',
                licenseCategory: 'B',
                licenseExpiry: '2025-05-10',
                hireDate: '2022-01-08',
                status: 'off-duty',
                safetyScore: 9.5,
                totalTrips: 128,
                completedTrips: 125,
                avatar: 'EW'
            },
            {
                id: 'D005',
                name: 'Robert Brown',
                email: 'robert.b@fleetflow.com',
                phone: '+1 (555) 567-8901',
                licenseNumber: 'DL00567890',
                licenseCategory: 'A',
                licenseExpiry: '2025-02-28',
                hireDate: '2023-04-12',
                status: 'on-duty',
                safetyScore: 8.2,
                totalTrips: 89,
                completedTrips: 87,
                avatar: 'RB'
            },
            {
                id: 'D006',
                name: 'Lisa Anderson',
                email: 'lisa.a@fleetflow.com',
                phone: '+1 (555) 678-9012',
                licenseNumber: 'DL00678901',
                licenseCategory: 'B',
                licenseExpiry: '2024-11-30',
                hireDate: '2021-09-05',
                status: 'on-duty',
                safetyScore: 9.0,
                totalTrips: 267,
                completedTrips: 262,
                avatar: 'LA'
            },
            {
                id: 'D007',
                name: 'David Martinez',
                email: 'david.m@fleetflow.com',
                phone: '+1 (555) 789-0123',
                licenseNumber: 'DL00789012',
                licenseCategory: 'C',
                licenseExpiry: '2025-07-18',
                hireDate: '2020-08-25',
                status: 'off-duty',
                safetyScore: 8.7,
                totalTrips: 389,
                completedTrips: 381,
                avatar: 'DM'
            },
            {
                id: 'D008',
                name: 'Jennifer Taylor',
                email: 'jennifer.t@fleetflow.com',
                phone: '+1 (555) 890-1234',
                licenseNumber: 'DL00890123',
                licenseCategory: 'A',
                licenseExpiry: '2024-09-05',
                hireDate: '2023-07-20',
                status: 'on-duty',
                safetyScore: 9.3,
                totalTrips: 156,
                completedTrips: 154,
                avatar: 'JT'
            }
        ];
    }

    // Generate Trips
    function generateTrips() {
        const now = new Date();
        return [
            {
                id: 'T001',
                vehicleId: 'V002',
                driverId: 'D001',
                origin: 'Warehouse A - North',
                destination: 'Customer Site - Downtown',
                cargoWeight: 950,
                cargoDescription: 'Electronics - 15 boxes',
                scheduledDate: '2024-01-20',
                status: 'completed',
                startTime: '2024-01-20T08:30:00',
                endTime: '2024-01-20T11:45:00',
                startOdometer: 38450,
                endOdometer: 38520,
                distance: 70,
                notes: 'Delivery completed successfully',
                createdAt: '2024-01-19T14:00:00'
            },
            {
                id: 'T002',
                vehicleId: 'V006',
                driverId: 'D002',
                origin: 'Warehouse B - South',
                destination: 'Mall Complex - East',
                cargoWeight: 650,
                cargoDescription: 'Clothing - 25 boxes',
                scheduledDate: '2024-01-21',
                status: 'completed',
                startTime: '2024-01-21T09:00:00',
                endTime: '2024-01-21T12:30:00',
                startOdometer: 28900,
                endOdometer: 28980,
                distance: 80,
                notes: '',
                createdAt: '2024-01-20T16:30:00'
            },
            {
                id: 'T003',
                vehicleId: 'V002',
                driverId: 'D006',
                origin: 'Port Terminal',
                destination: 'Distribution Center',
                cargoWeight: 1100,
                cargoDescription: 'Auto Parts - 40 crates',
                scheduledDate: '2024-01-22',
                status: 'dispatched',
                startTime: '2024-01-22T07:00:00',
                endTime: null,
                startOdometer: 38520,
                endOdometer: null,
                distance: null,
                notes: '',
                createdAt: '2024-01-21T11:00:00'
            },
            {
                id: 'T004',
                vehicleId: 'V003',
                driverId: 'D007',
                origin: 'Warehouse C - East',
                destination: 'Factory - West',
                cargoWeight: 4200,
                cargoDescription: 'Raw Materials - 8 pallets',
                scheduledDate: '2024-01-23',
                status: 'draft',
                startTime: null,
                endTime: null,
                startOdometer: null,
                endOdometer: null,
                distance: null,
                notes: '',
                createdAt: '2024-01-22T10:00:00'
            },
            {
                id: 'T005',
                vehicleId: 'V001',
                driverId: 'D001',
                origin: 'Warehouse A - North',
                destination: 'Retail Store #45',
                cargoWeight: 1200,
                cargoDescription: 'Furniture - 8 items',
                scheduledDate: '2024-01-18',
                status: 'completed',
                startTime: '2024-01-18T10:00:00',
                endTime: '2024-01-18T13:30:00',
                startOdometer: 45180,
                endOdometer: 45230,
                distance: 50,
                notes: 'Customer not available, rescheduled',
                createdAt: '2024-01-17T15:00:00'
            },
            {
                id: 'T006',
                vehicleId: 'V009',
                driverId: 'D005',
                origin: 'Cold Storage - North',
                destination: 'Hospital - Central',
                cargoWeight: 1800,
                cargoDescription: 'Medical Supplies - temperature controlled',
                scheduledDate: '2024-01-24',
                status: 'cancelled',
                startTime: null,
                endTime: null,
                startOdometer: null,
                endOdometer: null,
                distance: null,
                notes: 'Cancelled due to vehicle breakdown',
                createdAt: '2024-01-23T08:00:00'
            },
            {
                id: 'T007',
                vehicleId: 'V007',
                driverId: 'D008',
                origin: 'Warehouse B - South',
                destination: 'Tech Park',
                cargoWeight: 3800,
                cargoDescription: 'Server Equipment - 5 racks',
                scheduledDate: '2024-01-22',
                status: 'completed',
                startTime: '2024-01-22T06:30:00',
                endTime: '2024-01-22T10:00:00',
                startOdometer: 67600,
                endOdometer: 67800,
                distance: 200,
                notes: 'Heavy cargo, extra handling time',
                createdAt: '2024-01-21T09:00:00'
            },
            {
                id: 'T008',
                vehicleId: 'V001',
                driverId: 'D004',
                origin: 'Warehouse A - North',
                destination: 'Shopping Center',
                cargoWeight: 750,
                cargoDescription: 'Apparel - 30 boxes',
                scheduledDate: '2024-01-25',
                status: 'draft',
                startTime: null,
                endTime: null,
                startOdometer: null,
                endOdometer: null,
                distance: null,
                notes: '',
                createdAt: '2024-01-24T14:00:00'
            },
            {
                id: 'T009',
                vehicleId: 'V005',
                driverId: 'D005',
                origin: 'Restaurant Central',
                destination: 'Catering Event - Hotel',
                cargoWeight: 180,
                cargoDescription: 'Food Parcels - 20 orders',
                scheduledDate: '2024-01-21',
                status: 'completed',
                startTime: '2024-01-21T11:00:00',
                endTime: '2024-01-21T12:00:00',
                startOdometer: 23350,
                endOdometer: 23400,
                distance: 50,
                notes: '',
                createdAt: '2024-01-20T17:00:00'
            },
            {
                id: 'T010',
                vehicleId: 'V003',
                driverId: 'D007',
                origin: 'Factory - West',
                destination: 'Warehouse C - East',
                cargoWeight: 4500,
                cargoDescription: 'Finished Goods - 12 pallets',
                scheduledDate: '2024-01-23',
                status: 'completed',
                startTime: '2024-01-23T08:00:00',
                endTime: '2024-01-23T14:00:00',
                startOdometer: 78600,
                endOdometer: 78900,
                distance: 300,
                notes: 'Long haul delivery',
                createdAt: '2024-01-22T11:00:00'
            }
        ];
    }

    // Generate Services
    function generateServices() {
        return [
            {
                id: 'S001',
                vehicleId: 'V004',
                serviceType: 'Oil Change',
                description: 'Full engine oil and filter replacement',
                cost: 250,
                date: '2024-01-15',
                nextServiceDue: '2024-04-15',
                status: 'in-progress',
                createdAt: '2024-01-15T10:00:00'
            },
            {
                id: 'S002',
                vehicleId: 'V010',
                serviceType: 'Battery Replacement',
                description: 'Replace 12V auxiliary battery',
                cost: 450,
                date: '2024-01-18',
                nextServiceDue: '2025-01-18',
                status: 'in-progress',
                createdAt: '2024-01-18T09:00:00'
            },
            {
                id: 'S003',
                vehicleId: 'V001',
                serviceType: 'Tire Rotation',
                description: 'Rotate all tires and check pressure',
                cost: 80,
                date: '2024-01-10',
                nextServiceDue: '2024-07-10',
                status: 'completed',
                createdAt: '2024-01-10T14:00:00'
            },
            {
                id: 'S004',
                vehicleId: 'V002',
                serviceType: 'Brake Service',
                description: 'Replace brake pads front and rear',
                cost: 650,
                date: '2024-01-05',
                nextServiceDue: '2025-01-05',
                status: 'completed',
                createdAt: '2024-01-05T11:00:00'
            },
            {
                id: 'S005',
                vehicleId: 'V003',
                serviceType: 'Annual Inspection',
                description: 'Full vehicle inspection and certification',
                cost: 350,
                date: '2023-12-20',
                nextServiceDue: '2024-12-20',
                status: 'completed',
                createdAt: '2023-12-20T10:00:00'
            },
            {
                id: 'S006',
                vehicleId: 'V007',
                serviceType: 'Air Filter',
                description: 'Replace engine air filter',
                cost: 45,
                date: '2024-01-02',
                nextServiceDue: '2024-07-02',
                status: 'completed',
                createdAt: '2024-01-02T15:00:00'
            },
            {
                id: 'S007',
                vehicleId: 'V009',
                serviceType: 'Transmission Service',
                description: 'Transmission fluid drain and fill',
                cost: 420,
                date: '2023-12-28',
                nextServiceDue: '2024-06-28',
                status: 'completed',
                createdAt: '2023-12-28T09:00:00'
            },
            {
                id: 'S008',
                vehicleId: 'V005',
                serviceType: 'General Service',
                description: 'Minor tune-up and carburetor cleaning',
                cost: 120,
                date: '2024-01-08',
                nextServiceDue: '2024-04-08',
                status: 'completed',
                createdAt: '2024-01-08T10:00:00'
            }
        ];
    }

    // Generate Expenses
    function generateExpenses() {
        return [
            // Fuel Expenses
            { id: 'E001', vehicleId: 'V001', type: 'fuel', liters: 45, cost: 72, date: '2024-01-18', odometer: 45230, fuelType: 'Diesel', notes: '' },
            { id: 'E002', vehicleId: 'V002', type: 'fuel', liters: 38, cost: 60.80, date: '2024-01-19', odometer: 38480, fuelType: 'Diesel', notes: '' },
            { id: 'E003', vehicleId: 'V003', type: 'fuel', liters: 85, cost: 136, date: '2024-01-20', odometer: 78750, fuelType: 'Diesel', notes: '' },
            { id: 'E004', vehicleId: 'V001', type: 'fuel', liters: 42, cost: 67.20, date: '2024-01-15', odometer: 45180, fuelType: 'Diesel', notes: '' },
            { id: 'E005', vehicleId: 'V002', type: 'fuel', liters: 35, cost: 56, date: '2024-01-17', odometer: 38450, fuelType: 'Diesel', notes: '' },
            { id: 'E006', vehicleId: 'V006', type: 'fuel', liters: 32, cost: 51.20, date: '2024-01-20', odometer: 28950, fuelType: 'Petrol', notes: '' },
            { id: 'E007', vehicleId: 'V007', type: 'fuel', liters: 72, cost: 115.20, date: '2024-01-22', odometer: 67800, fuelType: 'Diesel', notes: '' },
            { id: 'E008', vehicleId: 'V003', type: 'fuel', liters: 90, cost: 144, date: '2024-01-22', odometer: 78900, fuelType: 'Diesel', notes: '' },
            { id: 'E009', vehicleId: 'V005', type: 'fuel', liters: 8, cost: 12.80, date: '2024-01-21', odometer: 23400, fuelType: 'Petrol', notes: '' },
            { id: 'E010', vehicleId: 'V009', type: 'fuel', liters: 78, cost: 124.80, date: '2024-01-23', odometer: 91100, fuelType: 'Diesel', notes: '' },
            // Maintenance Expenses
            { id: 'E011', vehicleId: 'V001', type: 'maintenance', liters: 0, cost: 80, date: '2024-01-10', odometer: 45180, fuelType: null, notes: 'Tire rotation service' },
            { id: 'E012', vehicleId: 'V002', type: 'maintenance', liters: 0, cost: 650, date: '2024-01-05', odometer: 38450, fuelType: null, notes: 'Brake pad replacement' },
            { id: 'E013', vehicleId: 'V004', type: 'maintenance', liters: 0, cost: 250, date: '2024-01-15', odometer: 125400, fuelType: null, notes: 'Oil change - in progress' },
            { id: 'E014', vehicleId: 'V010', type: 'maintenance', liters: 0, cost: 450, date: '2024-01-18', odometer: 12300, fuelType: null, notes: 'Battery replacement - in progress' },
            { id: 'E015', vehicleId: 'V007', type: 'maintenance', liters: 0, cost: 45, date: '2024-01-02', odometer: 67600, fuelType: null, notes: 'Air filter replacement' },
            // Insurance
            { id: 'E016', vehicleId: 'V001', type: 'insurance', liters: 0, cost: 2400, date: '2024-01-01', odometer: 45230, fuelType: null, notes: 'Annual insurance' },
            { id: 'E017', vehicleId: 'V002', type: 'insurance', liters: 0, cost: 2800, date: '2024-01-01', odometer: 38520, fuelType: null, notes: 'Annual insurance' },
            { id: 'E018', vehicleId: 'V003', type: 'insurance', liters: 0, cost: 3500, date: '2024-01-01', odometer: 78900, fuelType: null, notes: 'Annual insurance' },
            // Permits
            { id: 'E019', vehicleId: 'V003', type: 'permits', liters: 0, cost: 500, date: '2024-01-05', odometer: 78500, fuelType: null, notes: 'Heavy vehicle permit' },
            { id: 'E020', vehicleId: 'V004', type: 'permits', liters: 0, cost: 500, date: '2024-01-05', odometer: 125200, fuelType: null, notes: 'Heavy vehicle permit' },
            // Other
            { id: 'E021', vehicleId: 'V001', type: 'other', liters: 0, cost: 150, date: '2024-01-12', odometer: 45200, fuelType: null, notes: 'Cleaning service' },
            { id: 'E022', vehicleId: 'V002', type: 'other', liters: 0, cost: 85, date: '2024-01-08', odometer: 38460, fuelType: null, notes: 'Car wash' },
            { id: 'E023', vehicleId: 'V006', type: 'other', liters: 0, cost: 200, date: '2024-01-14', odometer: 28940, fuelType: null, notes: 'Windshield replacement' },
            { id: 'E024', vehicleId: 'V009', type: 'other', liters: 0, cost: 120, date: '2024-01-10', odometer: 91000, fuelType: null, notes: 'Toll charges - monthly pass' }
        ];
    }

    // Generic CRUD Operations
    function getAll(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    function getById(key, id) {
        const items = getAll(key);
        return items.find(item => item.id === id);
    }

    function save(key, item) {
        const items = getAll(key);
        const index = items.findIndex(i => i.id === item.id);
        
        if (index >= 0) {
            items[index] = { ...items[index], ...item };
        } else {
            item.id = item.id || generateId(key);
            item.createdAt = item.createdAt || new Date().toISOString();
            items.push(item);
        }
        
        localStorage.setItem(key, JSON.stringify(items));
        return item;
    }

    function remove(key, id) {
        const items = getAll(key);
        const filtered = items.filter(item => item.id !== id);
        localStorage.setItem(key, JSON.stringify(filtered));
    }

    function generateId(key) {
        const prefix = {
            [STORAGE_KEYS.VEHICLES]: 'V',
            [STORAGE_KEYS.DRIVERS]: 'D',
            [STORAGE_KEYS.TRIPS]: 'T',
            [STORAGE_KEYS.SERVICES]: 'S',
            [STORAGE_KEYS.EXPENSES]: 'E'
        }[key] || 'X';
        
        const items = getAll(key);
        const num = items.length + 1;
        return `${prefix}${String(num).padStart(3, '0')}`;
    }

    // User Management
    function saveUser(user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }

    function getUser() {
        const user = localStorage.getItem(STORAGE_KEYS.USER);
        return user ? JSON.parse(user) : null;
    }

    function clearUser() {
        localStorage.removeItem(STORAGE_KEYS.USER);
    }

    // Role-based Navigation
    function getNavigationByRole(role) {
        const navigations = {
            manager: [
                { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', page: 'dashboard' },
                { id: 'vehicles', label: 'Vehicles', icon: 'truck', page: 'vehicles' },
                { id: 'trips', label: 'Trips', icon: 'route', page: 'trips' },
                { id: 'maintenance', label: 'Maintenance', icon: 'tool', page: 'maintenance' },
                { id: 'expenses', label: 'Expenses', icon: 'fuel', page: 'expenses' },
                { id: 'drivers', label: 'Drivers', icon: 'users', page: 'drivers' },
                { id: 'analytics', label: 'Analytics', icon: 'chart', page: 'analytics' }
            ],
            dispatcher: [
                { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', page: 'dashboard' },
                { id: 'trips', label: 'Trips', icon: 'route', page: 'trips' },
                { id: 'vehicles', label: 'Vehicles', icon: 'truck', page: 'vehicles' },
                { id: 'drivers', label: 'Drivers', icon: 'users', page: 'drivers' }
            ],
            safety: [
                { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', page: 'dashboard' },
                { id: 'drivers', label: 'Drivers', icon: 'users', page: 'drivers' },
                { id: 'vehicles', label: 'Vehicles', icon: 'truck', page: 'vehicles' },
                { id: 'maintenance', label: 'Maintenance', icon: 'tool', page: 'maintenance' }
            ],
            finance: [
                { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', page: 'dashboard' },
                { id: 'expenses', label: 'Expenses', icon: 'fuel', page: 'expenses' },
                { id: 'analytics', label: 'Analytics', icon: 'chart', page: 'analytics' },
                { id: 'trips', label: 'Trips', icon: 'route', page: 'trips' }
            ]
        };
        return navigations[role] || navigations.manager;
    }

    // Dashboard Stats
    function getDashboardStats() {
        const vehicles = getAll(STORAGE_KEYS.VEHICLES);
        const drivers = getAll(STORAGE_KEYS.DRIVERS);
        const trips = getAll(STORAGE_KEYS.TRIPS);
        const services = getAll(STORAGE_KEYS.SERVICES);
        const expenses = getAll(STORAGE_KEYS.EXPENSES);

        const activeVehicles = vehicles.filter(v => v.status === 'on-trip').length;
        const maintenanceAlerts = vehicles.filter(v => v.status === 'in-shop').length + services.filter(s => s.status === 'in-progress').length;
        const totalVehicles = vehicles.filter(v => v.status !== 'retired').length;
        const utilizationRate = totalVehicles > 0 ? Math.round((activeVehicles / totalVehicles) * 100) : 0;
        const pendingTrips = trips.filter(t => t.status === 'draft').length;

        const totalFuelCost = expenses.filter(e => e.type === 'fuel').reduce((sum, e) => sum + e.cost, 0);
        const totalMaintenanceCost = expenses.filter(e => e.type === 'maintenance').reduce((sum, e) => sum + e.cost, 0);

        return {
            activeFleet: activeVehicles,
            maintenanceAlerts,
            utilizationRate,
            pendingCargo: pendingTrips,
            totalVehicles: vehicles.length,
            totalDrivers: drivers.length,
            totalTrips: trips.length,
            totalFuelCost,
            totalMaintenanceCost,
            completedTrips: trips.filter(t => t.status === 'completed').length
        };
    }

    // Export Public API
    return {
        init: initDemoData,
        keys: STORAGE_KEYS,
        
        // Vehicles
        getVehicles: () => getAll(STORAGE_KEYS.VEHICLES),
        getVehicle: (id) => getById(STORAGE_KEYS.VEHICLES, id),
        saveVehicle: (vehicle) => save(STORAGE_KEYS.VEHICLES, vehicle),
        deleteVehicle: (id) => remove(STORAGE_KEYS.VEHICLES, id),
        
        // Drivers
        getDrivers: () => getAll(STORAGE_KEYS.DRIVERS),
        getDriver: (id) => getById(STORAGE_KEYS.DRIVERS, id),
        saveDriver: (driver) => save(STORAGE_KEYS.DRIVERS, driver),
        deleteDriver: (id) => remove(STORAGE_KEYS.DRIVERS, id),
        
        // Trips
        getTrips: () => getAll(STORAGE_KEYS.TRIPS),
        getTrip: (id) => getById(STORAGE_KEYS.TRIPS, id),
        saveTrip: (trip) => save(STORAGE_KEYS.TRIPS, trip),
        deleteTrip: (id) => remove(STORAGE_KEYS.TRIPS, id),
        
        // Services
        getServices: () => getAll(STORAGE_KEYS.SERVICES),
        getService: (id) => getById(STORAGE_KEYS.SERVICES, id),
        saveService: (service) => save(STORAGE_KEYS.SERVICES, service),
        deleteService: (id) => remove(STORAGE_KEYS.SERVICES, id),
        
        // Expenses
        getExpenses: () => getAll(STORAGE_KEYS.EXPENSES),
        getExpense: (id) => getById(STORAGE_KEYS.EXPENSES, id),
        saveExpense: (expense) => save(STORAGE_KEYS.EXPENSES, expense),
        deleteExpense: (id) => remove(STORAGE_KEYS.EXPENSES, id),
        
        // User
        saveUser,
        getUser,
        clearUser,
        
        // Navigation
        getNavigationByRole,
        
        // Stats
        getDashboardStats
    };
})();

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    FleetFlow.init();
});
