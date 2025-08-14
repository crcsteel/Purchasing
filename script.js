// ===== CONFIG =====
const SHEET_ID = '1XTruQeRZh32zcAVfXVBgbrsmBOrgBfOa7v2FV-Ut2YY';
const SHEET_NAME = 'data'; // เปลี่ยนตามชื่อแท็บของคุณ
const API_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

let sheetData = [];

// ดึงข้อมูลจาก Google Sheets แบบ Public
async function fetchData() {
  try {
    const res = await fetch(API_URL);
    const text = await res.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    // แปลงข้อมูลเป็น Array
    sheetData = json.table.rows.map(row => ({
      date: row.c[0]?.v || '',
      sales: parseFloat(row.c[1]?.v || 0),
      orders: parseInt(row.c[2]?.v || 0),
      customers: parseInt(row.c[3]?.v || 0)
    }));

    renderTable(sheetData);
    renderSummary(sheetData);
    renderChart(sheetData);

  } catch (err) {
    console.error('Error fetching data', err);
  }
}

// แสดงข้อมูลในตาราง
function renderTable(data) {
  const tbody = document.querySelector('#dataTable tbody');
  tbody.innerHTML = '';
  data.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="p-2 border">${row.date}</td>
      <td class="p-2 border text-right">${row.sales.toLocaleString()}</td>
      <td class="p-2 border text-right">${row.orders}</td>
      <td class="p-2 border text-right">${row.customers}</td>
    `;
    tbody.appendChild(tr);
  });
}

// สรุป
function renderSummary(data) {
  const totalSales = data.reduce((sum, r) => sum + r.sales, 0);
  const totalOrders = data.reduce((sum, r) => sum + r.orders, 0);
  const totalCustomers = data.reduce((sum, r) => sum + r.customers, 0);

  // อัปเดตค่าลงการ์ดที่มีอยู่ใน HTML
  document.getElementById('totalSales').textContent = totalSales.toLocaleString();
  document.getElementById('totalOrders').textContent = totalOrders.toLocaleString();
  document.getElementById('totalCustomers').textContent = totalCustomers.toLocaleString();
}


// กราฟ
function renderChart(data) {
  const ctx = document.getElementById('salesChart').getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(r => r.date),
      datasets: [{
        label: 'ยอดขาย',
        data: data.map(r => r.sales),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
        tension: 0.3, // ทำให้เส้นโค้งนุ่ม
        fill: true,   // เติมสีด้านล่างเส้น
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value.toLocaleString();
            }
          }
        }
      }
    }
  });
}


// ค้นหาในตาราง
document.getElementById('searchInput').addEventListener('input', function () {
  const keyword = this.value.toLowerCase();
  const filtered = sheetData.filter(row =>
    row.date.toLowerCase().includes(keyword) ||
    row.sales.toString().includes(keyword) ||
    row.orders.toString().includes(keyword) ||
    row.customers.toString().includes(keyword)
  );
  renderTable(filtered);
});

fetchData();
