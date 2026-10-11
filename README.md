# Savings Goal Tracking System - Algorithm Design Lab

This standalone module implements the algorithmic backend infrastructure for a mobile banking utility that allows users to set, update, and audit financial savings goals with proactive deadline tracking notifications.

## System Architecture & Variables Map
* **`userId`**: String | Unique mobile banking customer identification anchor.
* **`goalName`**: String | Descriptive label for the target bucket (e.g., "Safari Travel").
* **`targetAmount`**: Float | The total financial metric objective limit threshold value.
* **`targetDate`**: Date | Target calendar deadline constraint parameter.
* **`amountSaved`**: Float | Cumulative total of user deposits.

## System Capabilities
1. **Goal Creation:** Instantiates tracking objects and sets baseline inputs to storage dictionaries.
2. **Progress Management:** Immutably aggregates deposits into individual balance metrics.
3. **Automated Audit Scheduler:** Computes date deltas to evaluate if a goal is unfulfilled within a 7-day threshold, triggering push notification warnings.

## Local Execution Check
Execute the algorithmic validation pipeline script using the runtime command engine:
```bash
node savings_goal_system.js
```
