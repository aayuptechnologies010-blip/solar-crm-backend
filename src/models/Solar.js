const mongoose = require('mongoose');

// Solar Lead Schema
const solarLeadSchema = new mongoose.Schema({
  leadId: { type: String, trim: true },
  customerName: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  location: { type: String, default: '' },
  district: { type: String, default: 'Lucknow' },
  electricityBillAvg: { type: String, default: '' },
  consumerNumber: { type: String, trim: true, default: '' },
  requiredKw: { type: String, default: '3 kW' },
  leadSource: { type: String, default: 'PM Surya Ghar Campaign' },
  dealerName: { type: String, default: 'Direct' },
  salesExecutive: { type: String, default: '' },
  followUpDate: { type: String, default: '' },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Interested', 'Site Survey', 'Quotation', 'Booking', 'Installation', 'Completed', 'Lost'],
    default: 'New'
  },
  roofType: { type: String, default: 'RCC Flat' },
  roofArea: { type: String, default: '' },
  estimatedAmount: { type: Number, default: 0 },
  subsidyAmount: { type: Number, default: 0 },
  payableAmount: { type: Number, default: 0 },
  notes: { type: String, default: '' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Solar Project Schema (Commissioning, Customers & Installations)
const solarProjectSchema = new mongoose.Schema({
  projectId: { type: String, required: true, unique: true, trim: true },
  customerName: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  address: { type: String, default: '' },
  district: { type: String, default: 'Lucknow' },
  block: { type: String, default: '' },
  panchayat: { type: String, default: '' },
  consumerNumber: { type: String, trim: true, default: '' },
  solarCapacity: { type: String, default: '5 kW' },
  panelBrand: { type: String, default: '' },
  inverterBrand: { type: String, default: '' },
  structureType: { type: String, default: '' },
  assignedExecutive: { type: String, default: '' },
  assignedInstaller: { type: String, default: '' },
  totalAmount: { type: Number, default: 0 },
  paidAmount: { type: Number, default: 0 },
  dueAmount: { type: Number, default: 0 },
  subsidyStatus: { type: String, default: 'Application Submitted' },
  subsidyAmount: { type: Number, default: 78000 },
  commissioningDate: { type: String, default: 'Pending' },
  netMeterStatus: { type: String, default: 'Pending' },
  status: { type: String, default: 'In Progress' },
  electricityBillFile: { type: String, default: '' },
  idDocumentType: { type: String, default: 'Aadhaar Card' },
  idDocumentFile: { type: String, default: '' }
}, { timestamps: true });

// Site Survey Schema
const siteSurveySchema = new mongoose.Schema({
  surveyId: { type: String, required: true, unique: true, trim: true },
  leadId: { type: String, default: '' },
  customerName: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  surveyDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  surveyorName: { type: String, default: '' },
  roofType: { type: String, default: 'RCC Flat' },
  roofArea: { type: String, default: '' },
  shadowDetails: { type: String, default: '' },
  loadDetails: { type: String, default: '' },
  proposedCapacity: { type: String, default: '' },
  panelRequirement: { type: String, default: '' },
  inverterRequirement: { type: String, default: '' },
  structureDetails: { type: String, default: '' },
  earthing: { type: String, default: '' },
  photosCount: { type: Number, default: 0 },
  photos: [{ type: String }],
  status: { type: String, enum: ['Pending', 'Completed', 'Survey Approved', 'Rejected'], default: 'Pending' },
  remarks: { type: String, default: '' }
}, { timestamps: true });

// Solar Order Schema
const solarOrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true, trim: true },
  customerName: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  orderDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  systemCapacity: { type: String, default: '5 kW' },
  totalAmount: { type: Number, default: 0 },
  bookingAmount: { type: Number, default: 0 },
  materialStatus: {
    type: String,
    enum: ['Order Placed with Vendor', 'Dispatched from Warehouse', 'In Transit', 'Delivered at Site', 'Delivered & Installed'],
    default: 'Order Placed with Vendor'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Token Received (20%)', '70% Cleared (Material Stage)', 'Fully Paid (100%)'],
    default: 'Token Received (20%)'
  },
  installationStatus: {
    type: String,
    default: 'Scheduled'
  },
  consumerNumber: { type: String, default: '' },
  district: { type: String, default: 'Lucknow' },
  panelBrand: { type: String, default: '' },
  inverterBrand: { type: String, default: '' },
  assignedInstaller: { type: String, default: '' },
  deliveryDate: { type: String, default: '' }
}, { timestamps: true });

