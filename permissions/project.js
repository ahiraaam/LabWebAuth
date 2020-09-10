function canViewDashboard(user) {
  return user.role === "Admin" || user.role === "Normal";
}

module.exports = {
  canViewDashboard,
};
