export const performanceConfig = {
    logFilePath: './logs/navigation-times.log',
    logPerformancePath: './logs/navigation-performance.log',
    expectedMetrics: {
        dnsLookupTime: 50, // ms
        tcpHandshakeTime: 100, // ms
        responseTime: 200, // ms
        domContentLoadedTime: 1000, // ms
        pageLoadTime: 1500, // ms
    },
    weights: {
        dnsLookupTime: 1,
        tcpHandshakeTime: 2,
        responseTime: 2,
        domContentLoadedTime: 3,
        pageLoadTime: 4,
    },
    idealNavigationTime: 2000, // Ideal navigation time in ms
};

