// ---- Inventory Out GI ----
async function fetchInventoryOutGIData() {
  try {
    const res = await fetch(API_URL_INVENTORY_OUT);
    const text = await res.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    const months = [], year1 = [], year2 = [], year3 = [], year4 = [];

    // ฟังก์ชันช่วยแปลงค่า MB → Number (หน่วยสิบล้าน)

    function toNumber(val) {
      if (!val) return null; // ถ้าไม่มีค่าเลย → null
      let num = parseFloat(val.toString().replace(' MB',''));
      return isNaN(num) || num === 0 ? null : num; // ถ้าเป็น NaN หรือ 0 → null
    }

    json.table.rows.forEach(row => {
      const monthName = row.c[0]?.v || '';

      const val1 = toNumber(row.c[13]?.v);
      const val2 = toNumber(row.c[14]?.v);
      const val3 = toNumber(row.c[15]?.v);
      const val4 = toNumber(row.c[16]?.v);

      if (val1 !== null || val2 !== null || val3 !== null || val4 !== null) {
        months.push(monthName);
        year1.push(val1 !== null ? +val1.toFixed(2) : null);
        year2.push(val2 !== null ? +val2.toFixed(2) : null);
        year3.push(val3 !== null ? +val3.toFixed(2) : null);
        year4.push(val4 !== null ? +val4.toFixed(2) : null);
      }
    });


    renderInventoryOutGIChart(months, year1, year2, year3, year4);
  } catch (err) {
    console.error("โหลดข้อมูล Inventory ไม่สำเร็จ:", err);
  }
}

function renderInventoryOutGIChart(months, year1, year2, year3, year4) {
  const options = {
    chart: { type: 'line', height: 400, toolbar: { show: true } },
    series: [
      { name: 'ก.ค 65 - มิ.ย 66', data: year1 },
      { name: 'ก.ค 66 - มิ.ย 67', data: year2 },
      { name: 'ก.ค 67 - มิ.ย 68', data: year3 },
      { name: 'ก.ค 68 - มิ.ย 69', data: year4 }
    ],
    xaxis: { categories: months },
    stroke: { width: 3, curve: 'smooth' },
    colors: ['#1E90FF', '#FF6347', '#32CD32', '#8A2BE2'],
    yaxis: {
      labels: {
        formatter: val => val.toFixed(2)  // แสดงทศนิยม 2 หลัก
      },
      title: { text: 'ปริมาณ (ตัน)' }
    },
    tooltip: {
      y: {
        formatter: val => val.toLocaleString() + " ตัน"  // แสดงปริมาณเป็นตัน
      }
    }
  };
  new ApexCharts(document.querySelector("#inventory-out-gi-chart"), options).render();
}
// ---- Inventory Out RB-DB ----
async function fetchInventoryOutRBDBData() {
  try {
    const res = await fetch(API_URL_INVENTORY_OUT);
    const text = await res.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    const months = [], year1 = [], year2 = [], year3 = [], year4 = [];

    // ฟังก์ชันช่วยแปลงค่า MB → Number (หน่วยสิบล้าน)
    function toNumber(val) {
      if (!val) return null; // ถ้าไม่มีค่าเลย → null
      let num = parseFloat(val.toString().replace(' MB',''));
      return isNaN(num) || num === 0 ? null : num; // ถ้าเป็น NaN หรือ 0 → null
    }

    json.table.rows.forEach(row => {
      const monthName = row.c[0]?.v || '';

      const val1 = toNumber(row.c[13]?.v);
      const val2 = toNumber(row.c[14]?.v);
      const val3 = toNumber(row.c[15]?.v);
      const val4 = toNumber(row.c[16]?.v);

      if (val1 !== null || val2 !== null || val3 !== null || val4 !== null) {
        months.push(monthName);
        year1.push(val1 !== null ? +val1.toFixed(2) : null);
        year2.push(val2 !== null ? +val2.toFixed(2) : null);
        year3.push(val3 !== null ? +val3.toFixed(2) : null);
        year4.push(val4 !== null ? +val4.toFixed(2) : null);
      }
    });


    renderInventoryOutRBDBChart(months, year1, year2, year3, year4);
  } catch (err) {
    console.error("โหลดข้อมูล Inventory ไม่สำเร็จ:", err);
  }
}

