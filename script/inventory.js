
// ---- Inventory ----
async function fetchInventoryData() {
  try {
    const res = await fetch(API_URL_INVENTORY);
    const text = await res.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    const months = [], year1 = [], year2 = [], year3 = [], year4 = [];
    json.table.rows.forEach(row => {
      const monthName = row.c[0]?.v || '';

      function parseValue(cell) {
        if (!cell || !cell.v) return null; // ถ้าไม่มีค่า → null
        let val = cell.v.toString().replace(' MB',''); 
        val = parseFloat(val);
        if (isNaN(val)) return null;
        return val / 10000000;
      }

      const val1 = parseValue(row.c[1]);
      const val2 = parseValue(row.c[2]);
      const val3 = parseValue(row.c[3]);
      const val4 = parseValue(row.c[4]);

      if (val1 || val2 || val3 || val4) {  // มีค่าอย่างน้อย 1 ค่า
        months.push(monthName);
        year1.push(val1 !== null ? parseFloat(val1.toFixed(2)) : null);
        year2.push(val2 !== null ? parseFloat(val2.toFixed(2)) : null);
        year3.push(val3 !== null ? parseFloat(val3.toFixed(2)) : null);
        year4.push(val4 !== null ? parseFloat(val4.toFixed(2)) : null);
      }
    });
    renderInventoryChart(months, year1, year2, year3, year4);
  } catch (err) {
    console.error("โหลดข้อมูล Inventory ไม่สำเร็จ:", err);
  }
}
function renderInventoryChart(months, year1, year2, year3, year4) {
  const options = {
    chart: { type: 'line', height: 350 },
    series: [
      { name: 'ก.ค 65 - มิ.ย 66', data: year1 },
      { name: 'ก.ค 66 - มิ.ย 67', data: year2 },
      { name: 'ก.ค 67 - มิ.ย 68', data: year3 },
      { name: 'ก.ค 68 - มิ.ย 69', data: year4 }
    ],
    xaxis: { categories: months },
    stroke: { width: 3, curve: 'smooth' },
    colors: ['#1E90FF', '#FF6347', '#32CD32', '#8A2BE2']
  };
  new ApexCharts(document.querySelector("#inventory-chart"), options).render();
}

// ---- PO ----
async function fetchPOData() {
  try {
    const res = await fetch(API_URL_INVENTORY);
    const text = await res.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    const months = [], year1 = [], year2 = [], year3 = [], year4 = [];
    json.table.rows.forEach(row => {
      const monthName = row.c[0]?.v || '';

      function parseValue(cell) {
        if (!cell || !cell.v) return null; // ถ้าไม่มีค่า → null
        let val = cell.v.toString().replace(' MB',''); 
        val = parseFloat(val);
        if (isNaN(val)) return null;
        return val / 10000000;
      }

      const val1 = parseValue(row.c[1]);
      const val2 = parseValue(row.c[2]);
      const val3 = parseValue(row.c[3]);
      const val4 = parseValue(row.c[4]);

      if (val1 || val2 || val3 || val4) {  // มีค่าอย่างน้อย 1 ค่า
        months.push(monthName);
        year1.push(val1 !== null ? parseFloat(val1.toFixed(2)) : null);
        year2.push(val2 !== null ? parseFloat(val2.toFixed(2)) : null);
        year3.push(val3 !== null ? parseFloat(val3.toFixed(2)) : null);
        year4.push(val4 !== null ? parseFloat(val4.toFixed(2)) : null);
      }
    });
    renderPOChart(months, year1, year2, year3, year4);
  } catch (err) {
    console.error("โหลดข้อมูล PO ไม่สำเร็จ:", err);
  }
}
function renderPOChart(months, year1, year2, year3, year4) {
  const options = {
    chart: { type: 'line', height: 350 },
    series: [
      { name: 'ก.ค 65 - มิ.ย 66', data: year1 },
      { name: 'ก.ค 66 - มิ.ย 67', data: year2 },
      { name: 'ก.ค 67 - มิ.ย 68', data: year3 },
      { name: 'ก.ค 68 - มิ.ย 69', data: year4 }
    ],
    xaxis: { categories: months },
    stroke: { width: 3, curve: 'smooth' },
    colors: ['#1E90FF', '#FF6347', '#32CD32', '#8A2BE2']
  };
  new ApexCharts(document.querySelector("#po-chart"), options).render();
}

