export default function removeData(chart: any) {
  chart.data.labels.shift();
  chart.data.datasets.forEach((dataset: any) => {
    dataset.data.shift();
  });
  chart.update();
}