function renderInventoryOutRBDBChart(months, year1, year2, year3, year4) {
  const options = {
    chart: { type: 'line', height: 400, toolbar: { show: true } },
    series: [
      { name: 'ก.ค 65 - มิ.ย 66', data: year1 },
      { name: 'ก.ค 66 - มิ.ย 67', data: year2 },
      { name: 'ก.ค 67 - มิ.ย 68', data: year3 },
      { name: 'ก.ค 68 - มิ.ย 69', data: year4 }
    ],
    xaxis: { categories: months },
    stroke: { width: 3, curve: 'smooth' },
    colors: ['#1E90FF', '#FF6347', '#32CD32', '#8A2BE2'],
    yaxis: {
      labels: {
        formatter: val => val.toFixed(2)  // แสดงทศนิยม 2 หลัก
      },
      title: { text: 'ปริมาณ (ตัน)' }
    },
    tooltip: {
      y: {
        formatter: val => val.toLocaleString() + " ตัน"  // แสดงปริมาณเป็นตัน
      }
    }
  };
  new ApexCharts(document.querySelector("#inventory-out-rbdb-chart"), options).render();
}

// ---- Inventory Out Ton ----
async function fetchInventoryOutTonData() {
  try {
    const res = await fetch(API_URL_INVENTORY_OUT);
    const text = await res.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    const months = [], year1 = [], year2 = [], year3 = [], year4 = [];

    // ฟังก์ชันช่วยแปลงค่า MB → Number (หน่วยสิบล้าน)
    function toNumber(val) {
      if (!val) return null; // ถ้าไม่มีค่าเลย → null
      let num = parseFloat(val.toString().replace(' MB',''));
      return isNaN(num) || num === 0 ? null : num; // ถ้าเป็น NaN หรือ 0 → null
    }

    json.table.rows.forEach(row => {
      const monthName = row.c[0]?.v || '';

      const val1 = toNumber(row.c[13]?.v);
      const val2 = toNumber(row.c[14]?.v);
      const val3 = toNumber(row.c[15]?.v);
      const val4 = toNumber(row.c[16]?.v);

      if (val1 !== null || val2 !== null || val3 !== null || val4 !== null) {
        months.push(monthName);
        year1.push(val1 !== null ? +val1.toFixed(2) : null);
        year2.push(val2 !== null ? +val2.toFixed(2) : null);
        year3.push(val3 !== null ? +val3.toFixed(2) : null);
        year4.push(val4 !== null ? +val4.toFixed(2) : null);
      }
    });


    renderInventoryOutTonChart(months, year1, year2, year3, year4);
  } catch (err) {
    console.error("โหลดข้อมูล Inventory ไม่สำเร็จ:", err);
  }
}

function renderInventoryOutTonChart(months, year1, year2, year3, year4) {
  const options = {
    chart: { type: 'line', height: 400, toolbar: { show: true } },
    series: [
      { name: 'ก.ค 65 - มิ.ย 66', data: year1 },
      { name: 'ก.ค 66 - มิ.ย 67', data: year2 },
      { name: 'ก.ค 67 - มิ.ย 68', data: year3 },
      { name: 'ก.ค 68 - มิ.ย 69', data: year4 }
    ],
    xaxis: { categories: months },
    stroke: { width: 3, curve: 'smooth' },
    colors: ['#1E90FF', '#FF6347', '#32CD32', '#8A2BE2'],
    yaxis: {
      labels: {
        formatter: val => val.toFixed(2)  // แสดงทศนิยม 2 หลัก
      },
      title: { text: 'ปริมาณ (ตัน)' }
    },
    tooltip: {
      y: {
        formatter: val => val.toLocaleString() + " ตัน"  // แสดงปริมาณเป็นตัน
      }
    }
  };
  new ApexCharts(document.querySelector("#inventory-out-ton-chart"), options).render();
}

// ---- Inventory Out Bath ----
async function fetchInventoryOutBathData() {
  try {
    const res = await fetch(API_URL_INVENTORY_OUT);
    const text = await res.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    const months = [], year1 = [], year2 = [], year3 = [], year4 = [];

    // ฟังก์ชันช่วยแปลงค่า MB → Number (หน่วยสิบล้าน)
    function toNumber(val) {
      if (!val) return null; // ถ้าไม่มีค่าเลย → null
      let num = parseFloat(val.toString().replace(' MB',''));
      return isNaN(num) || num === 0 ? null : num; // ถ้าเป็น NaN หรือ 0 → null
    }

    json.table.rows.forEach(row => {
      const monthName = row.c[0]?.v || '';

      const val1 = toNumber(row.c[13]?.v);
      const val2 = toNumber(row.c[14]?.v);
      const val3 = toNumber(row.c[15]?.v);
      const val4 = toNumber(row.c[16]?.v);

      if (val1 !== null || val2 !== null || val3 !== null || val4 !== null) {
        months.push(monthName);
        year1.push(val1 !== null ? +val1.toFixed(2) : null);
        year2.push(val2 !== null ? +val2.toFixed(2) : null);
        year3.push(val3 !== null ? +val3.toFixed(2) : null);
        year4.push(val4 !== null ? +val4.toFixed(2) : null);
      }
    });

    renderInventoryOutBathChart(months, year1, year2, year3, year4);
  } catch (err) {
    console.error("โหลดข้อมูล Inventory ไม่สำเร็จ:", err);
  }
}