async function fetchGroupData() {
  try {
    const res = await fetch(API_URL_INVENTORY);
    const text = await res.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    const stockData = [];

    json.table.rows.forEach(row => {
      const groupName = row.c[11]?.v || '';
      const surin = parseFloat(row.c[12]?.v || 0);
      const nangrong = parseFloat(row.c[13]?.v || 0);
      const detUdom = parseFloat(row.c[14]?.v || 0);

      if (groupName) {
        stockData.push({
          group: groupName,
          Surin: surin,
          Nangrong: nangrong,
          DetUdom: detUdom
        });
      }
    });

    renderGroupBarChart(stockData);
  } catch (err) {
    console.error("โหลดข้อมูลไม่สำเร็จ:", err);
  }
}

function renderGroupBarChart(stockData) {
  const options = {
    chart: {
      type: 'bar',
      height: 500,
      stacked: false
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '96%'
      }
    },
    series: [
      {
        name: 'Surin',
        data: stockData.map(d => parseFloat(d.Surin.toFixed(2)))
      },
      {
        name: 'Nangrong',
        data: stockData.map(d => parseFloat(d.Nangrong.toFixed(2)))
      },
      {
        name: 'Det Udom',
        data: stockData.map(d => parseFloat(d.DetUdom.toFixed(2)))
      }
    ],
    colors: ["#0080ffff", "#ff0000ff", "#06c000ff"],
    xaxis: {
      categories: stockData.map(d => d.group)
    },
    yaxis: {
      labels: {
        formatter: val =>
          val.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
      }
    },
    tooltip: {
      y: {
        formatter: val =>
          val.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
      }
    },
    dataLabels: {
      enabled: true,   // ✅ เปิดโชว์ตัวเลขบนแท่ง
      formatter: val =>
        val.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
      style: {
        fontSize: '10px',
        colors: ['#ffffffff'] // ตัวเลขบนแท่งเป็นสีดำ (จะได้อ่านง่าย)
      }
    }
  };

  const chart = new ApexCharts(document.querySelector("#group-bar-chart"), options);
  chart.render();
}

// ---- PO ----
async function fetchStockData() {
  try {
    const res = await fetch(API_URL_INVENTORY);
    const text = await res.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    const months = [], year1 = [], year2 = [], year3 = [], year4 = [];
    json.table.rows.forEach(row => {
      const monthName = row.c[0]?.v || '';

      function parseValue(cell) {
        if (!cell || !cell.v) return null; // ถ้าไม่มีค่า → null
        let val = cell.v.toString().replace(' MB',''); 
        val = parseFloat(val);
        if (isNaN(val)) return null;
        return val / 10000000;
      }

      const val1 = parseValue(row.c[1]);
      const val2 = parseValue(row.c[2]);
      const val3 = parseValue(row.c[3]);
      const val4 = parseValue(row.c[4]);

      if (val1 || val2 || val3 || val4) {  // มีค่าอย่างน้อย 1 ค่า
        months.push(monthName);
        year1.push(val1 !== null ? parseFloat(val1.toFixed(2)) : null);
        year2.push(val2 !== null ? parseFloat(val2.toFixed(2)) : null);
        year3.push(val3 !== null ? parseFloat(val3.toFixed(2)) : null);
        year4.push(val4 !== null ? parseFloat(val4.toFixed(2)) : null);
      }
    });
    renderStockChart(months, year1, year2, year3, year4);
  } catch (err) {
    console.error("โหลดข้อมูล PO ไม่สำเร็จ:", err);
  }
}
function renderStockChart(months, year1, year2, year3, year4) {
  const options = {
    chart: { type: 'line', height: 350 },
    series: [
//      { name: 'ก.ค 65 - มิ.ย 66', data: year1 },
      { name: 'ก.ค 66 - มิ.ย 67', data: year2 },
      { name: 'ก.ค 67 - มิ.ย 68', data: year3 },
      { name: 'ก.ค 68 - มิ.ย 69', data: year4 }
    ],
    xaxis: { categories: months },
    stroke: { width: 3, curve: 'smooth' },
    colors: ['#FF6347', '#32CD32', '#8A2BE2']
  };
  new ApexCharts(document.querySelector("#stock-chart"), options).render();
}

