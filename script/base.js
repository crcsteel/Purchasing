// ===========================
// ฟังก์ชันกลาง ใช้สร้างกราฟจากชีท
// ===========================
async function fetchAndRenderChart(labelMonthCol, labelWeekCol, startCol, targetId, title = "ราคา") {
  const res = await fetch(API_URL_BASEPRICE);
  const text = await res.text();
  const json = JSON.parse(text.substring(47, text.length - 2));

  let labels = [];   
  let seriesData = [[], [], [], []];  // 4 ปี

  json.table.rows.forEach(row => {
    const month = row.c[labelMonthCol]?.v || "";
    const week  = row.c[labelWeekCol]?.v || "";
    labels.push(`${month}-${week}`);

    for (let i = 0; i < 4; i++) {
      seriesData[i].push(row.c[startCol + i]?.v || null);
    }
  });

  // render chart
  const options = {
    chart: { type: 'line', height: 500 },
    series: [
      { name: "ก.ค.65 - มิ.ย.66", data: seriesData[0] },
      { name: "ก.ค.66 - มิ.ย.67", data: seriesData[1] },
      { name: "ก.ค.67 - มิ.ย.68", data: seriesData[2] },
      { name: "ก.ค.68 - มิ.ย.69", data: seriesData[3] }
    ],
    xaxis: { categories: labels, title: { text: 'เดือน-สัปดาห์' } },
    yaxis: { title: { text: title } },
    stroke: { width: 3, curve: 'smooth' },
    markers: { size: 4 },
    tooltip: { shared: true, intersect: false },
    legend: { position: 'top' }
  };

  new ApexCharts(document.querySelector(targetId), options).render();
}

// Base RB-DB → col 5–10 (เดือน=5, สัปดาห์=6, ราคา=7–10)
fetchAndRenderChart(5, 6, 7, "#base-rbdb-chart", "เบทราคาเหล็กเส้น/ข้ออ้อย");

// Base GI → col 12–17 (เดือน=12, สัปดาห์=13, ราคา=14–17)
fetchAndRenderChart(12, 13, 14, "#base-gi-chart", "เบทราคาเหล็กท่อ (GI)");

// Base Back Steel → col 19–24 (เดือน=19, สัปดาห์=20, ราคา=21–24)
fetchAndRenderChart(19, 20, 21, "#base-backsteel-chart", "เบทราคาเหล็กท่อ (เหล็กดำ)");

// Base C → col 26–31 (เดือน=26, สัปดาห์=27, ราคา=28–31)
fetchAndRenderChart(26, 27, 28, "#base-c-chart", "เบทราคาเหล็ก C-Channel");

// เหล็กแบนตัด → col 33–38 (เดือน=33, สัปดาห์=34, ราคา=35–38)
fetchAndRenderChart(33, 34, 35, "#flat-bar-chart", "เบทราคาเหล็กแบนตัด");

// ไวร์เมช → col 40–45 (เดือน=40, สัปดาห์=41, ราคา=42–45)
fetchAndRenderChart(40, 41, 42, "#wire-mesh-chart", "เบทราคาไวร์เมช");

// เหล็กฉาก → col 47–52 (เดือน=47, สัปดาห์=48, ราคา=49–52)
fetchAndRenderChart(47, 48, 49, "#angle-bar-chart", "เบทราคาเหล็กฉาก");

// เหล็กรางน้ำ → col 54–59 (เดือน=54, สัปดาห์=55, ราคา=56–59)
fetchAndRenderChart(54, 55, 56, "#channel-bar-chart", "เบทราคาเหล็กรางน้ำ");

// เหล็กบีม → col 61–66 (เดือน=61, สัปดาห์=62, ราคา=63–66)
fetchAndRenderChart(61, 62, 63, "#ibeam-chart", "เบทราคาเหล็กบีม (I-Beam)");

