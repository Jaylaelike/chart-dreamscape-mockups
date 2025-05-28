import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5300;

// Middleware
app.use(cors());
app.use(express.json());

// GET all SLA metrics
app.get('/api/sla-metrics', async (req, res) => {
  try {
    const metrics = await prisma.sLAPerformanceMetric.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(metrics);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET single SLA metric
app.get('/api/sla-metrics/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const metric = await prisma.sLAPerformanceMetric.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!metric) {
      return res.status(404).json({ error: 'Metric not found' });
    }
    
    res.json(metric);
  } catch (error) {
    console.error('Error fetching metric:', error);
    res.status(500).json({ error: error.message });
  }
});

// CREATE SLA metric
app.post('/api/sla-metrics', async (req, res) => {
  try {
    const { downtime, totalTime, slaDeduct, slaRemain } = req.body;
    
    const metric = await prisma.sLAPerformanceMetric.create({
      data: {
        downtime,
        totalTime,
        slaDeduct,
        slaRemain
      }
    });
    
    res.status(201).json(metric);
  } catch (error) {
    console.error('Error creating metric:', error);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE SLA metric
app.patch('/api/sla-metrics/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { downtime, totalTime, slaDeduct, slaRemain } = req.body;
    
    const metric = await prisma.sLAPerformanceMetric.update({
      where: { id: parseInt(id) },
      data: {
        ...(downtime !== undefined && { downtime }),
        ...(totalTime !== undefined && { totalTime }),
        ...(slaDeduct !== undefined && { slaDeduct }),
        ...(slaRemain !== undefined && { slaRemain })
      }
    });
    
    res.json(metric);
  } catch (error) {
    console.error('Error updating metric:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE SLA metric
app.delete('/api/sla-metrics/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.sLAPerformanceMetric.delete({
      where: { id: parseInt(id) },
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting metric:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle graceful shutdown
process.on('exit', async () => {
  await prisma.$disconnect();
});