// ---- Inventory Out ----

function formatNumber(num) {
  return Number(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

async function loadTables() {
  try {
    const res = await fetch(API_URL);
    const text = await res.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    const rows = json.table.rows.map(r => ({
      branch: r.c[0]?.v || "",       // V
      value: Number(r.c[1]?.v || 0), // W
      weight: Number(r.c[2]?.v || 0),// X
      pending: Number(r.c[3]?.v || 0)// Y
    }));

    // ตาราง มูลค่า
    document.getElementById("table-stock-value").innerHTML =
      rows.map(r => `<tr><td>${r.branch}</td><td>${formatNumber(r.value)}</td></tr>`).join("") +
      `<tr class="total"><td>รวม</td><td>${formatNumber(rows.reduce((s,r)=>s+r.value,0))}</td></tr>`;

    // ตาราง น้ำหนัก
    document.getElementById("table-stock-weight").innerHTML =
      rows.map(r => `<tr><td>${r.branch}</td><td>${formatNumber(r.weight)}</td></tr>`).join("") +
      `<tr class="total"><td>รวม</td><td>${formatNumber(rows.reduce((s,r)=>s+r.weight,0))}</td></tr>`;

    // ตาราง ค้างรับ
    document.getElementById("table-stock-pending").innerHTML =
      rows.map(r => `<tr><td>${r.branch}</td><td>${formatNumber(r.pending)}</td></tr>`).join("") +
      `<tr class="total"><td>รวม</td><td>${formatNumber(rows.reduce((s,r)=>s+r.pending,0))}</td></tr>`;
  } catch (err) {
    console.error("โหลดข้อมูลไม่สำเร็จ:", err);
  }
}

function formatNumber(num) {
  return Number(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getDiffIcon(diff) {
  if (diff > 0) {
    return `<span style="color:red;">&#9650; ${formatNumber(diff)}</span>`;   // ▲ ขึ้น สีแดง
  } else if (diff < 0) {
    return `<span style="color:green;">&#9660; ${formatNumber(diff)}</span>`; // ▼ ลง สีเขียว
  } else {
    return `<span style="color:orange;">&#8211; ${formatNumber(diff)}</span>`; // – คงที่ สีส้ม
  }
}

async function loadBasePrice() {
  try {
    const res = await fetch(API_URL_BASEPRICE_INVENTORY);
    const text = await res.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    const rows = json.table.rows.map(r => ({
      group: r.c[0]?.v || "",
      price: Number(r.c[1]?.v || 0),
      diff: Number(r.c[2]?.v || 0),
      note: r.c[3]?.v || ""
    }));

    const table = document.getElementById("table-base-price");
    table.innerHTML = `
      <tr>
        <th>กลุ่ม</th>
        <th>ราคาเบท</th>
        <th>Diff</th>
        <th>หมายเหตุ</th>
      </tr>
      ${rows.map(r => `
        <tr>
          <td>${r.group}</td>
          <td>${formatNumber(r.price)}</td>
          <td>${getDiffIcon(r.diff)}</td>
          <td>${r.note}</td>
        </tr>
      `).join("")}
    `;
  } catch (err) {
    console.error("โหลดข้อมูล Base Price ไม่สำเร็จ:", err);
  }
}

// --- โหลดข้อมูลพร้อมกัน ---
async function fetchAllInventoryData() {
  try {
    await Promise.all([
      loadBasePrice(),
      loadTables(),
      fetchGroupData(),
      fetchInventoryData(),
      fetchPOData(),
      fetchStockData()
    ]);
    console.log("✅ โหลดข้อมูล Inventory Out ครบแล้ว");
  } catch (err) {
    console.error("❌ โหลดข้อมูล Inventory Out บางส่วนไม่สำเร็จ:", err);
  }
}

// เรียกใช้ฟังก์ชันเดียว
fetchAllInventoryData();

