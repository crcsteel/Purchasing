// ---- GI ----
async function fetchGIAndCost() {
  try {
    const res = await fetch(API_URL_PRODUCT);
    const text = await res.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    const giData = json.table.rows.map(row => ({
      month: row.c[0]?.v || '',
      GI: toNumber(row.c[1]?.v),
      CostY1: toNumber(row.c[2]?.v),
      CostY2: toNumber(row.c[3]?.v)
    }));
    renderGIChart(giData);
  } catch (err) {
    console.error("โหลดข้อมูลจากชีตไม่สำเร็จ (GI):", err);
  }
}
function renderGIChart(giData) {
  const options = {
    chart: { height: 500, type: 'line', stacked: false },
    stroke: { width: [0, 3, 3] },
    series: [
      { name: 'GI (ตัน)', type: 'column', data: giData.map(d => d.GI) },
      { name: 'ก.ค. 66 - มิ.ย. 67', type: 'line', data: giData.map(d => d.CostY1) },
      { name: 'ก.ค. 67 - มิ.ย. 68', type: 'line', data: giData.map(d => d.CostY2) }
    ],
    colors: ['#1E90FF', '#FF6347', '#32CD32'],
    xaxis: { categories: giData.map(d => d.month) },
    yaxis: [
      {
        title: { text: "GI (ตัน)" },
        labels: { formatter: val => val.toLocaleString() }
      },
      {
        opposite: true,
        title: { text: "Cost (บาท/กก.)" },
        labels: { formatter: val => val.toFixed(2) }
      }
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: [
        { formatter: val => val.toLocaleString() + " ตัน" },
        { formatter: val => val.toFixed(2) + " บาท/กก." },
        { formatter: val => val.toFixed(2) + " บาท/กก." }
      ]
    },
    plotOptions: { bar: { columnWidth: '90%', borderRadius: 2 } },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1, 2],
      formatter: val => val.toFixed(2)
    },
    grid: { borderColor: '#e0e0e0', strokeDashArray: 4 }
  };

  const chart = new ApexCharts(document.querySelector("#gi-chart"), options);
  chart.render();
}

// ---- RBDB ----
async function fetchRBDBAndCost() {
  try {
    const res = await fetch(API_URL_PRODUCT);
    const text = await res.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    const bdbData = json.table.rows.map(row => ({
      month: row.c[0]?.v || '',
      RBDB: toNumber(row.c[6]?.v),   // สมมติ RBDB เริ่ม col 6
      CostY1: toNumber(row.c[7]?.v),
      CostY2: toNumber(row.c[8]?.v)
    }));
    renderRBDBChart(bdbData);
  } catch (err) {
    console.error("โหลดข้อมูลจากชีตไม่สำเร็จ (RBDB):", err);
  }
}
function renderRBDBChart(rbdbData) {
  const options = {
    chart: { height: 500, type: 'line', stacked: false },
    stroke: { width: [0, 3, 3] },
    series: [
      { name: 'RBDB (ตัน)', type: 'column', data: rbdbData.map(d => d.RBDB) },
      { name: 'ก.ค. 66 - มิ.ย. 67', type: 'line', data: rbdbData.map(d => d.CostY1) },
      { name: 'ก.ค. 67 - มิ.ย. 68', type: 'line', data: rbdbData.map(d => d.CostY2) }
    ],
    colors: ['#1E90FF', '#FF6347', '#32CD32'], // เปลี่ยนสีให้ต่างจาก GI
    xaxis: { categories: rbdbData.map(d => d.month) },
    yaxis: [
      {
        title: { text: "RBDB (ตัน)" },
        labels: { formatter: val => val.toLocaleString() }
      },
      {
        opposite: true,
        title: { text: "Cost (บาท/กก.)" },
        labels: { formatter: val => val.toFixed(2) }
      }
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: [
        { formatter: val => val.toLocaleString() + " ตัน" },
        { formatter: val => val.toFixed(2) + " บาท/กก." },
        { formatter: val => val.toFixed(2) + " บาท/กก." }
      ]
    },
    plotOptions: { bar: { columnWidth: '90%', borderRadius: 2 } },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1, 2],
      formatter: val => val.toFixed(2)
    },
    grid: { borderColor: '#e0e0e0', strokeDashArray: 4 }
  };

  const chart = new ApexCharts(document.querySelector("#rbdb-chart"), options);
  chart.render();
}

fetchGIAndCost();
fetchRBDBAndCost();

// ---- Sales Daily ----