const fs = require('fs');
const path = require('path');

const STATUS_FILE = path.join(__dirname, 'status.json');

function getStatus() {
  try {
    return JSON.parse(fs.readFileSync(STATUS_FILE, 'utf8'));
  } catch {
    return {
      campaign: { running: false, status: 'Unknown', leads: 0, total: 0, completed: 0, success: 0 },
      resources: {},
      cron: [],
      log: []
    };
  }
}

function saveStatus(status) {
  fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2));
}

function updateCampaign(updates) {
  const status = getStatus();
  status.campaign = { ...status.campaign, ...updates };
  saveStatus(status);
}

function updateResources(updates) {
  const status = getStatus();
  status.resources = { ...status.resources, ...updates };
  saveStatus(status);
}

function addLog(msg) {
  const status = getStatus();
  const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  status.log.unshift({ time, msg });
  if (status.log.length > 50) status.log = status.log.slice(0, 50);
  saveStatus(status);
}

function setCron(jobs) {
  const status = getStatus();
  status.cron = jobs;
  saveStatus(status);
}

module.exports = { getStatus, saveStatus, updateCampaign, updateResources, addLog, setCron };

// CLI usage
if (require.main === module) {
  const [,, action, ...args] = process.argv;
  
  switch (action) {
    case 'log':
      addLog(args.join(' '));
      console.log('Log added');
      break;
    case 'campaign':
      const [key, value] = args;
      updateCampaign({ [key]: isNaN(value) ? value : Number(value) });
      console.log('Campaign updated');
      break;
    case 'show':
      console.log(JSON.stringify(getStatus(), null, 2));
      break;
    default:
      console.log('Usage: node update-status.js <log|campaign|show> [args]');
  }
}
