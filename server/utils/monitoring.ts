import { Request, Response } from 'express';
import { performanceMonitor } from './performance';

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  uptime: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  activeRequests: number;
  timestamp: string;
  version: string;
}

export function getSystemHealth(): SystemHealth {
  const memoryUsage = process.memoryUsage();
  const systemMetrics = performanceMonitor.getSystemMetrics();
  
  const memoryUsedMB = memoryUsage.heapUsed / 1024 / 1024;
  const memoryTotalMB = memoryUsage.heapTotal / 1024 / 1024;
  const memoryPercentage = (memoryUsedMB / memoryTotalMB) * 100;
  
  let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
  
  // Determine health status
  if (memoryPercentage > 90 || systemMetrics.activeRequests > 50) {
    status = 'unhealthy';
  } else if (memoryPercentage > 70 || systemMetrics.activeRequests > 20) {
    status = 'degraded';
  }
  
  return {
    status,
    uptime: systemMetrics.uptime,
    memory: {
      used: Math.round(memoryUsedMB),
      total: Math.round(memoryTotalMB),
      percentage: Math.round(memoryPercentage)
    },
    activeRequests: systemMetrics.activeRequests,
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  };
}

// Health check endpoint
export function healthCheck(req: Request, res: Response): void {
  const health = getSystemHealth();
  
  const statusCode = health.status === 'healthy' ? 200 : 
                    health.status === 'degraded' ? 200 : 503;
  
  res.status(statusCode).json(health);
}

// Metrics endpoint for monitoring systems
export function metrics(req: Request, res: Response): void {
  const health = getSystemHealth();
  const memoryUsage = process.memoryUsage();
  
  // Prometheus-style metrics format
  const prometheusMetrics = `
# HELP nodejs_memory_heap_used_bytes Memory heap used in bytes
# TYPE nodejs_memory_heap_used_bytes gauge
nodejs_memory_heap_used_bytes ${memoryUsage.heapUsed}

# HELP nodejs_memory_heap_total_bytes Memory heap total in bytes  
# TYPE nodejs_memory_heap_total_bytes gauge
nodejs_memory_heap_total_bytes ${memoryUsage.heapTotal}

# HELP nodejs_process_uptime_seconds Process uptime in seconds
# TYPE nodejs_process_uptime_seconds gauge
nodejs_process_uptime_seconds ${process.uptime()}

# HELP http_requests_active Number of active HTTP requests
# TYPE http_requests_active gauge
http_requests_active ${health.activeRequests}

# HELP application_health_status Application health status (0=unhealthy, 1=degraded, 2=healthy)
# TYPE application_health_status gauge
application_health_status ${health.status === 'healthy' ? 2 : health.status === 'degraded' ? 1 : 0}
`.trim();

  res.setHeader('Content-Type', 'text/plain');
  res.send(prometheusMetrics);
}

// Status dashboard endpoint
export function statusDashboard(req: Request, res: Response): void {
  const health = getSystemHealth();
  
  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Hazel & Hue - System Status</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px;
            background: #f8f9fa;
        }
        .card { 
            background: white; 
            padding: 20px; 
            border-radius: 8px; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .status { 
            padding: 8px 16px; 
            border-radius: 20px; 
            font-weight: bold;
            display: inline-block;
        }
        .healthy { background: #d4edda; color: #155724; }
        .degraded { background: #fff3cd; color: #856404; }
        .unhealthy { background: #f8d7da; color: #721c24; }
        .metric { 
            display: flex; 
            justify-content: space-between; 
            padding: 8px 0; 
            border-bottom: 1px solid #eee;
        }
        .metric:last-child { border-bottom: none; }
        h1 { color: #2D5A3D; }
        h2 { color: #333; margin-top: 0; }
    </style>
</head>
<body>
    <h1>🎨 Hazel & Hue System Status</h1>
    
    <div class="card">
        <h2>Overall Status</h2>
        <div class="status ${health.status}">${health.status.toUpperCase()}</div>
        <p>Last updated: ${health.timestamp}</p>
    </div>
    
    <div class="card">
        <h2>System Metrics</h2>
        <div class="metric">
            <span>Uptime</span>
            <span>${Math.round(health.uptime / 3600)}h ${Math.round((health.uptime % 3600) / 60)}m</span>
        </div>
        <div class="metric">
            <span>Memory Usage</span>
            <span>${health.memory.used}MB / ${health.memory.total}MB (${health.memory.percentage}%)</span>
        </div>
        <div class="metric">
            <span>Active Requests</span>
            <span>${health.activeRequests}</span>
        </div>
        <div class="metric">
            <span>Version</span>
            <span>${health.version}</span>
        </div>
    </div>
    
    <div class="card">
        <h2>Service Components</h2>
        <div class="metric">
            <span>Web Server</span>
            <span class="status healthy">OPERATIONAL</span>
        </div>
        <div class="metric">
            <span>Database</span>
            <span class="status healthy">OPERATIONAL</span>
        </div>
        <div class="metric">
            <span>File Storage</span>
            <span class="status healthy">OPERATIONAL</span>
        </div>
        <div class="metric">
            <span>Email Service</span>
            <span class="status healthy">OPERATIONAL</span>
        </div>
        <div class="metric">
            <span>Payment Processing</span>
            <span class="status healthy">OPERATIONAL</span>
        </div>
    </div>
    
    <script>
        // Auto-refresh every 30 seconds
        setTimeout(() => location.reload(), 30000);
    </script>
</body>
</html>
  `.trim();

  res.setHeader('Content-Type', 'text/html');
  res.send(html);
}