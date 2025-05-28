import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Check if we already have metrics data to avoid creating duplicates
  const existingCount = await prisma.sLAPerformanceMetric.count();
  
  if (existingCount === 0) {
    // Only create one summary record if no data exists
    // Use type assertion to override Prisma's generated types
    const createData = {
      downtime: 30, // 30 minutes of downtime
      totalTime: 1440, // 24 hours in minutes
      slaDeduct: 2.08, // 2.08% deduction
      slaRemain: 97.92, // 97.92% remaining
    } as Prisma.SLAPerformanceMetricCreateInput;
    
    await prisma.sLAPerformanceMetric.create({
      data: createData,
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