// Solar Dealer Schema
const solarDealerSchema = new mongoose.Schema({
  dealerId: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  contactPerson: { type: String, default: '' },
  mobile: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  district: { type: String, default: '' },
  address: { type: String, default: '' },
  gstin: { type: String, default: '' },
  panNumber: { type: String, default: '' },
  commissionRateKw: { type: Number, default: 1500 },
  totalLeads: { type: Number, default: 0 },
  convertedLeads: { type: Number, default: 0 },
  closedSalesKw: { type: String, default: '0 kW' },
  totalSalesValue: { type: Number, default: 0 },
  commissionEarned: { type: Number, default: 0 },
  commissionPaid: { type: Number, default: 0 },
  commissionPending: { type: Number, default: 0 },
  rating: { type: String, default: '5.0 ★' },
  status: { type: String, enum: ['Active', 'Suspended', 'Pending'], default: 'Active' },
  joinedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  bankDetails: {
    accountHolder: { type: String, default: '' },
    accountNumber: { type: String, default: '' },
    ifsc: { type: String, default: '' },
    bankName: { type: String, default: '' }
  },
  paymentsHistory: [{
    id: String,
    date: String,
    amount: Number,
    mode: String,
    txnId: String,
    status: String,
    remarks: String
  }]
}, { timestamps: true });

// Solar Complaint / Service Ticket Schema
const solarComplaintSchema = new mongoose.Schema({
  complaintNumber: { type: String, required: true, unique: true, trim: true },
  customerName: { type: String, required: true, trim: true },
  projectId: { type: String, default: '' },
  consumerNo: { type: String, default: '' },
  mobile: { type: String, required: true, trim: true },
  complaintType: { type: String, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'], default: 'Medium' },
  technicianName: { type: String, default: '' },
  technicianAssignment: { type: String, default: '' },
  visitDate: { type: String, default: '' },
  complaintStatus: { type: String, enum: ['Assigned', 'In Progress', 'Scheduled', 'Resolved'], default: 'Assigned' },
  reportedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  description: { type: String, default: '' },
  resolution: { type: String, default: '' },
  beforePhotos: [{ type: String }],
  afterPhotos: [{ type: String }]
}, { timestamps: true });

// Subsidy Record Schema
const subsidyRecordSchema = new mongoose.Schema({
  subsidyId: { type: String, required: true, unique: true, trim: true },
  projectId: { type: String, default: '' },
  customerName: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  consumerNo: { type: String, default: '' },
  discom: { type: String, default: 'MVVNL' },
  capacity: { type: String, default: '3 kW' },
  applicationNo: { type: String, default: '' },
  subsidyAmount: { type: Number, default: 78000 },
  applicationStatus: { type: String, default: 'Submitted' },
  documentStatus: { type: String, default: 'Uploaded' },
  discomStatus: { type: String, default: 'Feasibility Applied' },
  installationStatus: { type: String, default: 'Work Order Issued' },
  inspectionStatus: { type: String, default: 'Scheduled' },
  subsidyApproval: { type: String, default: 'In Processing' },
  subsidyReceived: { type: String, default: 'Pending' },
  pendingReason: { type: String, default: '' },
  disbursedDate: { type: String, default: '' }
}, { timestamps: true });

// Payment Ledger Schema
const paymentLedgerSchema = new mongoose.Schema({
  receiptNo: { type: String, required: true, unique: true, trim: true },
  projectId: { type: String, default: '' },
  customerName: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  consumerNo: { type: String, default: '' },
  systemCapacity: { type: String, default: '3 kW' },
  totalProjectAmount: { type: Number, default: 0 },
  advanceAmount: { type: Number, default: 0 },
  installmentType: { type: String, default: 'Advance' },
  amountReceived: { type: Number, default: 0 },
  totalReceivedToDate: { type: Number, default: 0 },
  outstandingAmount: { type: Number, default: 0 },
  paymentDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  paymentMode: { type: String, default: 'UPI' },
  txnId: { type: String, default: '' },
  status: { type: String, default: 'Verified' },
  remarks: { type: String, default: '' }
}, { timestamps: true });

module.exports = {
  SolarLead: mongoose.model('SolarLead', solarLeadSchema),
  SolarProject: mongoose.model('SolarProject', solarProjectSchema),
  SiteSurvey: mongoose.model('SiteSurvey', siteSurveySchema),
  SolarOrder: mongoose.model('SolarOrder', solarOrderSchema),
  SolarDealer: mongoose.model('SolarDealer', solarDealerSchema),
  SolarComplaint: mongoose.model('SolarComplaint', solarComplaintSchema),
  SubsidyRecord: mongoose.model('SubsidyRecord', subsidyRecordSchema),
  PaymentLedger: mongoose.model('PaymentLedger', paymentLedgerSchema)
};
