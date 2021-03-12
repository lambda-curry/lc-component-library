import { RefObject } from 'react';

export type ChartLabels = (string | number | string[] | number[] | Date | Date[] | moment.Moment | moment.Moment[])[];

export const createCustomTooltip = (tooltip: any, chartRef: RefObject<any>) => {
  const chart = chartRef.current;

  if (!tooltip || !chart) return;

  console.log('>>>', { chart, tooltip });

  tooltip.backgroundColor = '#FFF';
  tooltip.mode = 'index';
  tooltip.intersect = true;
  tooltip.yPadding = 10;
  tooltip.xPadding = 10;
  tooltip.caretSize = 4;
  tooltip.bodyFontColor = '#5A5A5A';
  tooltip.borderColor = '#CECED0';
  tooltip.borderWidth = 0.05;
  tooltip.cornerRadius = 0;
  tooltip.displayColors = false;

  // Tooltip Element
  let tooltipEl = document.getElementById('chartjs-tooltip');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'chartjs-tooltip';
    tooltipEl.innerHTML = '<table></table>';
    document.body.appendChild(tooltipEl);
  }

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = '0';
    return;
  }
  // Set caret Position
  tooltipEl.classList.remove('above', 'below', 'no-transform');
  if (tooltip.yAlign) {
    tooltipEl.classList.add(tooltip.yAlign);
  } else {
    tooltipEl.classList.add('no-transform');
  }
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
    const positionY = chartElement.top + tooltip.yPadding;
    const positionX = chartElement.left + tooltip.xPadding;
    // Display, position, and set styles for font
    tooltipEl.style.opacity = '1';
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  }
};
