import { RefObject } from 'react';

export type ChartLabels = (string | number | string[] | number[] | Date | Date[] | moment.Moment | moment.Moment[])[];

// Note: Abstracted from https://github.com/reactchartjs/react-chartjs-2/issues/151#issuecomment-316939204
export const createCustomTooltip = (tooltip: any, chartRef: RefObject<any>) => {
  const chart = chartRef.current;
  if (!tooltip || !chart) return;

  let tooltipEl = document.getElementById('chartjs-tooltip');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'chartjs-tooltip';
    tooltipEl.innerHTML = '<table></table>';
    document.body.appendChild(tooltipEl);
  }

  // Note: setting the opacity here is needed to hide the tooltip when the user is not hovering over the chart
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = '0';
    return;
  }

  console.log('>>>', { tooltip });

  const getBody = (bodyItem: any) => bodyItem.lines;

  // Set custom tooltip
  if (tooltip.body) {
    const bodyLines = tooltip.body.map(getBody);
    const tooltipData = bodyLines[0][0];

    // Create inner html
    let innerHtml = '<thead>';
    // const tooltipTitle = `<td class="tooltip-title">${tooltipData.label ? tooltipData.label : titleLines[0]}</td>`;
    const tooltipValue = `<td class="tooltip-value">${tooltipData}</td>`;

    // innerHtml += tooltipTitle;
    innerHtml += '</thead><tbody><tr>';
    innerHtml += tooltipValue;

    innerHtml += '</tr></tbody>';

    // Set inner html to tooltip
    const tableRoot = tooltipEl.querySelector('table') as HTMLTableElement;
    tableRoot.innerHTML = innerHtml;
    const chartElement = chart.chartInstance.canvas.getBoundingClientRect();
    // Calculate position
    const positionY = chartElement.top - tableRoot.clientHeight - 32;
    const positionX = chartElement.left;
    // Display, position, and set styles for font
    tooltipEl.style.opacity = '1';
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  }
};
