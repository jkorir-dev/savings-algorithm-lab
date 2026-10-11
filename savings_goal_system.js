const SYSTEM_DATABASE = {};

function createSavingsGoal(userId, goalName, targetAmount, targetDateString) {
  const targetDate = new Date(targetDateString);
  
  if (isNaN(targetDate.getTime())) {
    return 'Error: Date configuration parameter format must align as YYYY-MM-DD.';
  }

  SYSTEM_DATABASE[userId] = {
    goalName: goalName,
    targetAmount: floatParameter(targetAmount),
    targetDate: targetDate,
    amountSaved: 0.0
  };

  console.log(`\n--> [STORE] Record initialized inside database matrix variables for: ${userId}`);
  return `Success: Goal '${goalName}' created with a target of $${targetAmount.toFixed(2)} by ${targetDateString}.`;
}

function updateSavingsProgress(userId, depositValue) {
  if (!SYSTEM_DATABASE[userId]) {
    return `Error: User profile values matching '${userId}' not found.`;
  }

  const userRecord = SYSTEM_DATABASE[userId];

  userRecord.amountSaved += floatParameter(depositValue);

  console.log(`--> [UPDATE] Balance successfully added for ${userId}.`);
  return `Progress Update: New saved balance summary reads $${userRecord.amountSaved.toFixed(2)}`;
}

function runDeadlineNotificationChecks(userId, systemCurrentDate) {
  if (!SYSTEM_DATABASE[userId]) return;

  const userRecord = SYSTEM_DATABASE[userId];
  const currentDate = new Date(systemCurrentDate);

  const timeDifference = userRecord.targetDate.getTime() - currentDate.getTime();
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  if (userRecord.amountSaved >= userRecord.targetAmount) {
    return 'Status: Goal target fully achieved! 🎉';
  }

  if (daysRemaining >= 0 && daysRemaining <= 7) {
    const remainingGapFunds = userRecord.targetAmount - userRecord.amountSaved;

    const alertNotificationText = 
      `⚠️ [ALERT] User ${userId}: Your savings goal '${userRecord.goalName}' ` +
      `is approaching deadline in ${daysRemaining} days! You still need to save ` +
      `$${remainingGapFunds.toFixed(2)} to hit your target metrics window bounds.`;

    console.log('\n================== PUSH NOTIFICATION DISPATCH ==================');
    console.log(alertNotificationText);
    console.log('==============================================');
    return 'Notification Dispatched';
  }

  return `Status: Active ledger tracking. $${(userRecord.targetAmount - userRecord.amountSaved).toFixed(2)} remaining.`;
}

function floatParameter(val) {
  return parseFloat(val) || 0.0;
}

console.log('=== PIPELINE STAGE 1: CREATING FINANCIAL TRAVEL BUCKET ===');
const createMsg = createSavingsGoal(
  'User_US_Tourist',
  'Kenya Safari Travel Tour Pockets',
  1200.00,
  '2026-10-18'
);
console.log(createMsg);

console.log('\n=== PIPELINE STAGE 2: PROCESSING DEPOSIT OPERATIONS ===');
const progressMsg = updateSavingsProgress('User_US_Tourist', 400.00);
console.log(progressMsg);

console.log('\n=== PIPELINE STAGE 3: BACKGROUND SYSTEM SCHEDULER CHECK RUNS ===');
const simulatedToday = '2026-10-11';
runDeadlineNotificationChecks('User_US_Tourist', simulatedToday);