function renderInventoryOutBathChart(months, year1, year2, year3, year4) {
  const options = {
    chart: { type: 'line', height: 400, toolbar: { show: true } },
    series: [
      { name: 'ก.ค 65 - มิ.ย 66', data: year1 },
      { name: 'ก.ค 66 - มิ.ย 67', data: year2 },
      { name: 'ก.ค 67 - มิ.ย 68', data: year3 },
      { name: 'ก.ค 68 - มิ.ย 69', data: year4 }
    ],
    xaxis: { categories: months },
    stroke: { width: 3, curve: 'smooth' },
    colors: ['#1E90FF', '#FF6347', '#32CD32', '#8A2BE2'],
    yaxis: {
      labels: {
        formatter: val => val.toFixed(2)  // แสดงทศนิยม 2 หลัก
      },
      title: { text: 'ปริมาณ (ล้านบาท)' }
    },
    tooltip: {
      y: {
        formatter: val => val.toLocaleString() + " MB"  // แสดงปริมาณเป็นตัน
      }
    }
  };
  new ApexCharts(document.querySelector("#inventory-out-bath-chart"), options).render();
}

// ---- Inventory Out Back Steel ----
async function fetchInventoryOutBackSteelData() {
  try {
    const res = await fetch(API_URL_INVENTORY_OUT);
    const text = await res.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    const months = [], year1 = [], year2 = [], year3 = [], year4 = [];

    // ฟังก์ชันช่วยแปลงค่า MB → Number (หน่วยสิบล้าน)
    function toNumber(val) {
      if (!val) return null; // ถ้าไม่มีค่าเลย → null
      let num = parseFloat(val.toString().replace(' MB',''));
      return isNaN(num) || num === 0 ? null : num; // ถ้าเป็น NaN หรือ 0 → null
    }

    json.table.rows.forEach(row => {
      const monthName = row.c[0]?.v || '';

      const val1 = toNumber(row.c[13]?.v);
      const val2 = toNumber(row.c[14]?.v);
      const val3 = toNumber(row.c[15]?.v);
      const val4 = toNumber(row.c[16]?.v);

      if (val1 !== null || val2 !== null || val3 !== null || val4 !== null) {
        months.push(monthName);
        year1.push(val1 !== null ? +val1.toFixed(2) : null);
        year2.push(val2 !== null ? +val2.toFixed(2) : null);
        year3.push(val3 !== null ? +val3.toFixed(2) : null);
        year4.push(val4 !== null ? +val4.toFixed(2) : null);
      }
    });


    renderInventoryOutBackSteelChart(months, year1, year2, year3, year4);
  } catch (err) {
    console.error("โหลดข้อมูล Inventory ไม่สำเร็จ:", err);
  }
}

function renderInventoryOutBackSteelChart(months, year1, year2, year3, year4) {
  const options = {
    chart: { type: 'line', height: 400, toolbar: { show: true } },
    series: [
      { name: 'ก.ค 65 - มิ.ย 66', data: year1 },
      { name: 'ก.ค 66 - มิ.ย 67', data: year2 },
      { name: 'ก.ค 67 - มิ.ย 68', data: year3 },
      { name: 'ก.ค 68 - มิ.ย 69', data: year4 }
    ],
    xaxis: { categories: months },
    stroke: { width: 3, curve: 'smooth' },
    colors: ['#1E90FF', '#FF6347', '#32CD32', '#8A2BE2'],
    yaxis: {
      labels: {
        formatter: val => val.toFixed(2)  // แสดงทศนิยม 2 หลัก
      },
      title: { text: 'ปริมาณ (ล้านบาท)' }
    },
    tooltip: {
      y: {
        formatter: val => val.toLocaleString() + " MB"  // แสดงปริมาณเป็นตัน
      }
    }
  };
  new ApexCharts(document.querySelector("#inventory-out-backsteel-chart"), options).render();
}
// --- โหลดข้อมูลพร้อมกัน ---
async function fetchAllInventoryOutData() {
  try {
    await Promise.all([
      fetchInventoryOutTonData(),
      fetchInventoryOutBathData(),
      fetchInventoryOutRBDBData(),
      fetchInventoryOutGIData(),
      fetchInventoryOutBackSteelData()
    ]);
    console.log("✅ โหลดข้อมูล Inventory Out ครบแล้ว");
  } catch (err) {
    console.error("❌ โหลดข้อมูล Inventory Out บางส่วนไม่สำเร็จ:", err);
  }
}

// เรียกใช้ฟังก์ชันเดียว
fetchAllInventoryOutData();

