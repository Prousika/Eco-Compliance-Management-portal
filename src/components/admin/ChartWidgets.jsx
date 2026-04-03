const PIE_COLORS = ["#5cae87", "#4aa8de", "#f2c54b", "#f09c39", "#8e7cf6", "#f26d7d"];

const buildPieGradient = (data) => {
  let offset = 0;
  const slices = data.map((item, index) => {
    const value = Number(item.percent) || 0;
    const start = offset;
    const end = offset + value;
    offset = end;
    return `${PIE_COLORS[index % PIE_COLORS.length]} ${start}% ${end}%`;
  });
  return `conic-gradient(${slices.join(", ")})`;
};

export const PieCategoryChart = ({ title, data }) => {
  const total = data.reduce((sum, item) => sum + (item.count || 0), 0);
  return (
    <div className="chart-card-v2">
      <h2>{title}</h2>
      <div className="pie-layout-v2">
        <div className="pie-wrap-v2">
          <div
            className="pie-chart-v2"
            style={{ background: data.length ? buildPieGradient(data) : "#e4ebf5" }}
          >
            <div>
              <strong>{total}</strong>
              <span>Issues</span>
            </div>
          </div>
        </div>
        <ul className="pie-legend-v2">
          {data.map((item, index) => (
            <li key={item.category}>
              <span style={{ background: PIE_COLORS[index % PIE_COLORS.length] }} />
              <em>{item.category}</em>
              <strong>{item.percent}%</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const GroupedBarChart = ({ title, data, keys, colors, maxValue }) => {
  const computedMax = maxValue || Math.max(1, ...data.flatMap((row) => keys.map((key) => row[key] || 0)));
  return (
    <div className="chart-card-v2">
      <h2>{title}</h2>
      <div className="bar-chart-v2">
        {data.map((row) => (
          <div key={row.key || row.label || row.block} className="bar-group-v2">
            <div className="bar-group-inner-v2">
              {keys.map((key, index) => {
                const value = row[key] || 0;
                const height = Math.max(8, Math.round((value / computedMax) * 120));
                return (
                  <div key={`${row.key}-${key}`} className="bar-col-v2">
                    <div
                      className="bar-v2"
                      style={{
                        height: `${height}px`,
                        background: colors[index % colors.length],
                      }}
                      title={`${key}: ${value}`}
                    />
                  </div>
                );
              })}
            </div>
            <span>{row.label || row.block}</span>
          </div>
        ))}
      </div>
      <div className="bar-legend-v2">
        {keys.map((key, index) => (
          <div key={key}>
            <span style={{ background: colors[index % colors.length] }} />
            <p>{key}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
