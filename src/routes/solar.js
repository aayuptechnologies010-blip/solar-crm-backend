const router = require('express').Router();
const { protect } = require('../middleware/auth');
const {
  SolarLead,
  SolarProject,
  SiteSurvey,
  SolarOrder,
  SolarDealer,
  SolarComplaint,
  SubsidyRecord,
  PaymentLedger
} = require('../models/Solar');

// ========================
// SEED INITIAL SOLAR DATA (If DB is empty)
// ========================
const seedIfEmpty = async () => {
  try {
    const projectCount = await SolarProject.countDocuments();
    if (projectCount === 0) {
      await SolarProject.create([
        {
          projectId: 'DBPL-2026-00001',
          customerName: 'Dr. Anand Swaroop Mishra',
          mobile: '9935678901',
          address: 'B-42, Sector C, Aliganj',
          district: 'Lucknow',
          block: 'Bakshi Ka Talab',
          panchayat: 'Kathwara Gram',
          consumerNumber: 'PU-12093485',
          solarCapacity: '10 kW',
          panelBrand: 'Waaree 550W TopCon (18 Panels)',
          inverterBrand: 'Growatt 10kW On-Grid 3-Phase',
          structureType: 'Elevated GI Heavy Duty (6ft height)',
          assignedExecutive: 'Amit Verma',
          assignedInstaller: 'Rameshwar Sharma (Chief Technician)',
          totalAmount: 540000,
          paidAmount: 540000,
          dueAmount: 0,
          subsidyStatus: 'Subsidy Received',
          subsidyAmount: 78000,
          commissioningDate: '2026-09-28',
          netMeterStatus: 'Installed & Synchronized',
          status: 'Commissioned'
        },
        {
          projectId: 'DBPL-2026-00002',
          customerName: 'Sunita Devi Agrawal',
          mobile: '9788112245',
          address: 'Plot 104, Sector K, Ashiyana',
          district: 'Lucknow',
          block: 'Kalyanpur',
          panchayat: 'Bithoor Gram',
          consumerNumber: 'PU-99382012',
          solarCapacity: '7 kW',
          panelBrand: 'Adani Solar 540W Mono PERC',
          inverterBrand: 'Luminous 7kW Grid Tie',
          structureType: 'Standard HDG Structure',
          assignedExecutive: 'Amit Verma',
          assignedInstaller: 'Vikram Yadav',
          totalAmount: 395000,
          paidAmount: 150000,
          dueAmount: 245000,
          subsidyStatus: 'Inspection Done',
          subsidyAmount: 78000,
          commissioningDate: 'Pending',
          netMeterStatus: 'DISCOM Application Approved',
          status: 'In Progress'
        },
        {
          projectId: 'DBPL-2026-00003',
          customerName: 'Dinesh Kumar Maurya',
          mobile: '9450123456',
          address: 'Near Bharat Mata Mandir, Sigra',
          district: 'Varanasi',
          block: 'Varanasi Sadar',
          panchayat: 'Shivpur Gram',
          consumerNumber: 'VU-10293847',
          solarCapacity: '2 kW',
          panelBrand: 'Tata Power Solar 545W Mono PERC',
          inverterBrand: 'Microtek 2.2kW On-Grid',
          structureType: 'Flush Mount Tin Shed GI',
          assignedExecutive: 'Rohan Gupta',
          assignedInstaller: 'Mahesh Chauhan',
          totalAmount: 130000,
          paidAmount: 90000,
          dueAmount: 40000,
          subsidyStatus: 'Installation Underway',
          subsidyAmount: 60000,
          commissioningDate: 'Expected Oct 2026',
          netMeterStatus: 'Meter Requisition Submitted',
          status: 'In Progress'
        }
      ]);
    }

    const surveyCount = await SiteSurvey.countDocuments();
    if (surveyCount === 0) {
      await SiteSurvey.create([
        {
          surveyId: 'SRV-001',
          leadId: 'SL-101',
          customerName: 'Rajendra Prasad Sharma',
          mobile: '9876543210',
          surveyDate: '2026-10-06',
          surveyorName: 'Rameshwar Sharma',
          roofType: 'RCC Flat',
          roofArea: '650 sq.ft',
          shadowDetails: 'Zero shadow between 8:30 AM to 5:00 PM. High sun exposure.',
          loadDetails: 'Sanctioned 6 kW, 3-Phase Connection',
          proposedCapacity: '5 kW (9 Modules of 550W)',
          panelRequirement: '9 x 550W Mono PERC Bifacial',
          inverterRequirement: '5kW 3-Phase Grid Tie (Growatt/Polycab)',
          structureDetails: 'South-facing 15° tilt GI Hot-dip galvanised',
          earthing: 'Chemical Earthing 3 pits (AC, DC, LA Lightning Arrester)',
          photosCount: 5,
          status: 'Survey Approved',
          remarks: 'Customer wants elevated structure by 2ft so rooftop space can be used for laundry.'
        },
        {
          surveyId: 'SRV-002',
          leadId: 'SL-102',
          customerName: 'Vikram Singh Chauhan',
          mobile: '9811223344',
          surveyDate: '2026-10-07',
          surveyorName: 'Mahesh Chauhan',
          roofType: 'Industrial Tin Shed',
          roofArea: '400 sq.ft',
          shadowDetails: 'Small water tank towards North-West, doesn’t cause obstruction.',
          loadDetails: 'Sanctioned 4 kW, Single Phase',
          proposedCapacity: '3 kW (6 Modules of 540W)',
          panelRequirement: '6 x 540W Mono PERC',
          inverterRequirement: '3.3kW Single Phase On-Grid',
          structureDetails: 'Short rail aluminum clamps for tin roof',
          earthing: '2 Chemical Earth Pits + Surge Protection Device (SPD)',
          photosCount: 4,
          status: 'Completed',
          remarks: 'Cable distance to main LT DB is approx 18 meters.'
        }
      ]);
    }

    const orderCount = await SolarOrder.countDocuments();
    if (orderCount === 0) {
      await SolarOrder.create([
        {
          orderId: 'ORD-2026-0041',
          customerName: 'Rajendra Prasad Sharma',
          mobile: '9876543210',
          orderDate: '2026-10-08',
          systemCapacity: '5 kW',
          totalAmount: 318640,
          bookingAmount: 50000,
          materialStatus: 'Dispatched from Warehouse',
          paymentStatus: 'Token Received (20%)',
          installationStatus: 'Site Survey Done - Team Assigned',
          consumerNumber: 'PU-78392104',
          district: 'Lucknow',
          panelBrand: 'Waaree 550W TopCon (9 Nos.)',
          inverterBrand: 'Growatt 5kW 3-Phase',
          assignedInstaller: 'Rameshwar Sharma',
          deliveryDate: '2026-10-14'
        },
        {
          orderId: 'ORD-2026-0042',
          customerName: 'Sunita Devi Agrawal',
          mobile: '9788112245',
          orderDate: '2026-10-05',
          systemCapacity: '7 kW',
          totalAmount: 395000,
          bookingAmount: 75000,
          materialStatus: 'Delivered at Site',
          paymentStatus: '70% Cleared (Material Stage)',
          installationStatus: 'In Progress (Structure Erected)',
          consumerNumber: 'PU-99382012',
          district: 'Lucknow',
          panelBrand: 'Adani Solar 540W Mono PERC',
          inverterBrand: 'Luminous 7kW Grid Tie',
          assignedInstaller: 'Vikram Yadav',
          deliveryDate: '2026-10-09'
        }
      ]);
    }

    const dealerCount = await SolarDealer.countDocuments();
    if (dealerCount === 0) {
      await SolarDealer.create([
        {
          dealerId: 'DLR-01',
          name: 'Awadh Solar Point',
          contactPerson: 'Sandeep Tiwari',
          mobile: '9415099881',
          email: 'sandeep.awadh@gmail.com',
          district: 'Lucknow',
          address: 'Shop 14, Vibhuti Khand, Gomti Nagar, Lucknow',
          gstin: '09AAACA1234F1Z8',
          panNumber: 'AAACA1234F',
          commissionRateKw: 1500,
          totalLeads: 28,
          convertedLeads: 18,
          closedSalesKw: '112 kW',
          totalSalesValue: 6048000,
          commissionEarned: 168000,
          commissionPaid: 120000,
          commissionPending: 48000,
          rating: '4.9 ★',
          status: 'Active',
          bankDetails: {
            accountHolder: 'Awadh Solar Point',
            accountNumber: '50200084729104',
            ifsc: 'HDFC0001234',
            bankName: 'HDFC Bank, Gomti Nagar'
          }
        },
        {
          dealerId: 'DLR-02',
          name: 'Kashi Green Energy Systems',
          contactPerson: 'Prabhat Pandey',
          mobile: '9839088772',
          email: 'kashi.green@rediffmail.com',
          district: 'Varanasi',
          address: 'D-58/12, Sigra Crossing, Varanasi',
          gstin: '09BBBCB5678G2Z1',
          panNumber: 'BBBCB5678G',
          commissionRateKw: 1500,
          totalLeads: 19,
          convertedLeads: 12,
          closedSalesKw: '68 kW',
          totalSalesValue: 3672000,
          commissionEarned: 102000,
          commissionPaid: 85000,
          commissionPending: 17000,
          rating: '4.7 ★',
          status: 'Active',
          bankDetails: {
            accountHolder: 'Kashi Green Energy Systems',
            accountNumber: '382901928374',
            ifsc: 'SBIN0000543',
            bankName: 'State Bank of India, Sigra'
          }
        }
      ]);
    }

    const complaintCount = await SolarComplaint.countDocuments();
    if (complaintCount === 0) {
      await SolarComplaint.create([
        {
          complaintNumber: 'CMP-2026-08',
          customerName: 'Alok Nath Srivastava',
          projectId: 'DBPL-2025-00142',
          consumerNo: 'PU-12098451',
          mobile: '9415234567',
          complaintType: 'Inverter Grid Error / Generation Drop',
          priority: 'High',
          technicianName: 'Vikram Yadav',
          technicianAssignment: 'Vikram Yadav (Lead Solar Tech)',
          visitDate: '2026-10-09',
          complaintStatus: 'In Progress',
          reportedDate: '2026-10-07',
          description: 'Inverter displaying Fault 04 (Grid Overvoltage). Generation halted during afternoon peak sunlight hours.',
          resolution: 'Technician visited site. Checked grid voltage parameters on LT panel.'
        },
        {
          complaintNumber: 'CMP-2026-10',
          customerName: 'Dr. Anand Swaroop Mishra',
          projectId: 'DBPL-2026-00001',
          consumerNo: 'PU-12093485',
          mobile: '9935678901',
          complaintType: 'Net Meter Reading Mismatch',
          priority: 'Medium',
          technicianName: 'Mahesh Chauhan',
          technicianAssignment: 'Mahesh Chauhan (Electrical Engineer)',
          visitDate: '2026-10-06',
          complaintStatus: 'Resolved',
          reportedDate: '2026-10-04',
          description: 'Discom net meter export reading was not syncing with mobile monitoring app.',
          resolution: 'Wi-Fi datalogger dongle re-configured and reconnected to home router.'
        }
      ]);
    }

    const subsidyCount = await SubsidyRecord.countDocuments();
    if (subsidyCount === 0) {
      await SubsidyRecord.create([
        {
          subsidyId: 'SUB-2026-001',
          projectId: 'DBPL-2026-00001',
          customerName: 'Dr. Anand Swaroop Mishra',
          mobile: '9935678901',
          consumerNo: 'PU-12093485',
          discom: 'MVVNL (Lucknow)',
          capacity: '10 kW',
          applicationNo: 'UP-LKO-2026-99382',
          subsidyAmount: 78000,
          applicationStatus: 'Approved & Active',
          documentStatus: 'Verified',
          discomStatus: 'Feasibility Cleared',
          installationStatus: 'Commissioned',
          inspectionStatus: 'Passed & Signed',
          subsidyApproval: 'Approved by MNRE',
          subsidyReceived: 'Disbursed in Bank',
          disbursedDate: '2026-10-02'
        },
        {
          subsidyId: 'SUB-2026-002',
          projectId: 'DBPL-2026-00002',
          customerName: 'Sunita Devi Agrawal',
          mobile: '9788112245',
          consumerNo: 'PU-99382012',
          discom: 'MVVNL (Lucknow)',
          capacity: '7 kW',
          applicationNo: 'UP-LKO-2026-99415',
          subsidyAmount: 78000,
          applicationStatus: 'Approved & Active',
          documentStatus: 'Verified',
          discomStatus: 'Feasibility Cleared',
          installationStatus: 'Underway',
          inspectionStatus: 'Awaiting Work Completion',
          subsidyApproval: 'In Processing',
          subsidyReceived: 'Pending',
          pendingReason: 'Work Completion Report (WCR) awaited from installer'
        }
      ]);
    }

    const paymentCount = await PaymentLedger.countDocuments();
    if (paymentCount === 0) {
      await PaymentLedger.create([
        {
          receiptNo: 'RCP-2026-0091',
          projectId: 'DBPL-2026-00001',
          customerName: 'Dr. Anand Swaroop Mishra',
          mobile: '9935678901',
          consumerNo: 'PU-12093485',
          systemCapacity: '10 kW',
          totalProjectAmount: 540000,
          advanceAmount: 100000,
          installmentType: 'Final Settlement (Milestone 3)',
          amountReceived: 54000,
          totalReceivedToDate: 540000,
          outstandingAmount: 0,
          paymentDate: '2026-10-04',
          paymentMode: 'UPI',
          txnId: 'UPI983021948',
          status: 'Verified',
          remarks: 'Full settlement completed'
        }
      ]);
    }
  } catch (err) {
    console.error('Solar seed error:', err);
  }
};

