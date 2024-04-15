const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(metric => {
        onPerfEntry({
          name: 'CLS',
          value: metric.value,
          // Use a minimal set of data, only core web vitals
          entries: metric.entries,
          // Include some additional information useful for analysis
          id: metric.id,
          startTime: metric.startTime,
          duration: metric.duration,
        });
      });
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
