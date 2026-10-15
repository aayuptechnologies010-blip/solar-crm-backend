const router = require('express').Router();
const Setting = require('../models/Setting');
const { protect, superAdminOnly } = require('../middleware/auth');

// Helper to get global settings, create if it doesn't exist
const getSettings = async () => {
  let settings = await Setting.findOne({ isGlobal: true });
  if (!settings) {
    settings = await Setting.create({ isGlobal: true });
  }
  return settings;
};

// GET /api/settings/permissions — fetch role permissions
router.get('/permissions', protect, async (req, res) => {
  try {
    const settings = await getSettings();
    res.json(settings.rolePermissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/settings/permissions — update role permissions (Super Admin only)
router.patch('/permissions', protect, superAdminOnly, async (req, res) => {
  try {
    const { rolePermissions } = req.body;
    if (!rolePermissions) {
      return res.status(400).json({ message: 'rolePermissions object required' });
    }

    const settings = await getSettings();
    settings.rolePermissions = rolePermissions;
    await settings.save();
    
    res.json(settings.rolePermissions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST /api/settings/roles — create new role with permissions (Super Admin only)
router.post('/roles', protect, superAdminOnly, async (req, res) => {
  try {
    const { roleName, permissions } = req.body;
    if (!roleName || !roleName.trim()) {
      return res.status(400).json({ message: 'Role name is required' });
    }
    const cleanRoleName = roleName.trim();
    const settings = await getSettings();
    const currentRoles = settings.rolePermissions ? Object.fromEntries(settings.rolePermissions) : {};
    
    if (currentRoles[cleanRoleName]) {
      return res.status(400).json({ message: 'Role already exists' });
    }

    currentRoles[cleanRoleName] = Array.isArray(permissions) ? permissions : ['View Dashboard'];
    settings.rolePermissions = currentRoles;
    await settings.save();

    res.status(201).json({ roleName: cleanRoleName, rolePermissions: settings.rolePermissions });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/settings/roles/:roleName — delete custom role (Super Admin only)
router.delete('/roles/:roleName', protect, superAdminOnly, async (req, res) => {
  try {
    const { roleName } = req.params;
    if (roleName === 'Super Admin') {
      return res.status(400).json({ message: 'Cannot delete Super Admin role' });
    }
    const settings = await getSettings();
    const currentRoles = settings.rolePermissions ? Object.fromEntries(settings.rolePermissions) : {};

    delete currentRoles[roleName];
    settings.rolePermissions = currentRoles;
    await settings.save();

    res.json({ success: true, rolePermissions: settings.rolePermissions });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