// Run seed on first start
seedIfEmpty();

// ========================
// SOLAR PROJECTS (Customers & Installations)
// ========================
router.get('/projects', protect, async (req, res) => {
  try {
    const projects = await SolarProject.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/projects', protect, async (req, res) => {
  try {
    const count = await SolarProject.countDocuments();
    const projectId = req.body.projectId || `DBPL-2026-${String(count + 1).padStart(5, '0')}`;
    const project = await SolarProject.create({ ...req.body, projectId });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/projects/:id', protect, async (req, res) => {
  try {
    const project = await SolarProject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/projects/:id', protect, async (req, res) => {
  try {
    const project = await SolarProject.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ========================
// SITE SURVEYS
// ========================
router.get('/surveys', protect, async (req, res) => {
  try {
    const surveys = await SiteSurvey.find().sort({ createdAt: -1 });
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/surveys', protect, async (req, res) => {
  try {
    const count = await SiteSurvey.countDocuments();
    const surveyId = req.body.surveyId || `SRV-${String(count + 1).padStart(3, '0')}`;
    const survey = await SiteSurvey.create({ ...req.body, surveyId });
    res.status(201).json(survey);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/surveys/:id', protect, async (req, res) => {
  try {
    const survey = await SiteSurvey.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!survey) return res.status(404).json({ message: 'Survey not found' });
    res.json(survey);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ========================
// SOLAR ORDERS
// ========================
router.get('/orders', protect, async (req, res) => {
  try {
    const orders = await SolarOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/orders', protect, async (req, res) => {
  try {
    const count = await SolarOrder.countDocuments();
    const orderId = req.body.orderId || `ORD-2026-${String(count + 41).padStart(4, '0')}`;
    const order = await SolarOrder.create({ ...req.body, orderId });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/orders/:id', protect, async (req, res) => {
  try {
    const order = await SolarOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ========================
// SOLAR DEALERS
// ========================
router.get('/dealers', protect, async (req, res) => {
  try {
    const dealers = await SolarDealer.find().sort({ createdAt: -1 });
    res.json(dealers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/dealers', protect, async (req, res) => {
  try {
    const count = await SolarDealer.countDocuments();
    const dealerId = req.body.dealerId || `DLR-${String(count + 1).padStart(2, '0')}`;
    const dealer = await SolarDealer.create({ ...req.body, dealerId });
    res.status(201).json(dealer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/dealers/:id', protect, async (req, res) => {
  try {
    const dealer = await SolarDealer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dealer) return res.status(404).json({ message: 'Dealer not found' });
    res.json(dealer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ========================
// SOLAR COMPLAINTS / SERVICES
// ========================
router.get('/complaints', protect, async (req, res) => {
  try {
    const complaints = await SolarComplaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/complaints', protect, async (req, res) => {
  try {
    const count = await SolarComplaint.countDocuments();
    const complaintNumber = req.body.complaintNumber || `CMP-2026-${String(count + 8).padStart(2, '0')}`;
    const complaint = await SolarComplaint.create({ ...req.body, complaintNumber });
    res.status(201).json(complaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/complaints/:id', protect, async (req, res) => {
  try {
    const complaint = await SolarComplaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.json(complaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ========================
// SUBSIDY TRACKING
// ========================
router.get('/subsidies', protect, async (req, res) => {
  try {
    const subsidies = await SubsidyRecord.find().sort({ createdAt: -1 });
    res.json(subsidies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/subsidies', protect, async (req, res) => {
  try {
    const count = await SubsidyRecord.countDocuments();
    const subsidyId = req.body.subsidyId || `SUB-2026-${String(count + 1).padStart(3, '0')}`;
    const subsidy = await SubsidyRecord.create({ ...req.body, subsidyId });
    res.status(201).json(subsidy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/subsidies/:id', protect, async (req, res) => {
  try {
    const subsidy = await SubsidyRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subsidy) return res.status(404).json({ message: 'Subsidy record not found' });
    res.json(subsidy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ========================
// PAYMENT LEDGERS / RECEIPTS
// ========================
router.get('/payments', protect, async (req, res) => {
  try {
    const payments = await PaymentLedger.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/payments', protect, async (req, res) => {
  try {
    const count = await PaymentLedger.countDocuments();
    const receiptNo = req.body.receiptNo || `RCP-2026-${String(count + 91).padStart(4, '0')}`;
    const payment = await PaymentLedger.create({ ...req.body, receiptNo });
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ========================
// SOLAR DASHBOARD STATS (Aggregated)
// ========================
router.get('/dashboard-stats', protect, async (req, res) => {
  try {
    const [
      totalProjects,
      totalOrders,
      totalSurveys,
      totalDealers,
      openComplaints,
      subsidiesPending,
      payments
    ] = await Promise.all([
      SolarProject.countDocuments(),
      SolarOrder.countDocuments(),
      SiteSurvey.countDocuments(),
      SolarDealer.countDocuments(),
      SolarComplaint.countDocuments({ complaintStatus: { $ne: 'Resolved' } }),
      SubsidyRecord.countDocuments({ subsidyReceived: { $ne: 'Disbursed in Bank' } }),
      PaymentLedger.find().select('amountReceived totalProjectAmount outstandingAmount')
    ]);

    const totalRevenue = payments.reduce((acc, curr) => acc + (curr.amountReceived || 0), 0);
    const outstanding = payments.reduce((acc, curr) => acc + (curr.outstandingAmount || 0), 0);

    res.json({
      totalProjects,
      totalOrders,
      totalSurveys,
      totalDealers,
      openComplaints,
      subsidiesPending,
      totalRevenue,
      outstanding
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
