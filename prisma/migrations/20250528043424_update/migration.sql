-- CreateTable
CREATE TABLE "sla_performance_metrics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "downtime" REAL NOT NULL,
    "totalTime" REAL NOT NULL,
    "slaDeduct" REAL NOT NULL,
    "slaRemain" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
